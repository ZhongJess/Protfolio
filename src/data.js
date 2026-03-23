// ── 所有靜態資料 ───────────────────────────────────────────────────────────────
// 修改這裡來更新專案、repo、技能等內容

import T from "./tokens";

// ── 作品集專案 ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "rent4u",
    num: "00",
    title: "Rent4U 輔具租賃平台",
    tags: ["Market Research", "UX Strategy", "Design System", "PM"],
    tagColor: "#FF6200",
    desc: "讓輔具借用像借書一樣簡單——適配、諮詢、租賃三步驟無縫整合的數位平台。",
    year: "2025",
    img: "/images/project/rent4u.webp",
    scrollStory: true,
    impact: [],
    sections: [],
  },
  {
    id: "starbucks-mop",
    num: "01",
    title: "Starbucks 行動預點 MOP",
    tags: ["Service Design", "Redesign", "Mobile App"],
    tagColor: "#036242",
    desc: "彈性省時，預約星體驗——以夥伴視角重新設計星巴克行動預點的點餐流程，改善 App Store 2.1 星的使用者痛點。",
    year: "2024",
    img: "/images/project/starbuckMOP.webp",
    scrollStory: "starbucks-mop",
    impact: [],
    sections: [],
  },
  {
    id: "hoxinyi",
    num: "02",
    title: "好心驛 志工媒合平台",
    tags: ["UX Research", "A/B Testing", "Usability Test"],
    tagColor: "#C7626E",
    desc: "讓志工報名更簡單、培訓更清楚、交流更順暢——為台灣樸石人文協會打造的志願服務媒合平台。",
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
    id: "desinger",
    name: "Desinger",
    branch: "main",
    lang: "HTML / CSS",
    langColor: "#E44D26",
    desc: "依據 AdobeXD 設計稿，以純 HTML5 / CSS3 手刻完成的平面設計師個人作品集頁面。零框架實現 Flexbox / Grid 響應式排版，涵蓋 Hero、About、個人品牌 XXXD 介紹及 2016–2020 年平面設計作品集。",
    tags: ["HTML5", "CSS3", "Flexbox / Grid", "RWD"],
    stars: 0,
    demo: "https://zhongjess.github.io/Desinger/",
    github: "https://github.com/ZhongJess/Desinger",
    screenshot: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=75",
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
  {
    id: "htmlcssupdate",
    name: "htmlcssUpdate",
    branch: "main",
    lang: "HTML / CSS / jQuery",
    langColor: "#1572B6",
    desc: "六角學院切版專案——以 HTML5 / CSS3 搭配 jQuery 3.7.1 實作個人品牌形象網站，涵蓋漢堡選單、六件作品卡片展示與分頁導覽，全程採用 RWD Media Queries 響應式設計。",
    tags: ["HTML5", "CSS3", "jQuery", "RWD"],
    stars: 0,
    demo: "https://zhongjess.github.io/htmlcssUpdate/",
    github: "https://github.com/ZhongJess/htmlcssUpdate",
    screenshot: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=700&q=75",
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
    id: "sweetaste",
    name: "Sweetaste",
    branch: "main",
    lang: "SCSS / Vite",
    langColor: "#C06AC4",
    desc: "以 Vite + EJS + SCSS + Bootstrap 5 打造的響應式甜點電商平台，完整實現從首頁瀏覽、購物車管理到訂單確認的八頁購買流程，並建構語意化 SCSS 色彩 Token 系統。",
    tags: ["Vite", "SCSS", "Bootstrap 5", "EJS"],
    stars: 0,
    demo: "https://zhongjess.github.io/Sweetaste/",
    github: "https://github.com/ZhongJess/Sweetaste",
    screenshot: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&q=75",
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
    id: "penghu-airport",
    name: "Penghu-Airport",
    branch: "main",
    lang: "Sass / Bootstrap",
    langColor: "#CF649A",
    desc: "UX/UI 設計師的切版回歸練習——採用模組化 Sass（SCSS）架構重構澎湖機場頁面，補齊無障礙（A11y）設計細節，以基礎 / 元件 / 版面三層結構提升樣式可維護性。",
    tags: ["Sass/SCSS", "Bootstrap", "A11y", "RWD"],
    stars: 0,
    demo: "https://zhongjess.github.io/Penghu-Airport/",
    github: "https://github.com/ZhongJess/Penghu-Airport",
    screenshot: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=75",
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
];

// ── 設計工具跑馬燈 ──────────────────────────────────────────────────────────────
export const DESIGN_TOOLS = [
  { label: "Figma",          color: "#BB4F7A" },
  { label: "Miro",           color: "#F8C300" },
  { label: "GitHub",         color: "#6BBB4F" },
  { label: "Notion",         color: "#888888" },
  { label: "Claude Code",    color: "#8A6BBB" },
  { label: "Visual Studio",  color: "#4FA8BB" },
];

// ── 技能標籤（星座 Hero 用）─────────────────────────────────────────────────────
export const SKILL_PILLS = [
  { label: "User Research",                  color: "#BB7A4F" },
  { label: "Market Research",               color: "#A07840" },
  { label: "Interaction Design",            color: "#7B6FBB" },
  { label: "Design System Guideline",       color: "#4F7FBB" },
  { label: "Information Architecture (IA)", color: "#2DA567" },
  { label: "User-Centered Design (UCD)",    color: "#5BAA80" },
  { label: "Wireframe",                     color: "#7B6FBB" },
  { label: "Prototype",                     color: "#BB9A4F" },
  { label: "RWD",                           color: "#4F9BBB" },
  { label: "HTML / CSS",                    color: "#BB7A4F" },
  { label: "Figma",                         color: "#BB4F7A" },
  { label: "Git",                           color: "#6BBB4F" },
  { label: "Vibe Coding",                   color: "#C8923A" },
  { label: "ClaudeCode",                    color: "#8A6BBB" },
  { label: "APP",                           color: "#BB4F7A" },
  { label: "A/B Testing",                   color: "#4F9BBB" },
];
