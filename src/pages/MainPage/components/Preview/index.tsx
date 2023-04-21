import { Modal, Tooltip } from 'antd';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Card } from '../../../../components/Card';
import { Upload } from '../../../../components/Upload';
import { TargetResize } from '../../../../models/TargetResize';
import { appState } from '../../../../storage/AppState';
import styles from './Preview.module.css';

export const Preview = () => {
  const [{ images, editorValues }, setState] = useAtom(appState);

  const [isOpen, setIsOpen] = useState(false);

  const handleRemoveItem = ({ id }: TargetResize) => {
    setState(state => {
      return {
        ...state,
        images: state.images.filter(image => image.id !== id),
      };
    });
  };

  const handleAddImages = (images: TargetResize[]) => {
    setIsOpen(false);
    setState(state => {
      return {
        ...state,
        images: state.images.concat(images),
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Tooltip title="Add more">
          <div className={styles.add_more} onClick={() => setIsOpen(true)}>
            +
          </div>
        </Tooltip>
      </div>
      <div className={styles.body}>
        {images.map(image => (
          <Card image={image} setting={editorValues} key={image.id} onRemove={handleRemoveItem} />
        ))}
      </div>
      <Modal destroyOnClose open={isOpen} title="Add more images" onCancel={() => setIsOpen(false)} footer={<></>}>
        <div className={styles.modal_content}>
          <Upload onUpload={handleAddImages} />
        </div>
      </Modal>
    </div>
  );
};
