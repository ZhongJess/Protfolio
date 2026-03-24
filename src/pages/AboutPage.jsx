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
          <h2 className={styles.sectionTitle}>嗨，我是 Jess</h2>
          <div className={styles.acrosticIntro}>
            <p><span className={styles.firstChar}>造</span>就好產品不靠空談，我更怕設計稿到了工程師手上走樣。</p>
            <p><span className={styles.firstChar}>橋</span>接代碼與視覺，我學會手刻 Code，用開發邏輯來寫 UI。</p>
            <p><span className={styles.firstChar}>順</span>手到像原本就在那裡，才是我心目中真正「酷」的設計。</p>
            <p><span className={styles.firstChar}>實</span>現價值的關鍵，在於還原度與無障礙細節，而不只是美工。</p>
          </div>
        </section>

        {/* 分隔線 */}
        <div className={styles.divider} />

        {/* 經歷 / 技能 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>我如何解決問題</h2>
          <div className={styles.grid}>
            {[
              {
                label: "UX STRATEGY & RESEARCH",
                items: [
                  "市場研究與競品分析 ",
                  "使用者訪談與痛點",
                  "資訊架構 (IA) 與 流程圖 (Flowchart) 規劃",
                  "A/B Testing 與數據驅動的優化決策",
                ],
              },
              {
                label: "PRODUCT & INTERFACE DESIGN",
                items: [
                  "Vibe Coding",
                  "Wireframe 與 Prototype 製作",
                  "Design System 建立",
                  "RWD 佈局策略",
                ],
              },
              {
                label: "FRONT-END IMPLEMENTATION",
                items: [
                  "HTML5 / CSS3 (Sass / SCSS) ",
                  "模組化架構 (Base / Component / Layout)",
                  "跨瀏覽器相容性調校與效能優化",
                ],
              },
              {
                label: "ACCESSIBILITY & OPTIMIZATION",
                items: [
                  "Web 無障礙設計 (A11y) 規範",
                  "SCSS 色彩與間距 Token 系統化管理",
                  "Git 版本控管與協作流程",
                ],
              },
            ].map(({ label, subtitle, desc, items }) => (
              <div key={label} className={styles.card}>
                <span className={styles.cardLabel}>{label}</span>
                {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
                {items
                  ? <ul className={styles.cardList}>{items.map(item => <li key={item}>{item}</li>)}</ul>
                  : <p className={styles.cardDesc}>{desc}</p>
                }
              </div>
            ))}
          </div>
        </section>

        {/* 分隔線 */}
        <div className={styles.divider} />

        {/* 聯絡 */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>來聊聊吧！</h2>
          <p className={styles.body}>
            我對各種設計挑戰與合作機會抱持開放態度。無論是想討論產品開發，聊聊設計或是Vibe Coding 和各種AI應用，都歡迎透過{' '}
            <a
              href="https://www.linkedin.com/in/%E6%80%9D%E7%91%A9-%E9%8D%BE-34609b220/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              LinkedIn
            </a>{' '}
            傳個訊息給我，或是下載{' '}
            <a
              href="/鍾思瑩UXUI designer.pdf"
              download="鍾思瑩UXUI designer.pdf"
              className={styles.link}
            >
              我的履歷
            </a>。
          </p>
        </section>

      </div>
    </div>
  );
}
