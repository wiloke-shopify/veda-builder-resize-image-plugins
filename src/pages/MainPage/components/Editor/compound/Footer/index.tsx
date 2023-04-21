import { Button, notification } from 'antd';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { appState } from '../../../../../../storage/AppState';
import { downloadFile } from '../../../../../../utils/downloadFile';
import { getLinkDownload } from '../../../../../../utils/getLinkDownload';
import styles from './Footer.module.css';

export const Footer = () => {
  const [{ images, editorValues }] = useAtom(appState);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadAll = async () => {
    setIsLoading(true);
    try {
      const result = await Promise.all(images.map(image => getLinkDownload({ editorValues, image })));
      result.forEach(downloadFile);
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
      <Button loading={isLoading} type="primary" block className={styles.submit_button} onClick={handleDownloadAll}>
        Download all images
      </Button>
    </div>
  );
};
