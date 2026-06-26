import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.content}>
        <div className={`${styles.line} ${styles.lineTitle}`} />
        <div className={`${styles.line} ${styles.lineShort}`} />
        <div className={`${styles.line} ${styles.lineMedium}`} />
        <div className={styles.button} />
      </div>
    </div>
  );
}