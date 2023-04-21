import { Image } from 'antd';
import { CardProps } from '../..';
import styles from './Body.module.css';

export const Body = ({ image }: CardProps) => {
  return (
    <div className={styles.container}>
      <Image wrapperClassName={styles.image} src={image.url} />
    </div>
  );
};
