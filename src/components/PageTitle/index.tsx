import styles from './PageTitle.module.css';

interface PageTitleProps {
  title: string;
  subTitle: string;
}

export const PageTitle = ({ subTitle, title }: PageTitleProps) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.sub_title}>{subTitle}</h2>
    </div>
  );
};
