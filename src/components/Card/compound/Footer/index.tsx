import { Button, notification, Tooltip } from 'antd';
import { useState } from 'react';
import { CardProps } from '../..';
import { MIME_TYPES } from '../../../../constants/MIME_TYPES';
import { downloadFile } from '../../../../utils/downloadFile';
import { getFinalHeight } from '../../../../utils/getFinalHeight';
import { getFinalWidth } from '../../../../utils/getFinalWidth';
import { getLinkDownload } from '../../../../utils/getLinkDownload';
import styles from './Footer.module.css';

export const Footer = ({ image, setting }: CardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const finalWidth = getFinalWidth({ editorValues: setting, image });
  const finalHeight = getFinalHeight({ editorValues: setting, image });

  const handleDownloadImage = async () => {
    setIsLoading(true);
    try {
      const { fileName, url } = await getLinkDownload({ editorValues: setting, image });
      downloadFile({ url, fileName });
    } catch {
      notification.error({
        message: 'Something went wrong!',
        description: 'Contact us to get support!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infomation}>
        <Tooltip title={`${image.name}${MIME_TYPES[image.mimeType]}`}>
          <div className={styles.name}>
            {image.name}
            {MIME_TYPES[image.mimeType]}
          </div>
        </Tooltip>
        <div className={styles.size}>
          <Tooltip title="Original size">
            <div className={styles.original_size}>
              {image.width} x {image.height}
            </div>
          </Tooltip>
          <span>→</span>
          <Tooltip title="New size">
            <div className={styles.final_size}>
              {finalWidth.toFixed(0)} x {finalHeight.toFixed(0)}
            </div>
          </Tooltip>
        </div>
      </div>
      <Button loading={isLoading} block type="primary" className={styles.download_button} onClick={handleDownloadImage}>
        Download
      </Button>
    </div>
  );
};
