// ── 好心驛 志工媒合平台 ScrollStory ──────────────────────────────────────────
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from './HoxinYiScrollStory.module.css';

// ── Assets ────────────────────────────────────────────────────────────────────
const proto01              = '/videos/hoxinyi/prototype-01.mov';
const proto02              = '/videos/hoxinyi/prototype-02.mov';
const proto03              = '/videos/hoxinyi/prototype-03.mov';
const imgResearchInterview = '/images/hoxinyi/research-interview.png';
const imgResearchMaze      = '/images/hoxinyi/research-maze.png';
const imgJourneyMap        = '/images/hoxinyi/journey-map.webp';
const imgIaPersona         = '/images/hoxinyi/ia-persona.png';
const imgIaUserflow        = '/images/hoxinyi/ia-userflow.png';
const imgIaSitemap         = '/images/hoxinyi/ia-sitemap.png';
const imgIaSitemapMobile   = '/images/hoxinyi/ia-sitemap-mobile.png';
const imgSusChartMvp       = '/images/hoxinyi/sus-chart-mvp.png';
const imgSusChartHoxy      = '/images/hoxinyi/sus-chart-hoxy.png';
const imgResultsCard01     = '/images/hoxinyi/results-card-01.png';
const imgResultsCard02     = '/images/hoxinyi/results-card-02.png';
const imgResultsCard03     = '/images/hoxinyi/results-card-03.png';
const imgResultsCard04     = '/images/hoxinyi/results-card-04.png';
const imgBanner            = '/images/hoxinyi/banner.webp';
const imgTesterMvp         = '/images/hoxinyi/tester-mvp.png';

// ── Design Tokens (kept for runtime-dynamic inline styles) ────────────────────
const WHITE   = "#FFFFFF";
const DARK    = "#1A1A1A";
const PRIMARY = "#C7626E";   // rose
const ORANGE  = "#D17953";   // orange
const RED     = "#E16C54";   // coral
const TEAL    = "#3DAB8E";   // for decrease arrows

// ── Journey Map Accordion (Mobile) ────────────────────────────────────────────
const JOURNEY_STEPS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
    ),
    title: "搜尋志工活動",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="9" y1="15" x2="12" y2="15" />
      </svg>
    ),
    title: "報名志工活動",
    discovery: "舊有的報名流程過於碎片化，使用者必須在多個頁面間跳轉才能完成單一任務",
    opportunity: "透過「導入分段進度條」，將原本混亂的註冊與報名流程整合為透明的線性導航",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 2v4h6V2" />
      </svg>
    ),
    title: "等待錄取通知",
    discovery: "流程狀態不透明",
    opportunity: "導入視覺化進度條（Progress Bar）",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    title: "參加志工活動",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 10v12" /><path d="M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />
      </svg>
    ),
    title: "分享活動心得",
    discovery: "缺乏平台分享感動或反饋",
    opportunity: "打造「志工社群功能」",
  },
];

function JourneyMapAccordion() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className={styles.jmAccordion}>
      {JOURNEY_STEPS.map((step, i) => {
        const hasInsight = !!(step.discovery || step.opportunity);
        const isOpen = openIdx === i;
        return (
          <div key={i} className={styles.jmStep}>
            <div
              className={styles.jmStepHeader}
              onClick={() => hasInsight && setOpenIdx(isOpen ? null : i)}
              style={{ cursor: hasInsight ? "pointer" : "default" }}
            >
              <div className={styles.jmStepIcon}>{step.icon}</div>
              <span className={styles.jmStepTitle}>{step.title}</span>
              {hasInsight && (
                <div className={styles.jmStepBadges}>
                  <span className={styles.jmBadgeRed}>發現</span>
                  <span className={styles.jmBadgeGreen}>機會</span>
                  <svg
                    className={styles.jmChevron}
                    data-open={isOpen}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              )}
            </div>
            {hasInsight && isOpen && (
              <div className={styles.jmStepBody}>
                {step.discovery && (
                  <div className={styles.jmInsightRow}>
                    <span className={styles.jmBadgeRed}>發現</span>
                    <p className={styles.jmInsightText}>{step.discovery}</p>
                  </div>
                )}
                {step.opportunity && (
                  <div className={styles.jmInsightRow}>
                    <span className={styles.jmBadgeGreen}>機會</span>
                    <p className={styles.jmInsightText}>{step.opportunity}</p>
                  </div>
                )}
              </div>
            )}
            {i < JOURNEY_STEPS.length - 1 && <div className={styles.jmConnector} />}
          </div>
        );
      })}
    </div>
  );
}

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const el = document.getElementById("main-scroll");
    if (!el) return;
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const target = document.getElementById(id);
        if (target && target.offsetTop - 80 <= el.scrollTop) current = id;
      }
      setActive(current);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}

function scrollToSection(id) {
  const el     = document.getElementById("main-scroll");
  const target = document.getElementById(id);
  if (el && target) el.scrollTo({ top: target.offsetTop - 48, behavior: "smooth" });
}

function scrollToTop() {
  const el = document.getElementById("main-scroll");
  if (el) el.scrollTo({ top: 0, behavior: "smooth" });
}

// ── Nav ───────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "hxy-challenges", label: "問題分析" },
  { id: "hxy-ia",         label: "解決思路" },
  { id: "hxy-results",    label: "設計驗證" },
];

function SectionNav({ active }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
            >{label}</button>
          );
        })}
      </div>
    </nav>
  );
}

// ── Shared: Section Badge ─────────────────────────────────────────────────────
// `color` is truly dynamic (different color per section), keep inline
function SectionBadge({ en, tc, color = PRIMARY }) {
  return (
    <div className={styles.sectionBadgeWrapper}>
      <div className={styles.sectionBadge} style={{ background: color }}>
        <span className={styles.sectionBadgeEn}>{en}</span>
        {tc && <>
          <span className={styles.sectionBadgeDot}>·</span>
          <span className={styles.sectionBadgeTc}>{tc}</span>
        </>}
      </div>
    </div>
  );
}

// ── Shared: Wave SVG ──────────────────────────────────────────────────────────
// `fill` and `flip` are dynamic props, keep inline
function WaveBottom({ fill = WHITE, flip = false }) {
  const d = flip
    ? "M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
    : "M0,40 C360,0 1080,80 1440,40 L1440,80 L0,80 Z";
  return (
    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className={styles.waveSvg}>
      <path d={d} fill={fill} />
    </svg>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
const HXY_HERO_TAGS  = ["UX Research", "A/B Testing", "Usability Test", "2022"];
const HXY_INFO_CARDS = [
  { label: "時程", value: "36 週" },
  { label: "角色", value: "UX Research・UI Design" },
  { label: "工具", value: "Figma・Maze" },
  { label: "成效", value: "錯誤點擊率下降 27%\n任務完成率提升 31%\n易用性分數提升 26%" },
];

function HxyInfoCard({ label, value }) {
  return (
    <div className={styles.infoCard}>
      <div className={styles.infoCardLabel}>{label}</div>
      <div className={styles.infoCardValue}>
        {value.split("\n").map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>

        {/* ← Projects */}
        <div className={styles.heroBackRow}>
          <button
            onClick={() => navigate("/projects")}
            className={styles.heroBackBtn}
          >
            ← Projects
          </button>
        </div>

        {/* 主標題區塊 */}
        <div className={styles.heroContent}>
          {/* Tags */}
          <div className={styles.heroTagsRow}>
            {HXY_HERO_TAGS.map(tag => (
              <span key={tag} className={styles.heroTag}>{tag}</span>
            ))}
          </div>

          {/* 主標題 */}
          <h1 className={styles.heroH1}>數據驅動轉型：樸石人文志工平台的體驗重構</h1>

          {/* 副標題 */}
          <p className={styles.heroSubtitle}>
            透過 2 輪可用性測試與深度訪談，將報名完成率有效提升 31%
          </p>

          {/* Info Cards */}
          <div className={styles.heroInfoCards}>
            {HXY_INFO_CARDS.map(card => (
              <HxyInfoCard key={card.label} {...card} />
            ))}
          </div>
        </div>

        {/* Banner 圖 */}
        <div className={styles.heroBannerWrap}>
          <img src={imgBanner} alt="好心驛 Banner" className={styles.heroBannerImg} />
        </div>

        <div className={styles.heroSpacer} />
      </div>
    </section>
  );
}

// ── CHALLENGES & GOALS ────────────────────────────────────────────────────────
const CORE_DESIGN_ITEMS = [
  {
    n: "01", subtitle: "流程優化", title: "簡化報名流程", badge: "+31% 完成率",
    desc: <>透過<strong>合併冗餘表單</strong>並導入<strong>進度分段機制</strong>，我們成功將複雜的報名流程精簡為 <strong>3 個核心步驟</strong>。這不僅降低了使用者的<strong>認知負荷</strong>，更有效消弭了填表時的<strong>心理阻礙</strong>，使<strong>報名完成率顯著提升 31%</strong>。</>,
    video: proto01,
  },
  {
    n: "02", subtitle: "視覺化進度", title: "報名狀態追蹤", badge: "易用性分數提升",
    desc: <>透過導入<strong style={{color:"#C7626E"}}>即時的狀態追蹤模組</strong>，讓志工隨時能掌握「審核中、已錄取、培訓中」的每個節點；將原本漫長的等待轉化為可預期的目標達成感，顯著降低受試者的挫折感。</>,
    video: proto02,
  },
  {
    n: "03", subtitle: "社群連結", title: "志工交流功能", badge: "強化長期黏著",
    desc: <>為了解決<strong>社群連結薄弱</strong>的痛點，我們建立了<strong>「認識夥伴」社交模組</strong>。透過<strong>心得分享與私訊互動</strong>，將單次的志工任務轉化為具備<strong>歸屬感的社群體驗</strong>，從而強化志工的<strong>長期參與意願與情感黏著度</strong>。</>,
    video: proto03,
  },
];

function Challenges() {
  return (
    <div id="hxy-challenges">
      {/* Cover */}
      <div className={`${styles.sectionCover} ${styles.challengesCover}`}>
        <div className={styles.sectionCoverInner}>
          <SectionBadge en="CHALLENGES & CORE DESIGN"  color={ORANGE} />
          <div className={`${styles.sectionCoverTitle} ${styles.sectionCoverTitleOrange}`}>問題挑戰和核心設計</div>
          <p className={styles.sectionCoverDesc}>找出平台核心痛點，訂定可量化的設計目標。</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>

          {/* 問題挑戰 */}
          <h3 className={styles.challengesSectionH3}>問題挑戰</h3>
          <div className={styles.challengesGrid}>
            {[
              { n: "01", title: "報名流程複雜",   desc: "使用者需跨越多個頁面完成報名，步驟不直覺，導致高放棄率。" },
              { n: "02", title: "被動等待報名通知", desc: "由於無法得知審核進度或培訓時程，這種資訊斷層導致使用者產生極高的不確定感" },
              { n: "03", title: "社群連結薄弱",   desc: "缺乏有效的志工間交流機制，難以建立社群認同感與長期黏著度。" },
            ].map(c => (
              <div key={c.n} className={styles.challengeCard}>
                <div className={styles.challengeCardNum}>{c.n}</div>
                <div className={styles.challengeCardTitle}>{c.title}</div>
                <p className={styles.challengeCardDesc}>{c.desc}</p>
              </div>
            ))}
          </div>

          {/* 核心設計 — 交錯排版 */}
          <h3 className={styles.challengesSectionH3}>核心設計</h3>

          {CORE_DESIGN_ITEMS.map((item, i) => (
            <div key={i} style={{ marginBottom: i < CORE_DESIGN_ITEMS.length - 1 ? 72 : 0 }}>
              <div
                className={styles.outcomesItemGrid}
                data-odd={i % 2 !== 0}
                style={{ gridTemplateColumns: i % 2 === 0 ? "1fr 1.4fr" : "1.4fr 1fr" }}
              >
                <div className={styles.outcomesItemText} data-odd={i % 2 !== 0}>
                  <div className={styles.outcomesNumRow}>
                    <div className={styles.outcomesNumBadge}>{item.n}</div>
                    <span className={styles.outcomesSubtitle}>{item.subtitle}</span>
                    {item.badge && <span className={styles.outcomesBadge}>{item.badge}</span>}
                  </div>
                  <h3 className={styles.outcomesItemH3}>{item.title}</h3>
                  <p className={styles.outcomesItemDesc}>{item.desc}</p>
                </div>
                <video
                  src={item.video}
                  autoPlay loop muted playsInline
                  className={styles.outcomesVideo}
                  data-odd={i % 2 !== 0}
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

// ── USER RESEARCH ─────────────────────────────────────────────────────────────
function UserResearch() {
  return (
    <div id="hxy-research">
      {/* Cover with big title */}
      <div className={`${styles.sectionCover} ${styles.researchCover}`}>
        <div className={styles.sectionCoverInner}>
          <SectionBadge en="RESEARCH"  color={ORANGE} />
          <div className={`${styles.sectionCoverTitle} ${styles.sectionCoverTitleOrange}`}>用戶研究</div>
          <p className={styles.sectionCoverDesc}>洞察痛點：從 8 位志工的真實聲音中找尋重構契機</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>
          {/* Stats */}
          <div className={styles.researchStatsGrid}>
            {[
              { n: "8",  label: "位受訪者", sub: "具長期專案意願的志工" },
              { n: "2",  label: "輪測試",   sub: "Maze 可用性測驗" },
              { n: "3",  label: "核心流程", sub: "報名 → 培訓 → 交流" },
            ].map(s => (
              <div key={s.n} className={styles.researchStatCard}>
                <div className={styles.researchStatNum}>{s.n}</div>
                <div className={styles.researchStatLabel}>{s.label}</div>
                <div className={styles.researchStatSub}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Persona / photo cards */}
          <h3 className={styles.researchSectionH3}>受訪者</h3>
          <div className={styles.researchPhotosGrid}>
            {[
              { src: imgResearchInterview, label: "線上訪談" },
              { src: imgResearchMaze,      label: "A/B Testing 側錄｜Maze" },
            ].map(({ src, label }) => (
              <div key={label}>
                <div className={styles.researchPhotoWrap}>
                  <img src={src} alt={label} className={styles.researchPhotoImg} />
                </div>
                <p className={styles.researchPhotoCaption}>{label}</p>
              </div>
            ))}
          </div>

          {/* User Journey Map */}
          <h3 className={styles.researchSectionH3}>User Journey Map</h3>
          {/* Desktop: two stacked halves; Mobile: single image — handled via CSS */}
          <div className={styles.journeyMapDesktop}>
            <img src={imgJourneyMap} alt="User Journey Map" className={styles.journeyMapImg} />
          </div>
          <JourneyMapAccordion />
        </div>
      </div>
    </div>
  );
}

// ── SOLUTION ──────────────────────────────────────────────────
function InfoArchitecture() {
  return (
    <div id="hxy-ia">
      {/* Cover with big title */}
      <div className={`${styles.sectionCover} ${styles.iaCover}`}>
        <div className={styles.sectionCoverInner}>
          <SectionBadge en="SOLUTION" color={RED} />
          <div className={`${styles.sectionCoverTitle} ${styles.sectionCoverTitleRed}`}>解決思路</div>
          <p className={styles.sectionCoverDesc}>資訊架構重構，消除功能擴張帶來的認知負荷</p>
        </div>
        <WaveBottom fill={WHITE} flip />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>
          {/* 用戶任務流程 */}
          <h3 className={styles.iaContentH3}>用戶任務流程</h3>

          {/* Speech bubble + FLOW cards */}
          <div className={styles.iaFlowRow}>
            {/* Left: speech bubble on top + circular persona below */}
            <div className={styles.iaPersonaCol}>
              {/* Speech bubble */}
              <div className={styles.iaSpeechBubble}>
                <p className={styles.iaSpeechText}>
                  「我是初次使用志工聯盟孵化器平台的用戶，想要報名志工活動。」
                </p>
                {/* Bubble caret pointing down */}
                <div className={styles.iaSpeechCaret} />
              </div>
              {/* Circular persona photo */}
              <img
                src={imgIaPersona}
                alt="Persona 照片"
                className={styles.iaPersonaImg}
              />
            </div>

            {/* Right: User Flow Diagram image */}
            <div className={styles.iaUserflowCol}>
              <img src={imgIaUserflow} alt="用戶任務流程圖" className={styles.iaUserflowImg} />
            </div>
          </div>

          {/* Change highlights */}
          <h3 className={styles.iaContentH3sm}>資訊架構調整</h3>
          <ul className={styles.iaChangeList}>
            <li className={styles.iaChangeItem}>集中主要功能：將原本分散的報名與培訓紀錄整合至此，降低搜尋成本。</li>
            <li className={styles.iaChangeItem}>新增交流功能模組：強化志工之間的活動交流，也能增加平台黏著度。</li>
          </ul>

          {/* IA diagram — responsive via CSS */}
          <div style={{ marginBottom: 72 }}>
            <img src={imgIaSitemap}       alt="資訊架構圖" className={styles.iaSitemapDesktop} />
            <img src={imgIaSitemapMobile} alt="資訊架構圖" className={styles.iaSitemapMobile} />
          </div>

          {/* 設計演進 */}
          <h3 className={styles.iaContentH3}>設計演進：從資訊混亂到直覺導引</h3>
          <div className={styles.evolutionGrid}>

            {/* 演進 01 */}
            <div className={styles.evolutionImgRow}>
              <div className={styles.evolutionImgWrap}>
                <span className={`${styles.evolutionTag} ${styles.evolutionTagBefore}`}>Before</span>
                <img src="/images/hoxinyi/evolution-01-before.webp" alt="設計演進 1 Before" className={styles.evolutionImg} />
              </div>
              <div className={styles.evolutionImgWrap}>
                <span className={`${styles.evolutionTag} ${styles.evolutionTagAfter}`}>After</span>
                <img src="/images/hoxinyi/evolution-01-after.webp" alt="設計演進 1 After" className={styles.evolutionImg} />
              </div>
            </div>

            {/* 演進 02 */}
            <div className={styles.evolutionImgRow}>
              <div className={styles.evolutionImgWrap}>
                <span className={`${styles.evolutionTag} ${styles.evolutionTagBefore}`}>Before</span>
                <img src="/images/hoxinyi/evolution-02-before.webp" alt="設計演進 2 Before" className={styles.evolutionImg} />
              </div>
              <div className={styles.evolutionImgWrap}>
                <span className={`${styles.evolutionTag} ${styles.evolutionTagAfter}`}>After</span>
                <img src="/images/hoxinyi/evolution-02-after.webp" alt="設計演進 2 After" className={styles.evolutionImg} />
              </div>
            </div>

            {/* 演進 03 */}
            <div className={styles.evolutionImgRow}>
              <div className={styles.evolutionImgWrap}>
                <span className={`${styles.evolutionTag} ${styles.evolutionTagBefore}`}>Before</span>
                <img src="/images/hoxinyi/evolution-03-before.webp" alt="設計演進 3 Before" className={styles.evolutionImg} />
              </div>
              <div className={styles.evolutionImgWrap}>
                <span className={`${styles.evolutionTag} ${styles.evolutionTagAfter}`}>After</span>
                <img src="/images/hoxinyi/evolution-03-after.webp" alt="設計演進 3 After" className={styles.evolutionImg} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// ── DESIGN OUTCOMES ───────────────────────────────────────────────────────────
// ── RESULTS ───────────────────────────────────────────────────────────────────
function Results() {
  const tasks = [
    "完成註冊登入及活動報名",
    "完成報名參加志工培訓",
    "完成活動後心得經驗分享",
  ];

  const methods = [
    "遠端測試、螢幕錄影",
    "MAZE任務測試",
    "SUS易用性量表測試",
  ];

  const tableRows = [
    { label: "原MVP",  n: "7 人", misclick: "64.3%", time: "255.0s", success: "28.6%", error: "0%",    score: "27", highlight: false, scoreHot: false, hot: [2, 4] },
    { label: "好心驛", n: "8 人", misclick: "47.2%", time: "838.3s", success: "37.5%", error: "12.5%", score: "34", highlight: false, scoreHot: true,  hot: [3] },
  ];

  // `color` per metric is runtime data (TEAL vs RED), kept inline
  const metrics = [
    { label: "錯誤點擊率", en: "MISCLICK RATE",    pct: "27%", dir: "down", color: TEAL   },
    { label: "完成率",     en: "AVG SUCCESS",       pct: "31%", dir: "up",   color: RED    },
    { label: "易用性分數", en: "USABILITY SCORE",   pct: "26%", dir: "up",   color: RED    },
  ];

  return (
    <div id="hxy-results">
      {/* Cover */}
      <div className={`${styles.sectionCover} ${styles.resultsCover}`}>
        <div className={styles.resultsCoverInner}>
          <SectionBadge en="DESIGN OUTCOMES" color={`${WHITE}30`} />
          <div className={styles.resultsCoverTitle}>設計驗證</div>
          <p className={styles.resultsCoverSub}>易用性 &amp; SUS分析</p>
        </div>
        <WaveBottom fill={WHITE} />
      </div>

      {/* Content */}
      <div className={styles.sectionContent}>
        <div className={styles.sectionContentInner}>

        {/* ── 易用性測試報告 ── */}
        <h3 className={styles.resultsSectionH3}>
          <span className={styles.orangeDot} />
          易用性測試報告
        </h3>

        <div className={styles.usabilityGrid}>
          {/* Left: tasks + methods */}
          <div className={styles.usabilityLeft}>
            {/* 主要目標任務 */}
            <div className={styles.usabilityBox}>
              <div className={styles.usabilityBoxLabel}>主要目標任務</div>
              <ul className={styles.usabilityList}>
                {tasks.map((t, i) => (
                  <li key={i} className={styles.usabilityListItem}>
                    <svg className={styles.usabilityCheckIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="10" fill="#C7626E" fillOpacity="0.15"/>
                      <path d="M5.5 10.5L8.5 13.5L14.5 7.5" stroke="#C7626E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.usabilityListText}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* 測試方法 */}
            <div className={styles.usabilityBox}>
              <div className={styles.usabilityBoxLabel}>測試方法</div>
              <ul className={styles.usabilityList}>
                {methods.map((m, i) => (
                  <li key={i} className={styles.usabilityListItem}>
                    <svg className={styles.usabilityCheckIcon} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="10" fill="#C7626E" fillOpacity="0.15"/>
                      <path d="M5.5 10.5L8.5 13.5L14.5 7.5" stroke="#C7626E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className={styles.usabilityListText}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: 測試者篩選機制 */}
          <div className={styles.testerBox}>
            <div className={styles.testerBoxLabel}>測試者篩選機制</div>
            <p className={styles.testerStrategyText}>
              為確保迭代設計能精準對齊真實服務場景，本次專案透過
              <strong>「台灣樸石人文協會」精準招募受測者。樣本涵蓋首輪 MVP 回訪使用者（驗證改版成效）與高度符合 Persona 特徵的長期志工</strong>
              （深度洞察專業需求），透過多元的樣本組成，補齊原始架構中的資訊斷點與操作瓶頸。
            </p>
            <div className={styles.testerGrid}>
              {[
                { label: "原MVP",  imgSrc: imgTesterMvp, highlight: false },
                { label: "好心驛", imgSrc: imgIaPersona, highlight: true  },
              ].map(p => (
                <div key={p.label} className={styles.testerCol}>
                  <div style={{
                    background: p.highlight ? ORANGE : PRIMARY,
                    color: WHITE,
                    borderRadius: 9999,
                    padding: "3px 16px",
                    fontFamily: "'Noto Sans TC', 'PingFang TC', system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                  }}>{p.label}</div>
                  <img src={p.imgSrc} alt={p.label} className={styles.testerImg} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAZE測試比較 table ── */}
        <h3 className={styles.resultsSectionH3sm}>
          <span className={styles.orangeDot} />
          MAZE測試比較
        </h3>
        <div className={styles.tableWrap}>
          <table className={styles.mazeTable}>
            <thead>
              <tr className={styles.mazeTableHead}>
                {["測試版本", "人數", "錯誤點擊率", "持續時間", "完成率", "錯誤率", "綜合評分"].map(h => (
                  <th key={h} className={styles.mazeTableTh}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map(row => (
                /* Row background is runtime-dynamic: highlighted vs not */
                <tr key={row.label} style={{
                  background: row.highlight ? `${ORANGE}08` : WHITE,
                }}>
                  {[
                    /* Label cell: badge color is runtime-dynamic */
                    <span style={{
                      background:   row.highlight ? ORANGE : `${DARK}18`,
                      color:        row.highlight ? WHITE  : DARK,
                      borderRadius: 9999,
                      padding:      "3px 14px",
                      fontWeight:   700,
                      fontSize:     13,
                    }}>{row.label}</span>,
                    row.n, row.misclick, row.time, row.success, row.error,
                    /* Score cell: color is runtime-dynamic */
                    <span style={{
                      fontFamily: "Poppins, 'Noto Sans TC', system-ui, sans-serif",
                      fontWeight: 700,
                      fontSize:   20,
                      color:      (row.highlight || row.scoreHot) ? ORANGE : DARK,
                    }}>{row.score}</span>,
                  ].map((cell, ci) => (
                    <td key={ci} className={styles.mazeTableTd}>
                      {/* "hot" cells have runtime-dynamic orange highlight */}
                      {row.hot.includes(ci)
                        ? <span className={styles.mazeHotCell}>{cell}</span>
                        : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── MAZE測試目標指數 ── */}
        <h3 className={styles.resultsSectionH3md}>
          <span className={styles.orangeDot} />
          MAZE測試目標指數
        </h3>
        <div className={styles.metricsGrid}>
          {metrics.map(m => (
            <div key={m.label} className={styles.metricCard}>
              <div className={styles.metricLabel}>{m.label}</div>
              <div className={styles.metricEn}>{m.en}</div>
              <div className={styles.metricPctRow}>
                {/* Arrow SVG color is runtime-dynamic from m.color */}
                <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
                  {m.dir === "down"
                    ? <path d="M4 4 L28 20" stroke={m.color} strokeWidth="3" strokeLinecap="round"/>
                    : <path d="M4 20 L28 4" stroke={m.color} strokeWidth="3" strokeLinecap="round"/>}
                  {m.dir === "down"
                    ? <path d="M16 20 L28 20 L28 8" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    : <path d="M16 4 L28 4 L28 16" stroke={m.color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>}
                </svg>
                {/* Percentage color is runtime-dynamic from m.color */}
                <span className={styles.metricPct} style={{ color: m.color }}>{m.pct}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── SUS量表分數散佈圖 ── */}
        <h3 className={styles.resultsSectionH3sm}>
          <span className={styles.orangeDot} />
          SUS量表分數散佈圖
        </h3>
        <div className={styles.susGrid}>
          <div>
            <div className={styles.susBadgeMvp}>原MVP</div>
            <img src={imgSusChartMvp} alt="原MVP SUS散佈圖" className={styles.susImg} />
          </div>
          <div>
            <div className={styles.susBadgeHoxy}>好心驛</div>
            <img src={imgSusChartHoxy} alt="好心驛 SUS散佈圖" className={styles.susImg} />
          </div>
        </div>

        {/* ── 成效分析 ── */}
        <h3 className={styles.resultsSectionH3md}>
          <span className={styles.orangeDot} />
          成效分析
        </h3>
        <div className={styles.outcomesCardsGrid}>
          <img src={imgResultsCard01} alt="27→34 報名完成度提高"  className={styles.outcomesCardImg} />
          <img src={imgResultsCard02} alt="D→C SUS量表分數提高"   className={styles.outcomesCardImg} />
          <img src={imgResultsCard03} alt="志工黏著度提高"         className={styles.outcomesCardImg} />
          <img src={imgResultsCard04} alt="NEXT STEP"              className={styles.outcomesCardImg} />
        </div>
        </div>{/* /maxWidth */}
      </div>
    </div>
  );
}

// ── MAIN EXPORT ────────────────────────────────────────────────────────────────
const SECTION_IDS = NAV_ITEMS.map(n => n.id);

export default function HoxinYiScrollStory() {
  const active = useActiveSection(SECTION_IDS);
  return (
    <>
      <Hero />
      <SectionNav active={active} />
      <Challenges />
      <UserResearch />
      <InfoArchitecture />
      <Results />
      {createPortal(
        <button onClick={scrollToTop} className={`${styles.glassBtn} ${styles.glassBtnRight}`}>
          ↑ 回到頂部
        </button>,
        document.body
      )}
    </>
  );
}
