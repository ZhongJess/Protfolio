// 頁面頂部的捲動進度條
import { useState, useEffect } from "react";
import styles from './ProgressBar.module.css';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setProgress(scrolled * 100 || 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${progress}%` }} />
    </div>
  );
}
