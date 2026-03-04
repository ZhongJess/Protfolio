// 關於我頁面
import styles from './AboutPage.module.css';

export default function AboutPage() {
  return (
    <div className="bg-bg flex-1">
      {/* 頁首：與 ProjectsPage 相同格式 */}
      <div className={styles.header}>
        <span className={styles.eyebrow}>About Me · Product Designer</span>
        <h1 className={styles.pageTitle}>About</h1>
      </div>

      {/* 內容區 */}
      <div className={styles.content}>

        {/* 自我介紹 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hello, I'm Jess</h2>
          <p className={styles.body}>
            A product designer with a background in UX strategy, passionate about crafting
            intuitive experiences that bridge human needs and technology.
            I believe great design is both felt and understood.
          </p>
        </section>

        {/* 分隔線 */}
        <div className={styles.divider} />

        {/* 經歷 / 技能 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What I Do</h2>
          <div className={styles.grid}>
            {[
              { label: "UX Research",     desc: "User interviews, usability testing, journey mapping" },
              { label: "Product Design",  desc: "Wireframes, prototypes, design systems" },
              { label: "Visual Design",   desc: "Typography, colour theory, motion" },
              { label: "Front-End",       desc: "React, Tailwind, CSS, interaction design" },
            ].map(({ label, desc }) => (
              <div key={label} className={styles.card}>
                <span className={styles.cardLabel}>{label}</span>
                <p className={styles.cardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 分隔線 */}
        <div className={styles.divider} />

        {/* 聯絡 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Get in Touch</h2>
          <p className={styles.body}>
            Open to new opportunities and collaborations.
            Feel free to reach out via{' '}
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>{' '}
            or check my work on{' '}
            <a
              href="https://www.cakeresume.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              CakeResume
            </a>.
          </p>
        </section>

      </div>
    </div>
  );
}
