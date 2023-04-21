import { Button, Input, InputRef, notification, Space, Spin } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import Dragger from 'antd/es/upload/Dragger';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import { v4 } from 'uuid';
import { MimeType, TargetResize } from '../../models/TargetResize';
import { getBlobUrlFromFile, getBlobUrlFromUrl } from '../../utils/getBlobUrl';
import { getSizeOfImageFromUrl } from '../../utils/getSizeOfImageFromUrl';
import './CustomAnt.css';
import FileUploadImage from './images/Upload.jpg';
import styles from './Upload.module.css';

export interface UploadProps {
  onUpload: (items: TargetResize[]) => void;
}

export const Upload = ({ onUpload }: UploadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<InputRef | null>(null);

  const handleUploadFiles = async (info: UploadChangeParam<UploadFile<{}>>) => {
    setIsLoading(true);
    try {
      const items = await info.fileList.reduce<Promise<TargetResize[]>>(async (result, file) => {
        const result_ = await result;
        if (file.originFileObj) {
          try {
            const { mimeType, name, url } = await getBlobUrlFromFile(file.originFileObj);
            const { height, width } = await getSizeOfImageFromUrl(url);
            return result_.concat({ name, mimeType, id: v4(), width, height, url });
          } catch {
            return result_;
          }
        }
        return result_;
      }, Promise.resolve([]));
      onUpload(items);
    } catch {
      notification.error({
        message: 'Something went wrong!',
        description: 'Make sure you upload the image file',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadUrl = async () => {
    setIsLoading(true);
    try {
      const resourceUrl = inputRef.current?.input?.value;
      if (resourceUrl) {
        const [{ url, mimeType, name }, { height, width }] = await Promise.all([
          getBlobUrlFromUrl(resourceUrl),
          getSizeOfImageFromUrl(resourceUrl),
        ]);
        onUpload([{ mimeType: mimeType as MimeType, name, url, height, width, id: v4() }]);
      } else {
        notification.error({
          message: "Image resource can't be empty",
          description: 'Please enter url of image resource you want to resize',
        });
      }
    } catch {
      notification.error({
        message: 'Something went wrong!',
        description: 'Make sure you enter true url of image resource and image resource not block our tool',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Dragger
        multiple
        accept="image/*"
        disabled={isLoading}
        onChange={handleUploadFiles}
        showUploadList={false}
        className={classNames('custom_upload', styles.upload_file)}
        beforeUpload={() => false}
      >
        <img width={200} className={styles.upload__image} src={FileUploadImage} alt="Upload" />
        <div className={styles.upload__description}>
          <span>Click or drag file to this area to upload</span> {isLoading && <Spin />}
        </div>
      </Dragger>
      <Space.Compact style={{ width: '100%' }} className={styles.upload_url}>
        <Input
          disabled={isLoading}
          size="large"
          placeholder="https://images.pexels.com/photos/13645682/pexels-photo-13645682.jpeg"
          ref={inputRef}
        />
        <Button disabled={isLoading} loading={isLoading} size="large" type="primary" onClick={handleUploadUrl}>
          Upload
        </Button>
      </Space.Compact>
    </div>
  );
};
