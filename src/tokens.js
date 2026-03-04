// ── 設計 Token ────────────────────────────────────────────────────────────────
// 所有顏色、字體都在這裡統一管理
// 修改這裡就能改變整站的視覺風格

const T = {
  // 背景色
  bg:          "#0E0C0A",
  bgCard:      "#121008",
  bgHover:     "#1A1714",

  // 邊框
  border:      "#2A2520",
  borderWarm:  "#3D3028",

  // 文字
  fg:          "#EDE8E0",   // 主要文字
  fgSub:       "#7A6F65",   // 次要文字
  fgMuted:     "#3D3530",   // 最淡的文字

  // 強調色（琥珀金）
  accent:      "#C8923A",
  accentRgb:   "200,146,58",
  accentSoft:  "#C8923A14",

  // 綠色
  green:       "#2DA567",
  greenRgb:    "45,165,103",

  // 字體
  serif:  "'Lora', Georgia, serif",
  sans:   "'DM Sans', system-ui, sans-serif",
  mono:   "'IBM Plex Mono', monospace",
};

export default T;
