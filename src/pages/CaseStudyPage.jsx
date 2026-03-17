// 案例研究詳細頁
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Tag from "../components/Tag";
import { useFadeIn } from "../hooks";
import styles from './CaseStudyPage.module.css';

const glassBase = {
  display:             "inline-flex",
  alignItems:          "center",
  gap:                 8,
  padding:             "10px 20px",
  borderRadius:        9999,
  border:              "1px solid rgba(255,255,255,0.55)",
  background:          "rgba(255,255,255,0.55)",
  backdropFilter:      "blur(14px)",
  WebkitBackdropFilter:"blur(14px)",
  boxShadow:           "0 2px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)",
  fontSize:            14,
  fontFamily:          "system-ui, sans-serif",
  fontWeight:          500,
  color:               "#111",
  cursor:              "pointer",
  textDecoration:      "none",
  letterSpacing:       "0.01em",
  transition:          "background 0.2s, box-shadow 0.2s",
  position:            "fixed",
  bottom:              72,
  right:               24,
  zIndex:              9999,
};

function IconPixelArrowLeft() {
  return <span style={{ fontSize: 13 }}>←</span>;
}

// 單一數據指標卡片
function ImpactStat({ stat, delay }) {
  const [ref, fadeStyle] = useFadeIn(delay);
  return (
    <div ref={ref} className={styles.statCard} style={fadeStyle}>
      <div className={styles.statLabel}>{stat.label}</div>
      <div className="flex items-baseline gap-3 mb-[6px]">
        <span className={styles.statBefore}>{stat.before}</span>
        <span className={styles.statAfter}>{stat.after}</span>
      </div>
      <span
        className={styles.statDelta}
        data-up={stat.delta.startsWith("↑")}
      >
        {stat.delta}
      </span>
    </div>
  );
}

// 案例研究的單一段落
function CaseSection({ sec, index, total }) {
  const [ref, fadeStyle] = useFadeIn(index * 80);
  return (
    <div
      ref={ref}
      className={styles.section}
      data-last={index >= total - 1}
      style={fadeStyle}
    >
      <div className="flex items-center gap-3 mb-5">
        <span className={styles.sectionMeta}>
          {String(index + 1).padStart(2, "0")} / {sec.label}
        </span>
      </div>
      <h2 className={styles.sectionHeading}>{sec.heading}</h2>
      <div className={styles.sectionBody}>{sec.body}</div>
    </div>
  );
}

// 案例研究頁主元件
export default function CaseStudyPage({ project, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);
  const [heroRef, heroStyle] = useFadeIn(0);

  return (
    <>
      <div className="bg-bg flex-1">

        {/* 返回按鈕 */}
        <div className={styles.backWrap}>
          <button onClick={onBack} className={styles.backBtn}>
            <IconPixelArrowLeft /> Projects
          </button>
        </div>

        {/* Hero */}
        <div ref={heroRef} className={styles.heroWrap} style={heroStyle}>
          <div className="flex gap-[10px] mb-5 flex-wrap">
            {project.tags.map(tag => <Tag key={tag} label={tag} color={project.tagColor} />)}
          </div>
          <h1 className={styles.heroTitle}>{project.title}</h1>
          <p className={styles.heroDesc}>{project.desc}</p>
        </div>

        {/* 封面圖 */}
        <div className={styles.imgWrap}>
          <div className={styles.imgFrame}>
            <img
              src={project.img}
              alt={project.title}
              className="w-full h-full object-cover brightness-[0.85]"
            />
          </div>
        </div>

        {/* 商業成果數據 */}
        <div className={styles.impactWrap}>
          <span className={styles.impactLabel}>Business Impact</span>
          <div className={styles.impactGrid}>
            {project.impact.map((stat, i) => (
              <ImpactStat key={i} stat={stat} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* 案例研究段落 */}
        <div className={styles.sectionsWrap}>
          {project.sections.map((sec, i) => (
            <CaseSection key={i} sec={sec} index={i} total={project.sections.length} />
          ))}
        </div>

      </div>

      {/* 固定回到頂部按鈕 */}
      {createPortal(
        <button
          onClick={() => document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
          style={glassBase}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.9)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.55)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.8)"; }}
        >
          ↑ 回到頂部
        </button>,
        document.body
      )}
    </>
  );
}
