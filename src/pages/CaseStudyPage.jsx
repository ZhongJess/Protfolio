// 案例研究詳細頁
import { useEffect } from "react";
import Tag from "../components/Tag";
import { useFadeIn } from "../hooks";
import styles from './CaseStudyPage.module.css';

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
    <div className="bg-bg flex-1">

      {/* 返回按鈕 */}
      <div className={styles.backWrap}>
        <button onClick={onBack} className={styles.backBtn}>← Projects</button>
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
  );
}
