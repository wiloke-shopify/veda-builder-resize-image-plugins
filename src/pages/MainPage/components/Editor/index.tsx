import { Body } from './compound/Body';
import { Footer } from './compound/Footer';
import { Header } from './compound/Header';
import styles from './Editor.module.css';

export const Editor = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};
