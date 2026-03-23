// ── 所有靜態資料 ───────────────────────────────────────────────────────────────
// 修改這裡來更新專案、repo、技能等內容

import T from "./tokens";

// ── 作品集專案 ─────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "hoxinyi",
    num: "00",
    title: "好心驛 志工媒合平台",
    tags: ["UX Research", "UI Design", "Usability Testing"],
    tagColor: "#C7626E",
    desc: "讓志工報名更簡單、培訓更清楚、交流更順暢——為樸石人文協會打造的志願服務媒合平台。",
    year: "2025",
    img: "/images/hoxinyi/cover.webp",
    scrollStory: "hoxinyi",
    impact: [],
    sections: [],
  },
  {
    id: "rent4u",
    num: "00",
    title: "Rent4U 輔具租賃平台",
    tags: ["UX Research", "Product Strategy", "Interaction"],
    tagColor: "#FF6200",
    desc: "讓輔具借用像借書一樣簡單——適配、諮詢、租賃三步驟無縫整合的數位平台。",
    year: "2025",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    scrollStory: true,   // ← triggers Rent4UScrollStory renderer
    // impact & sections not used (scrollStory handles its own content)
    impact: [],
    sections: [],
  },

  {
    id: "starbucks-mop",
    num: "01",
    title: "Starbucks 行動預點 MOP",
    tags: ["UX Research", "UI Redesign", "Mobile App"],
    tagColor: "#036242",
    desc: "彈性省時，預約星體驗——以夥伴視角重新設計星巴克行動預點的點餐流程，改善 App Store 2.1 星的使用者痛點。",
    year: "2024",
    img: "/images/sbux/sbux-hero.webp",
    scrollStory: "starbucks-mop",
    impact: [],
    sections: [],
  },

  {
    id: "gov-data",
    num: "02",
    title: "Government Data Dashboard",
    tags: ["Strategy", "Data Viz", "Business Impact"],
    tagColor: T.accent,
    desc: "將 30 萬筆市政數據轉化為決策介面，政策分析時間從 3 天縮短至 4 小時。",
    year: "2025",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80",
    impact: [
      { label: "分析時間",   before: "3 days", after: "4 hrs", delta: "↓ 94%" },
      { label: "用戶採用率", before: "12%",    after: "67%",   delta: "↑ 458%" },
      { label: "決策錯誤率", before: "23%",    after: "8%",    delta: "↓ 65%" },
    ],
    sections: [
      {
        heading: "問題背景",
        label: "The Problem",
        body: `政府內部分析師每天面對數十個 Excel 檔、不一致的欄位命名，以及缺乏視覺化工具的決策環境。
每一份報告都需要 3 天手動整合，且結果難以被非技術背景的長官快速理解。

這不只是效率問題——延遲的數據等於延遲的決策，影響的是真實的公共資源配置。`,
      },
      {
        heading: "研究與洞察",
        label: "Research",
        body: `訪談了 12 位分析師與 4 位局長級決策者。核心發現：

• 分析師的痛點是「整合」，不是「分析」——70% 時間在清理數據
• 決策者的痛點是「信任」——看不懂圖表就不敢拍板
• 兩者的需求截然不同，但共用同一套工具

這個洞察直接決定了介面的雙層架構設計。`,
      },
      {
        heading: "設計決策",
        label: "Design Decisions",
        body: `選擇雙層視圖架構：
「摘要層」給決策者——3 個關鍵指標、1 張地圖、1 個趨勢線
「分析層」給分析師——完整數據表、篩選器、匯出功能

色彩系統刻意限制在 3 色：警示紅、常態藍、優良綠。
避免設計師常見的過度美化陷阱——政府使用者需要的是可信任，而不是漂亮。`,
      },
      {
        heading: "結果與反思",
        label: "Outcome",
        body: `上線 6 週後的數據顯示採用率從 12% 提升至 67%。
最出乎意料的反饋是：長官開始在會議上直接打開 dashboard，而非等待 PPT 簡報。

反思：我低估了「載入速度」對信任感的影響。
首次載入超過 3 秒，用戶就會懷疑「數據是不是即時的」。
這個細節在第二版迭代中優先修復。`,
      },
    ],
  },
  {
    id: "fintech-onboarding",
    num: "03",
    title: "Fintech Onboarding Redesign",
    tags: ["UX Research", "Interaction", "Business Impact"],
    tagColor: "#6B4FBB",
    desc: "將 23 步 KYC 流程重建為漸進式揭露設計，啟動率提升 41%。",
    year: "2025",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80",
    impact: [
      { label: "啟動完成率",       before: "31%",   after: "72%",  delta: "↑ 132%" },
      { label: "用戶平均步驟數感知", before: "23 步", after: "7 步", delta: "同樣流程" },
      { label: "客服詢問量",       before: "基準",  after: "−38%", delta: "↓ 38%" },
    ],
    sections: [
      { heading: "問題背景", label: "The Problem",      body: "請在此填入你的專案背景說明。說明業務痛點、當時的環境限制，以及為什麼這個問題值得被解決。" },
      { heading: "研究與洞察", label: "Research",       body: "請填入你的研究方法與核心發現。包含訪談對象、使用性測試結果，或數據分析的關鍵洞察。" },
      { heading: "設計決策", label: "Design Decisions", body: "請說明你做了哪些關鍵的設計選擇，以及背後的邏輯。這是展示你思維深度的地方。" },
      { heading: "結果與反思", label: "Outcome",        body: "請填入量化成果與質化回饋，以及你從這個專案中學到的最重要一件事。" },
    ],
  },
  {
    id: "retention-system",
    num: "04",
    title: "E-commerce Retention System",
    tags: ["Growth", "Gamification", "Strategy"],
    tagColor: T.green,
    desc: "基於 RFM 分群設計忠誠度迴圈，D30 留存率提升 18%。",
    year: "2024",
    img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80",
    impact: [
      { label: "D30 留存率",   before: "基準",    after: "+18%",   delta: "↑ 18%" },
      { label: "高價值客戶佔比", before: "8%",     after: "13%",    delta: "↑ 63%" },
      { label: "平均回購週期",  before: "42 days", after: "29 days", delta: "↓ 31%" },
    ],
    sections: [
      { heading: "問題背景", label: "The Problem",      body: "請填入你的專案背景。" },
      { heading: "研究與洞察", label: "Research",       body: "請填入研究方法與發現。" },
      { heading: "設計決策", label: "Design Decisions", body: "請說明關鍵設計選擇。" },
      { heading: "結果與反思", label: "Outcome",        body: "請填入成果數據與反思。" },
    ],
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
