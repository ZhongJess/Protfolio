// 小型標籤元件
import styles from './Tag.module.css';

export default function Tag({ label, color = "#FF6200" }) {
  return (
    <span
      className={styles.tag}
      style={{ '--color': color }}
    >
      {label}
    </span>
  );
}
