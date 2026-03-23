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
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
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
    img: "/images/sbux/sbux-hero.webp",
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
    img: "/images/hoxinyi/cover.webp",
    scrollStory: "hoxinyi",
    impact: [],
    sections: [],
  },
];

// ── GitHub Repos ───────────────────────────────────────────────────────────────
export const REPOS = [
  {
    id: "data-viz-component",
    name: "data-viz-component",
    branch: "main",
    lang: "CSS / React",
    langColor: T.accent,
    desc: "政府數據專案使用的圖表組件庫。包含 Bar、Line、Choropleth Map 三種類型，支援無障礙色彩模式。",
    tags: ["Component", "Data Viz", "A11y"],
    stars: 12,
    code: `/* Animated bar with CSS custom properties */
.bar-track {
  --bar-height: 6px;
  --bar-radius: 3px;
  --duration: 1s;

  height: var(--bar-height);
  background: #2A2520;
  border-radius: var(--bar-radius);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: var(--bar-radius);
  background: var(--accent, #C8923A);
  transform-origin: left;
  animation: barGrow var(--duration)
    cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes barGrow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}`,
    screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75",
    github: "https://github.com/yourusername/data-viz-component",
  },
  {
    id: "micro-interaction-kit",
    name: "micro-interaction-kit",
    branch: "main",
    lang: "CSS",
    langColor: "#6B4FBB",
    desc: "純 CSS 微互動集合。Focus ring、Loading state、Success animation 等 12 個常用模式，無 JS 依賴。",
    tags: ["CSS", "Animation", "No-JS"],
    stars: 28,
    code: `/* Breathing focus ring — no JS needed */
.btn:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--bg),
    0 0 0 4px var(--accent),
    0 0 12px 2px rgba(var(--accent-rgb), 0.3);
  animation: focusPulse 2s ease-in-out infinite;
}

@keyframes focusPulse {
  0%, 100% {
    box-shadow:
      0 0 0 2px var(--bg),
      0 0 0 4px var(--accent),
      0 0 12px 2px rgba(var(--accent-rgb), 0.2);
  }
  50% {
    box-shadow:
      0 0 0 2px var(--bg),
      0 0 0 4px var(--accent),
      0 0 20px 4px rgba(var(--accent-rgb), 0.4);
  }
}`,
    screenshot: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=75",
    github: "https://github.com/yourusername/micro-interaction-kit",
  },
  {
    id: "form-ux-patterns",
    name: "form-ux-patterns",
    branch: "main",
    lang: "HTML / CSS",
    langColor: T.green,
    desc: "表單 UX 最佳實踐集。涵蓋即時驗證、錯誤狀態、多步驟流程，基於真實 KYC 流程重構經驗。",
    tags: ["Forms", "Validation", "UX Pattern"],
    stars: 7,
    code: `/* Inline validation — calm, not alarming */
.field {
  position: relative;
  transition: transform 0.15s ease;
}

.field--error {
  transform: translateX(0);
  animation: shake 0.4s ease;
}

.field__message {
  font-size: 12px;
  margin-top: 6px;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 0.2s, transform 0.2s;
}

.field--error .field__message {
  opacity: 1;
  transform: translateY(0);
  color: #E07A5F;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-4px); }
  75%       { transform: translateX(4px); }
}`,
    screenshot: "https://images.unsplash.com/photo-1555421689-d68471e189f2?w=700&q=75",
    github: "https://github.com/yourusername/form-ux-patterns",
  },
  {
    id: "design-token-system",
    name: "design-token-system",
    branch: "main",
    lang: "JSON / CSS",
    langColor: "#BB4F7A",
    desc: "跨平台設計 Token 管理系統。統一色彩、間距、字型等設計決策，支援 Web / iOS / Android 三端輸出。",
    tags: ["Design System", "Token", "Cross-Platform"],
    stars: 19,
    code: `/* Token 結構：語意化命名 */
:root {
  /* Primitive */
  --color-orange-500: #FF6200;
  --color-gray-100:  #F5F4F2;

  /* Semantic */
  --color-action:    var(--color-orange-500);
  --color-surface:   var(--color-gray-100);

  /* Component */
  --btn-bg:          var(--color-action);
  --btn-radius:      8px;
}`,
    screenshot: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=75",
    github: "https://github.com/yourusername/design-token-system",
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
