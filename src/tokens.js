// ── 設計 Token ────────────────────────────────────────────────────────────────
// 所有顏色、字體都在這裡統一管理
// 修改這裡就能改變整站的視覺風格

const T = {
  // 背景色
  bg:          "#F5F4F2",
  bgCard:      "#EBEBEA",
  bgHover:     "#E3E2DF",

  // 邊框
  border:      "#D5D3CF",
  borderWarm:  "#C8C6C1",

  // 文字
  fg:          "#111111",   // 主要文字
  fgSub:       "#6B6760",   // 次要文字
  fgMuted:     "#ADADAB",   // 最淡的文字

  // 強調色（橘色）
  accent:      "#FF6200",
  accentRgb:   "255,98,0",
  accentSoft:  "#FF620014",

  // 綠色
  green:       "#1A9456",
  greenRgb:    "26,148,86",

  // 字體
  serif:  "'Lora', Georgia, serif",
  sans:   "'DM Sans', system-ui, sans-serif",
  mono:   "'IBM Plex Mono', monospace",
};

export default T;
