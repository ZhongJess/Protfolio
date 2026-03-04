// 首頁：Hero 文案 + 物理技能牆
import { useState, useEffect } from "react";
import PhysicsSkillsWall from "../components/PhysicsSkillsWall";
import styles from './HomePage.module.css';

export default function HomePage({ setPage }) {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const fn = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <div className="bg-bg flex flex-col flex-1">

      {/* ── Hero 區塊 ── */}
      <section className={styles.hero}>

        {/* 滑鼠光暈（動態位置，保留 inline style） */}
        <div
          className={styles.glow}
          style={{ background: `radial-gradient(ellipse 70% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(200,146,58,0.07) 0%, transparent 65%)` }}
        />

        {/* 背景網格線 */}
        <div className={styles.grid} />

        {/* 文字內容區塊 */}
        <div
          className={styles.textBlock}
          data-visible={visible}
        >
          {/* 職稱標籤 */}
          <div className={styles.subtitle}>
            <span className={styles.subtitleLine} />
            Product Designer · UX Strategist
          </div>

          {/* 主標題 */}
          <h1 className={styles.heading}>
            我把商業需求<br />
            <em className={styles.accent}>翻譯</em>成<br />
            用戶能感受到的設計
          </h1>

          {/* 副標題 */}
          <p className={styles.body}>
            2-4 年橫跨 PM 與 UX 的複合視角——在商業目標與用戶感受之間建造橋樑，讓兩端都聽得懂對方的語言。
          </p>

          {/* CTA 按鈕 */}
          <button onClick={() => setPage("projects")} className={styles.cta}>
            看我的作品
          </button>
        </div>

        {/* ── 物理技能牆（Hero 背後） ── */}
        <div className={styles.physicsOverlay}>
          <PhysicsSkillsWall />
        </div>

      </section>
    </div>
  );
}
