import { EditorValues } from '../../models/EditorValues';
import { TargetResize } from '../../models/TargetResize';
import styles from './Card.module.css';
import { Body } from './compound/Body';
import { Footer } from './compound/Footer';
import { Header } from './compound/Header';

export interface CardProps {
  image: TargetResize;
  setting: EditorValues;
  onRemove: (image: TargetResize) => void;
}

export const Card = (props: CardProps) => {
  return (
    <div className={styles.container}>
      <Header {...props} />
      <Body {...props} />
      <Footer {...props} />
    </div>
  );
};
