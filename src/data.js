// ── 所有靜態資料 ───────────────────────────────────────────────────────────────
// 修改這裡來更新專案、repo、技能等內容

import T from "./tokens";

// ── 作品集專案 ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "erp-crm",
    num: "00",
    title: "ERP / CRM 系統重設計",
    tags: ["UX Research", "Information Architecture", "Role-based Dashboard", "AI-Assisted Design"],
    tagColor: "#2563EB",
    desc: "為數位轉型顧問公司主導 CRM 模組設計——從 10 場跨部門訪談到可部署的 Demo，用 AI 工具加速交付同時保留關鍵的人為判斷。",
    year: "2026",
    img: "/images/project/erp-crm.webp",
    scrollStory: "erp-crm",
    impact: [],
    sections: [],
  },
  {
    id: "rent4u",
    num: "01",
    title: "Rent4U 輔具租賃平台",
    tags: ["Market Research", "UX Strategy", "Design System", "PM"],
    tagColor: "#FF6200",
    desc: "整合適配與諮詢，用設計打破繁瑣，打造極致流暢的數位租賃體驗。",
    year: "2025",
    img: "/images/project/rent4u.webp",
    scrollStory: true,
    impact: [],
    sections: [],
  },
  {
    id: "starbucks-mop",
    num: "02",
    title: "Starbucks 行動預點 MOP",
    tags: ["Service Design", "Redesign", "Mobile App"],
    tagColor: "#036242",
    desc: "以夥伴視角重新設計 MOP 流程，精準解決 App Store 使用者最在意的痛點。",
    year: "2024",
    img: "/images/project/starbuckMOP.webp",
    scrollStory: "starbucks-mop",
    impact: [],
    sections: [],
  },
  {
    id: "hoxinyi",
    num: "03",
    title: "好心驛 志工媒合平台",
    tags: ["UX Research", "A/B Testing", "Usability Test"],
    tagColor: "#C7626E",
    desc: "透過 A/B Testing 與可用性測試，大幅簡化志工報名與培訓的複雜流程。",
    year: "2022",
    img: "/images/project/howxiyi.webp",
    scrollStory: "hoxinyi",
    impact: [],
    sections: [],
  },
];

// ── GitHub Repos ───────────────────────────────────────────────────────────────
export const REPOS = [
  {
    id: "penghu-airport",
    name: "Penghu-Airport",
    branch: "main",
    lang: "Sass / Bootstrap",
    langColor: "#CF649A",
    desc: "運用模組化 SCSS 三層架構重構澎湖機場頁面。專注於提升樣式可維護性與無障礙（A11y）設計細節，是身為 UI/UX 設計師對前端切版的深度實踐。",
    tags: ["Sass/SCSS", "Bootstrap", "A11y", "RWD"],
    stars: 0,
    demo: "https://zhongjess.github.io/Penghu-Airport/",
    github: "https://github.com/ZhongJess/Penghu-Airport",
    screenshot: "/images/repo/Penghu-Airport.png",
    code: `/* Sass 模組化入口 style.scss */
@use 'base/variables'    as *;
@use 'base/mixins'       as *;
@use 'base/reset';
@use 'base/accessibility';
@use 'base/animate';

@use 'components/header';
@use 'components/banner';
@use 'components/route';
@use 'components/spot';
@use 'components/modal';

@use 'layout/container';
@use 'layout/footer';

/* 無障礙焦點樣式 */
:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}`,
  },
  {
    id: "sweetaste",
    name: "Sweetaste",
    branch: "main",
    lang: "SCSS / Vite",
    langColor: "#C06AC4",
    desc: "以 Vite + EJS 打造的八頁式甜點電商平台。運用 Bootstrap 5 與 SCSS 建立具語意化的色彩系統，完整實現從商品瀏覽到下單結帳的購物流程。",
    tags: ["Vite", "SCSS", "Bootstrap 5", "EJS"],
    stars: 0,
    demo: "https://zhongjess.github.io/Sweetaste/",
    github: "https://github.com/ZhongJess/Sweetaste",
    screenshot: "/images/repo/Sweetaste.webp",
    code: `/* 色彩系統 — 語意化 SCSS 變數 */
$primary:  #3F5D45;  // 導覽列、按鈕、標籤
$bg-light: #EAF0ED;  // 區塊背景
$text-sub: #8DA291;  // 內文輔助色
$accent:   #FFE180;  // Hover、強調元素

.btn-primary {
  background-color: $primary;
  color: #fff;
  border-radius: 4px;
  transition: background 0.2s;

  &:hover {
    background-color: darken($primary, 8%);
  }
}

/* 購物車商品列表 */
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid $bg-light;
}`,
  },
  {
    id: "htmlcssupdate",
    name: "htmlcssUpdate",
    branch: "main",
    lang: "HTML / CSS / jQuery",
    langColor: "#1572B6",
    desc: "結合 jQuery 3.7.1 實作漢堡選單與分頁導覽，並透過 Media Queries 確保在各種裝置下均有完美的響應式瀏覽體驗。",
    tags: ["HTML5", "CSS3", "jQuery", "RWD"],
    stars: 0,
    demo: "https://zhongjess.github.io/htmlcssUpdate/",
    github: "https://github.com/ZhongJess/htmlcssUpdate",
    screenshot: "/images/repo/htmlcssUpdate.webp",
    code: `/* 漢堡選單切換（jQuery） */
$('.hamburger').on('click', function () {
  $(this).toggleClass('is-active');
  $('.nav-menu').slideToggle(300);
});

/* 作品卡片 Hover 效果 */
.work-card {
  transition: transform 0.25s ease,
              box-shadow 0.25s ease;
}

.work-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

/* RWD 斷點 */
@media (max-width: 768px) {
  .works-grid { grid-template-columns: 1fr; }
  .nav-menu   { display: none; }
}`,
  },
  {
    id: "desinger",
    name: "Desinger",
    branch: "main",
    lang: "HTML / CSS",
    langColor: "#E44D26",
    desc: "以純 HTML5 / CSS3 手刻完成的響應式作品集頁面。不依賴框架，純粹利用 Flexbox / Grid 實現複雜排版。",
    tags: ["HTML5", "CSS3", "Flexbox / Grid", "RWD"],
    stars: 0,
    demo: "https://zhongjess.github.io/Desinger/",
    github: "https://github.com/ZhongJess/Desinger",
    screenshot: "/images/repo/Desinger.webp",
    code: `/* 純手刻 RWD — 無框架 Grid 排版 */
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
}

/* Flexbox 導覽列 */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
}

/* Hero 主視覺 */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10vw;
}`,
  },
];

// ── 設計工具跑馬燈 ──────────────────────────────────────────────────────────────
export const DESIGN_TOOLS = [
  { label: "Figma", color: "#BB4F7A" },
  { label: "Miro", color: "#F8C300" },
  { label: "GitHub", color: "#6BBB4F" },
  { label: "Notion", color: "#888888" },
  { label: "Claude Code", color: "#8A6BBB" },
  { label: "Visual Studio", color: "#4FA8BB" },
];

// ── 技能標籤（星座 Hero 用）─────────────────────────────────────────────────────
export const SKILL_PILLS = [
  { label: "User Research", color: "#BB7A4F" },
  { label: "Market Research", color: "#A07840" },
  { label: "Interaction Design", color: "#7B6FBB" },
  { label: "Design System Guideline", color: "#4F7FBB" },
  { label: "Information Architecture (IA)", color: "#2DA567" },
  { label: "User-Centered Design (UCD)", color: "#5BAA80" },
  { label: "Wireframe", color: "#7B6FBB" },
  { label: "Prototype", color: "#BB9A4F" },
  { label: "RWD", color: "#4F9BBB" },
  { label: "HTML / CSS", color: "#BB7A4F" },
  { label: "Figma", color: "#BB4F7A" },
  { label: "Git", color: "#6BBB4F" },
  { label: "Vibe Coding", color: "#C8923A" },
  { label: "ClaudeCode", color: "#8A6BBB" },
  { label: "APP", color: "#BB4F7A" },
  { label: "A/B Testing", color: "#4F9BBB" },
];
