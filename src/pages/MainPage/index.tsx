import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import styles from './MainPage.module.css';

export const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        <Preview />
      </div>
      <div className={styles.editor}>
        <Editor />
      </div>
    </div>
  );
};
