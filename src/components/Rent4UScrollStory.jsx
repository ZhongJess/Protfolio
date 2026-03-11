/**
 * Rent4U — 輔具租賃平台
 * ─────────────────────────────────────────────────────────────────────────────
 * TopNav (sticky, 4 anchors) + SectionSummary (Hero) + empty shells
 */

import { useState, useEffect, useRef } from "react";

// ── Design Tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:   "#003795",
  secondary: "#FFC11A",
  accent:    "#E53E3E",
  dark:      "#0E0E0E",
  dark2:     "#1A1A1A",
  light:     "#F7F5F2",
  white:     "#FFFFFF",
  gray:      "#888888",
  border:    "#E4E4E4",
};
const FONT = "'Noto Sans TC', system-ui, sans-serif";

// ── Nav Items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "summary",  label: "專案敘述" },
  { id: "research", label: "設計流程" },
  { id: "logic",    label: "Mock up"  },
  { id: "impact",   label: "成效"     },
];

// ── Hero Info Cards ───────────────────────────────────────────────────────────
const INFO_CARDS = [
  { tag: "成果",     title: "輔具租賃配對平台",    desc: "媒合使用者需求與適合輔具" },
  { tag: "團隊角色", title: "UX Designer · PM",   desc: "研究、設計到產品規劃" },
  { tag: "開發時程", title: "3 個月",              desc: "從研究到上線完整週期" },
];

// ── Anchor Scroll ─────────────────────────────────────────────────────────────
function scrollToSection(id) {
  const scrollEl = document.getElementById("main-scroll");
  const target   = document.getElementById(`r4u-${id}`);
  if (!scrollEl || !target) return;
  scrollEl.scrollTo({ top: target.offsetTop - 56, behavior: "smooth" });
}

// ─────────────────────────────────────────────────────────────────────────────
// TOP STICKY NAV
// ─────────────────────────────────────────────────────────────────────────────
function TopNav({ active }) {
  return (
    <nav
      style={{
        position:             "sticky",
        top:                  0,
        zIndex:               50,
        display:              "flex",
        alignItems:           "center",
        gap:                  2,
        padding:              "0 32px",
        height:               56,
        background:           "rgba(10,10,10,0.90)",
        backdropFilter:       "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom:         "1px solid rgba(255,255,255,0.06)",
        fontFamily:           FONT,
      }}
    >
      {/* 左側 logo / 返回標示 */}
      <span
        style={{
          fontSize:      12,
          color:         "rgba(255,255,255,0.28)",
          letterSpacing: "0.12em",
          marginRight:   "auto",
          fontWeight:    300,
          textTransform: "uppercase",
        }}
      >
        Rent4U
      </span>

      {/* 錨點按鈕 */}
      {NAV_ITEMS.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            style={{
              border:        isActive ? `1px solid ${C.secondary}` : "1px solid transparent",
              cursor:        "pointer",
              padding:       "5px 16px",
              borderRadius:  9999,
              fontSize:      13,
              fontWeight:    isActive ? 600 : 400,
              fontFamily:    FONT,
              color:         isActive ? C.secondary : "rgba(255,255,255,0.50)",
              background:    isActive ? "rgba(255,193,26,0.10)" : "transparent",
              transition:    "all 0.2s ease",
              whiteSpace:    "nowrap",
              letterSpacing: "0.03em",
            }}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION SUMMARY  ←── 完整 Hero
// ─────────────────────────────────────────────────────────────────────────────

/** TIME magazine 風格縮略圖 */
function TimeThumbnail() {
  return (
    <div
      style={{
        width:          52,
        minWidth:       52,
        height:         66,
        background:     C.accent,
        borderRadius:   4,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        position:       "relative",
      }}
    >
      {/* TIME logo */}
      <span
        style={{
          fontSize:      9,
          fontWeight:    900,
          color:         "#fff",
          letterSpacing: "0.15em",
          position:      "absolute",
          top:           6,
        }}
      >
        TIME
      </span>
      {/* 封面圖模擬 */}
      <div
        style={{
          width:          "80%",
          height:         "55%",
          background:     "rgba(255,255,255,0.15)",
          borderRadius:   2,
          marginTop:      14,
        }}
      />
    </div>
  );
}

/** 單張 Info Card — 縱排版 (縮略圖上 / 文字下) */
function InfoCard({ tag, title }) {
  return (
    <div
      style={{
        flex:          1,
        display:       "flex",
        flexDirection: "column",
        gap:           10,
        padding:       "14px 14px 16px",
        background:    "rgba(255,255,255,0.04)",
        border:        "1px solid rgba(255,255,255,0.09)",
        borderRadius:  10,
      }}
    >
      <TimeThumbnail />
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontSize:      10,
            color:         C.secondary,
            fontWeight:    600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
        <span
          style={{
            fontSize:   14,
            fontWeight: 700,
            color:      "#fff",
            lineHeight: 1.35,
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

/** iMac + Phone 裝置 Mockup 佔位 */
function DeviceMockup() {
  return (
    <div
      style={{
        position:       "relative",
        width:          "100%",
        height:         "100%",
        display:        "flex",
        alignItems:     "flex-end",
        justifyContent: "center",
        paddingBottom:  40,
      }}
    >
      {/* iMac 框 */}
      <div
        style={{
          width:        "78%",
          aspectRatio:  "16/11",
          background:   "rgba(255,255,255,0.04)",
          border:       "1.5px solid rgba(255,255,255,0.12)",
          borderRadius: 12,
          display:      "flex",
          flexDirection:"column",
          overflow:     "hidden",
          position:     "relative",
          boxShadow:    "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* 螢幕頂欄 */}
        <div
          style={{
            height:     22,
            background: "rgba(255,255,255,0.07)",
            display:    "flex",
            alignItems: "center",
            padding:    "0 10px",
            gap:        5,
          }}
        >
          {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
            <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
          ))}
        </div>
        {/* 螢幕內容 */}
        <div
          style={{
            flex:       1,
            background: "linear-gradient(135deg, rgba(0,55,149,0.25) 0%, rgba(14,14,14,0.9) 60%)",
            display:    "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>
            APP SCREENSHOT
          </span>
        </div>
        {/* iMac 底座 */}
        <div
          style={{
            height:    12,
            background:"rgba(255,255,255,0.05)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      </div>

      {/* Phone 框（右下角浮出） */}
      <div
        style={{
          position:     "absolute",
          right:        "8%",
          bottom:       20,
          width:        "18%",
          aspectRatio:  "9/19",
          background:   "rgba(255,255,255,0.05)",
          border:       "1.5px solid rgba(255,255,255,0.15)",
          borderRadius: 18,
          overflow:     "hidden",
          boxShadow:    "0 16px 48px rgba(0,0,0,0.6)",
          display:      "flex",
          flexDirection:"column",
          alignItems:   "center",
        }}
      >
        {/* 瀏海 */}
        <div
          style={{
            width:        "35%",
            height:       10,
            background:   "rgba(255,255,255,0.08)",
            borderRadius: "0 0 8px 8px",
            marginTop:    4,
          }}
        />
        {/* 螢幕內容 */}
        <div
          style={{
            flex:       1,
            width:      "100%",
            background: "linear-gradient(180deg, rgba(0,55,149,0.3) 0%, rgba(14,14,14,0.8) 100%)",
          }}
        />
      </div>
    </div>
  );
}

/** Hero Section 主體 */
function SectionSummary() {
  return (
    <section
      id="r4u-summary"
      style={{
        minHeight:   "100vh",
        background:  `linear-gradient(160deg, #141414 0%, #0E0E0E 50%, #0a0f1e 100%)`,
        fontFamily:  FONT,
        display:     "flex",
        flexDirection: "column",
        position:    "relative",
        overflow:    "hidden",
      }}
    >
      {/* 背景光暈 */}
      <div
        style={{
          position:   "absolute",
          top:        "-10%",
          left:       "-5%",
          width:      "50%",
          height:     "50%",
          background: "radial-gradient(circle, rgba(0,55,149,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* ── 頂部工具列：前往網站 ── */}
      <div
        style={{
          display:        "flex",
          justifyContent: "flex-end",
          alignItems:     "center",
          padding:        "20px 40px 0",
        }}
      >
        <a
          href="#"
          style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           6,
            padding:       "7px 18px",
            borderRadius:  9999,
            border:        "1px solid rgba(255,255,255,0.25)",
            color:         "rgba(255,255,255,0.8)",
            fontSize:      13,
            fontFamily:    FONT,
            textDecoration:"none",
            letterSpacing: "0.03em",
            transition:    "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
          }}
        >
          前往網站
          <span style={{ fontSize: 11, opacity: 0.6 }}>↗</span>
        </a>
      </div>

      {/* ── 主要內容：兩欄 ── */}
      <div
        style={{
          flex:        1,
          display:     "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:         0,
          padding:     "32px 40px 24px",
          alignItems:  "center",
        }}
      >
        {/* ── 左欄：文字區 ── */}
        <div
          style={{
            display:       "flex",
            flexDirection: "column",
            gap:           28,
            paddingRight:  40,
          }}
        >
          {/* Tags 列 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["DESIGNER", "PROJECT MANAGER", "2025"].map(tag => (
              <span
                key={tag}
                style={{
                  border:        "1px solid rgba(255,255,255,0.35)",
                  borderRadius:  9999,
                  padding:       "4px 14px",
                  fontSize:      11,
                  fontWeight:    500,
                  color:         "rgba(255,255,255,0.65)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 主標題 */}
          <div>
            <h1
              style={{
                fontSize:      "clamp(36px, 4.2vw, 62px)",
                fontWeight:    900,
                color:         "#fff",
                lineHeight:    1.15,
                letterSpacing: "-0.01em",
                margin:        0,
              }}
            >
              精準適配
              <br />
              輔具租賃系統
            </h1>
            <p
              style={{
                marginTop:  14,
                fontSize:   14,
                color:      "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth:   400,
              }}
            >
              Rent4U 透過精準需求分析，幫助使用者找到最適合的輔具資源，
              提升租賃效率與整體使用體驗。
            </p>
          </div>

          {/* Info Cards */}
          <div style={{ display: "flex", gap: 10 }}>
            {INFO_CARDS.map(card => (
              <InfoCard key={card.tag} {...card} />
            ))}
          </div>
        </div>

        {/* ── 右欄：裝置 Mockup ── */}
        <div style={{ height: "clamp(280px, 40vh, 480px)" }}>
          <DeviceMockup />
        </div>
      </div>

      {/* ── 底部錨點 Tab（Figma 設計中的視覺 tab bar）── */}
      <div
        style={{
          display:        "flex",
          gap:            0,
          borderTop:      "1px solid rgba(255,255,255,0.08)",
          margin:         "0 40px",
          paddingBottom:  8,
        }}
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            style={{
              border:        "none",
              borderTop:     id === "summary" ? `2px solid ${C.secondary}` : "2px solid transparent",
              background:    "transparent",
              padding:       "14px 20px",
              fontSize:      13,
              fontFamily:    FONT,
              fontWeight:    id === "summary" ? 600 : 400,
              color:         id === "summary" ? C.secondary : "rgba(255,255,255,0.45)",
              cursor:        "pointer",
              letterSpacing: "0.03em",
              transition:    "all 0.2s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY SECTION SHELLS (待實作)
// ─────────────────────────────────────────────────────────────────────────────
function SectionShell({ id, bg, color = C.gray, label }) {
  return (
    <section
      id={`r4u-${id}`}
      style={{
        minHeight:      "100vh",
        background:     bg,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     FONT,
      }}
    >
      <span
        style={{
          fontSize:      13,
          color,
          opacity:       0.35,
          border:        `1px dashed ${color}`,
          borderRadius:  8,
          padding:       "8px 20px",
          letterSpacing: "0.05em",
        }}
      >
        [ {label} ]
      </span>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION RESEARCH  (設計流程)
// 子區塊 A — 問題陳述 "你真的選對輔具了嗎？"
// 子區塊 B — ResearchGrid 2×2 研究卡片 + hover 動效
// 配色遵循 6-3-1：60% 白底 / 30% 深色文字+暖灰邊框 / 10% 主色藍+紅強調
// ─────────────────────────────────────────────────────────────────────────────

// ── 對話氣泡 ──────────────────────────────────────────────────────────────────
function SpeechBubble({ text, align = "left", author }) {
  const isRight = align === "right";
  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        alignItems:    isRight ? "flex-end" : "flex-start",
        gap:           6,
      }}
    >
      <div
        style={{
          position:     "relative",
          background:   isRight ? "#F0EBE1" : "#FFFFFF",
          border:       `1px solid ${isRight ? "#DDD5C5" : "#E8E8E8"}`,
          borderRadius: isRight ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
          padding:      "14px 18px",
          maxWidth:     280,
          boxShadow:    "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <p
          style={{
            fontSize:   14,
            color:      "#333",
            lineHeight: 1.65,
            margin:     0,
            fontFamily: FONT,
          }}
        >
          {text}
        </p>
      </div>
      {author && (
        <span style={{ fontSize: 11, color: "#AAA", fontFamily: FONT }}>
          — {author}
        </span>
      )}
    </div>
  );
}

// ── 紅色高亮文字片段 ───────────────────────────────────────────────────────────
function Highlight({ children }) {
  return (
    <span style={{ color: C.accent, fontWeight: 700 }}>{children}</span>
  );
}

// ── ResearchGrid 單卡片 ────────────────────────────────────────────────────────
const RESEARCH_CARDS = [
  {
    id:      "market",
    number:  "01",
    title:   "市場研究",
    en:      "Market Research",
    body:    "台灣每年約有 150 萬輔具使用需求，但現行租賃平台缺乏精準推薦機制——超過 60% 用戶租到不適合自身狀況的輔具，造成資源浪費與使用風險。",
    accent:  "#003795",
    bg:      "#EEF2FA",
  },
  {
    id:      "interview",
    number:  "02",
    title:   "利害關係人訪談",
    en:      "Stakeholder Interviews",
    body:    "深度訪談 12 位使用者、4 家租賃商、3 位職能治療師，發現「需求資訊不對稱」是核心痛點：用戶不知道自己需要什麼，商家也無法主動推薦適合的品項。",
    accent:  "#7B5EA7",
    bg:      "#F3EEFC",
  },
  {
    id:      "insight",
    number:  "03",
    title:   "研究結論",
    en:      "Key Insights",
    body:    "用戶需要的是「診斷式推薦」而非「商品目錄」——系統必須理解功能性需求，將醫療情境轉譯為可篩選的租賃條件，而不只是列出規格比較。",
    accent:  "#C04E2B",
    bg:      "#FBF0EC",
  },
  {
    id:      "channel",
    number:  "04",
    title:   "全渠道觸達",
    en:      "Omnichannel Reach",
    body:    "線下診所轉介、搜尋引擎、社群口碑是三大主要入口。任一渠道的資訊斷鏈都會導致潛在用戶流失——設計需確保每個入口都能無縫銜接租賃流程。",
    accent:  "#1A7F5A",
    bg:      "#EDFAF3",
  },
];

function ResearchCard({ number, title, en, body, accent, bg }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    hovered ? "#FFFFFF" : bg,
        border:        `1px solid ${hovered ? accent : "transparent"}`,
        borderRadius:  14,
        padding:       "28px 26px",
        display:       "flex",
        flexDirection: "column",
        gap:           14,
        cursor:        "default",
        transform:     hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow:     hovered
          ? `0 16px 40px rgba(0,0,0,0.10), 0 4px 12px ${accent}22`
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition:    "all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* 序號 + EN 標籤 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize:      13,
            fontWeight:    700,
            color:         accent,
            fontFamily:    "'IBM Plex Mono', monospace",
            letterSpacing: "0.05em",
          }}
        >
          {number}
        </span>
        <span
          style={{
            fontSize:      10,
            color:         accent,
            background:    `${accent}14`,
            border:        `1px solid ${accent}30`,
            borderRadius:  9999,
            padding:       "3px 10px",
            letterSpacing: "0.06em",
            fontWeight:    500,
          }}
        >
          {en}
        </span>
      </div>

      {/* 標題 */}
      <h3
        style={{
          fontSize:   20,
          fontWeight: 800,
          color:      "#111",
          margin:     0,
          lineHeight: 1.2,
          fontFamily: FONT,
        }}
      >
        {title}
      </h3>

      {/* 分隔線 */}
      <div
        style={{
          height:     2,
          width:      hovered ? "100%" : "32px",
          background: accent,
          borderRadius: 2,
          transition: "width 0.3s ease",
        }}
      />

      {/* 內文 */}
      <p
        style={{
          fontSize:   14,
          color:      "#555",
          lineHeight: 1.75,
          margin:     0,
          fontFamily: FONT,
        }}
      >
        {body}
      </p>
    </div>
  );
}

// ── SectionResearch 主體 ───────────────────────────────────────────────────────
function SectionResearch() {
  return (
    <section
      id="r4u-research"
      style={{ background: C.white, fontFamily: FONT }}
    >
      {/* ── 子區塊 A：問題陳述 ── */}
      <div
        style={{
          maxWidth:  1100,
          margin:    "0 auto",
          padding:   "96px 40px 80px",
          display:   "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:       60,
          alignItems:"center",
        }}
      >
        {/* 左：文字 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              fontSize:      11,
              fontWeight:    600,
              color:         C.primary,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Problem Statement
          </span>
          <h2
            style={{
              fontSize:   "clamp(28px, 3vw, 42px)",
              fontWeight: 900,
              color:      "#111",
              lineHeight: 1.2,
              margin:     0,
            }}
          >
            你真的選對<br />
            <Highlight>輔具</Highlight>了嗎？
          </h2>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, margin: 0, maxWidth: 420 }}>
            台灣超過百萬輔具使用者，卻有<Highlight>超過六成</Highlight>的人
            在租賃時缺乏專業引導——他們往往靠<Highlight>猜測</Highlight>與
            <Highlight>口耳相傳</Highlight>選擇輔具，導致不適配、
            使用風險與資源浪費。
          </p>
          <p style={{ fontSize: 15, color: "#555", lineHeight: 1.8, margin: 0, maxWidth: 420 }}>
            Rent4U 的核心使命，是將<Highlight>醫療專業知識</Highlight>轉譯
            為普通使用者能理解並操作的<Highlight>智慧推薦系統</Highlight>。
          </p>
        </div>

        {/* 右：對話氣泡 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, paddingLeft: 20 }}>
          <SpeechBubble
            text="我媽要出院了，醫生說需要輔助行走，但我完全不知道該租什麼……"
            align="left"
            author="照顧者 · 50 歲"
          />
          <SpeechBubble
            text="上次租的輪椅座寬不對，坐了兩個星期才發現不合適，又要換一次。"
            align="right"
            author="使用者 · 68 歲"
          />
        </div>
      </div>

      {/* ── 分隔線 ── */}
      <div
        style={{
          height:     1,
          background: "linear-gradient(90deg, transparent, #E8E2DA 20%, #E8E2DA 80%, transparent)",
          margin:     "0 40px",
        }}
      />

      {/* ── 子區塊 B：ResearchGrid 2×2 ── */}
      <div
        style={{
          maxWidth: 1100,
          margin:   "0 auto",
          padding:  "72px 40px 96px",
        }}
      >
        {/* 標題列 */}
        <div style={{ marginBottom: 48 }}>
          <span
            style={{
              fontSize:      11,
              fontWeight:    600,
              color:         C.primary,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display:       "block",
              marginBottom:  10,
            }}
          >
            Design Research
          </span>
          <h2
            style={{
              fontSize:   "clamp(24px, 2.6vw, 36px)",
              fontWeight: 900,
              color:      "#111",
              margin:     0,
              lineHeight: 1.25,
            }}
          >
            為什麼選擇這個<Highlight>設計方向</Highlight>
            <br />跟<Highlight>研究方式</Highlight>？
          </h2>
        </div>

        {/* 2×2 Grid */}
        <div
          style={{
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 20,
          }}
        >
          {RESEARCH_CARDS.map(card => (
            <ResearchCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// SECTION LOGIC  (Mock up · 設計思路)
// 結構：標題 → 引言 → 兩段文字（帶紅色高亮）→ 全寬截圖
// ─────────────────────────────────────────────────────────────────────────────

/** 全寬截圖 Mockup（phone + admin 後台） */
function FullWidthMockup() {
  return (
    <div
      style={{
        width:      "100%",
        borderRadius: 16,
        overflow:   "hidden",
        background: "#D946B0",          /* 與截圖相同的洋紅桌布色 */
        position:   "relative",
        aspectRatio: "16/9",
        display:    "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap:        24,
        padding:    "40px 60px 0",
        boxShadow:  "0 24px 64px rgba(0,0,0,0.15)",
      }}
    >
      {/* 桌布紋路 (格點) */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      {/* 手機 */}
      <div
        style={{
          width:        "22%",
          aspectRatio:  "9/19",
          background:   "#FFFFFF",
          borderRadius: "28px 28px 0 0",
          border:       "1.5px solid rgba(0,0,0,0.12)",
          overflow:     "hidden",
          position:     "relative",
          zIndex:       2,
          display:      "flex",
          flexDirection:"column",
          boxShadow:    "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {/* 狀態欄 */}
        <div
          style={{
            height:       32,
            background:   "#F8F8F8",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "space-between",
            padding:      "0 14px",
            fontSize:     10,
            color:        "#333",
            borderBottom: "1px solid #eee",
          }}
        >
          <span>12:16</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["📶","🔋"].map((i, k) => <span key={k}>{i}</span>)}
          </div>
        </div>
        {/* 問卷內容模擬 */}
        <div
          style={{
            flex:       1,
            padding:    "12px 10px",
            display:    "flex",
            flexDirection: "column",
            gap:        6,
          }}
        >
          <div style={{ fontSize: 9, color: "#333", lineHeight: 1.4, fontFamily: FONT }}>
            請選擇最符合目前行動能力的描述
          </div>
          {["具平地跑跳能力","在平地無法跑跳，但可快步行走","行走需扶持穩定物","無法行走，但能在無障礙支撐下維持坐姿"].map((opt, i) => (
            <div
              key={i}
              style={{
                border:       `1px solid ${i === 0 ? C.primary : "#DDD"}`,
                borderRadius: 6,
                padding:      "5px 8px",
                fontSize:     9,
                color:        i === 0 ? "#fff" : "#555",
                background:   i === 0 ? C.primary : "transparent",
                fontFamily:   FONT,
                textAlign:    "center",
              }}
            >
              {opt}
            </div>
          ))}
          {/* 小人圖示 */}
          <div
            style={{
              flex:           1,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              opacity:        0.3,
              fontSize:       28,
            }}
          >
            🧍
          </div>
          {/* 底部網址欄 */}
          <div
            style={{
              height:       20,
              background:   "#F2F2F2",
              borderRadius: 4,
              display:      "flex",
              alignItems:   "center",
              padding:      "0 6px",
              fontSize:     8,
              color:        "#888",
            }}
          >
            assist-hub.vercel.app
          </div>
        </div>
      </div>

      {/* 桌面後台管理截圖 */}
      <div
        style={{
          width:        "62%",
          aspectRatio:  "16/10",
          background:   "#FFFFFF",
          borderRadius: "10px 10px 0 0",
          border:       "1.5px solid rgba(0,0,0,0.10)",
          overflow:     "hidden",
          zIndex:       1,
          display:      "flex",
          flexDirection:"column",
          boxShadow:    "0 8px 32px rgba(0,0,0,0.20)",
        }}
      >
        {/* 瀏覽器頂欄 */}
        <div
          style={{
            height:       28,
            background:   "#F0F0F0",
            display:      "flex",
            alignItems:   "center",
            gap:          6,
            padding:      "0 10px",
            borderBottom: "1px solid #DDD",
          }}
        >
          {["#FF5F57","#FFBD2E","#28C840"].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
          <div
            style={{
              flex:         1,
              height:       16,
              background:   "#E0E0E0",
              borderRadius: 4,
              margin:       "0 8px",
              display:      "flex",
              alignItems:   "center",
              paddingLeft:  8,
              fontSize:     9,
              color:        "#666",
            }}
          >
            assist-hub.vercel.app/admin/suggests
          </div>
        </div>
        {/* 表格內容 */}
        <div style={{ flex: 1, overflow: "hidden", padding: "10px 12px" }}>
          {/* 頁籤 */}
          <div style={{ display: "flex", gap: 16, marginBottom: 8, fontSize: 9, color: "#555", fontFamily: FONT }}>
            <span style={{ color: C.accent, fontWeight: 700 }}>全部 134</span>
            <span>未回覆 101</span>
            <span style={{ color: "#1A7F5A" }}>✓ 已回覆 33</span>
          </div>
          {/* 表格 header */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "80px 60px 60px 100px 140px 70px",
              gap:                 4,
              padding:             "4px 0",
              borderBottom:        "1px solid #EEE",
              fontSize:            8,
              color:               "#999",
              fontFamily:          FONT,
            }}
          >
            {["詢問單狀態","詢問單","建議單","名稱","信箱","收件日期"].map(h => (
              <span key={h}>{h}</span>
            ))}
          </div>
          {/* 表格 rows */}
          {[
            ["尚未回覆","AA153","前往回覆","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["尚未回覆","AA152","前往回覆","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["已回覆","AA151","AA151S","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["已回覆","AA150","AA150S","鍾思瑩Jess","k435667@yahoo.com.tw","2026-03-10"],
            ["尚未回覆","AA148","前往回覆","江品學","frank79530@gmail.com","2026-01-06"],
          ].map((row, ri) => (
            <div
              key={ri}
              style={{
                display:             "grid",
                gridTemplateColumns: "80px 60px 60px 100px 140px 70px",
                gap:                 4,
                padding:             "4px 0",
                borderBottom:        "1px solid #F5F5F5",
                fontSize:            8,
                color:               "#444",
                fontFamily:          FONT,
              }}
            >
              {row.map((cell, ci) => (
                <span
                  key={ci}
                  style={{
                    color: cell === "前往回覆" ? C.accent : cell === "已回覆" ? "#1A7F5A" : "inherit",
                    fontWeight: (cell === "前往回覆" || cell === "已回覆") ? 600 : 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LOGIC  (Mock up · 功能展示)
// 3 個功能區塊，每塊左右交替 + 視差滾動
// ─────────────────────────────────────────────────────────────────────────────

/** 視差 hook — 在 #main-scroll 捲動時，以 speed 倍數位移 */
function useParallax(speed = 0.18) {
  const ref = useRef(null);
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;
    const update = () => {
      if (!ref.current) return;
      const elTop    = ref.current.getBoundingClientRect().top;
      const rootTop  = scrollEl.getBoundingClientRect().top;
      const relY     = elTop - rootTop - scrollEl.clientHeight / 2;
      ref.current.style.transform = `translateY(${relY * speed}px)`;
    };
    scrollEl.addEventListener("scroll", update, { passive: true });
    update();
    return () => scrollEl.removeEventListener("scroll", update);
  }, [speed]);
  return ref;
}

// ── 手機 Mockup — 詢問單問卷 ─────────────────────────────────────────────────
function PhoneInquiry({ parallaxRef }) {
  return (
    <div
      ref={parallaxRef}
      style={{
        width:        280,
        aspectRatio:  "9/19",
        background:   "#FFFFFF",
        borderRadius: 32,
        border:       "2px solid rgba(0,0,0,0.10)",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        boxShadow:    "0 24px 64px rgba(0,0,0,0.18)",
        flexShrink:   0,
      }}
    >
      {/* 狀態欄 */}
      <div style={{ height:28, background:"#F8F8F8", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 16px", fontSize:10, color:"#333", borderBottom:"1px solid #EEE" }}>
        <span style={{ fontWeight:600 }}>12:16</span>
        <span>📶 🔋</span>
      </div>
      {/* 問卷 */}
      <div style={{ flex:1, padding:"14px 12px", display:"flex", flexDirection:"column", gap:8, overflow:"hidden" }}>
        <p style={{ fontSize:10, color:"#333", lineHeight:1.5, margin:0, fontFamily:FONT }}>請選擇最符合目前行動能力的描述（單選）：</p>
        {[
          { label:"具平地跑跳能力", active: true },
          { label:"在平地無法跑跳，但可快步行走", active: false },
          { label:"行走需扶持穩定物", active: false },
          { label:"無法行走，但能在無障礙支撐下維持坐姿", active: false },
          { label:"無鎮暴支撐下難以維持坐姿", active: false },
          { label:"無法自行評估", active: false },
        ].map(({ label, active }, i) => (
          <div key={i} style={{ border:`1px solid ${active ? C.primary : "#DDD"}`, borderRadius:6, padding:"6px 8px", fontSize:9, color: active ? "#fff" : "#555", background: active ? C.primary : "transparent", fontFamily:FONT, textAlign:"center" }}>
            {label}
          </div>
        ))}
        {/* 小人插圖 */}
        <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:8, paddingTop:4 }}>
          <p style={{ fontSize:8, color:"#AAA", lineHeight:1.4, margin:0, fontFamily:FONT, maxWidth:100, textAlign:"right" }}>可在平地自由行走，跑步及跳躍，運動能力沒有受人</p>
          <span style={{ fontSize:32 }}>🧍</span>
        </div>
        {/* 底欄 */}
        <div style={{ height:18, background:"#F2F2F2", borderRadius:4, display:"flex", alignItems:"center", padding:"0 8px", fontSize:8, color:"#888", fontFamily:FONT }}>
          assist-hub.vercel.app
        </div>
      </div>
    </div>
  );
}

// ── 桌面 Mockup — 建議單 ──────────────────────────────────────────────────────
function DesktopSuggestion({ parallaxRef }) {
  return (
    <div
      ref={parallaxRef}
      style={{
        width:        520,
        background:   "#FFFFFF",
        borderRadius: 12,
        border:       "1.5px solid rgba(0,0,0,0.10)",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        boxShadow:    "0 24px 64px rgba(0,0,0,0.14)",
        flexShrink:   0,
      }}
    >
      {/* 瀏覽器欄 */}
      <div style={{ height:28, background:"#F0F0F0", display:"flex", alignItems:"center", gap:6, padding:"0 10px", borderBottom:"1px solid #DDD" }}>
        {["#FF5F57","#FFBD2E","#28C840"].map((c,i)=>(
          <div key={i} style={{ width:8, height:8, borderRadius:"50%", background:c }} />
        ))}
        <div style={{ flex:1, height:16, background:"#E0E0E0", borderRadius:4, margin:"0 8px", display:"flex", alignItems:"center", paddingLeft:8, fontSize:9, color:"#666" }}>
          assist-hub.vercel.app/suggest/AA425
        </div>
      </div>
      {/* 建議單內容 */}
      <div style={{ padding:"14px 16px" }}>
        {/* 標題 */}
        <h4 style={{ fontSize:13, fontWeight:700, color:"#111", textAlign:"center", margin:"0 0 10px", fontFamily:FONT }}>建議單</h4>
        {/* 詢問單資訊 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:4, background:"#F8F8F8", borderRadius:6, padding:"6px 8px", marginBottom:10, fontSize:8, color:"#666", fontFamily:FONT }}>
          {["單號 AA425","建立日 2025-02-07","功能限制：行走需扶持穩定物","行動能力評估：行走需扶持穩定物"].map((t,i)=><span key={i}>{t}</span>)}
        </div>
        {/* 店家推薦輔具 */}
        <p style={{ fontSize:9, fontWeight:700, color:"#111", margin:"0 0 6px", fontFamily:FONT }}>店家推薦輔具</p>
        {[
          { icon:"🦯", name:"【好舒】穩健手肘拐", price:"$380", tag:"推薦原因：行走能力下降但仍可自行站立，肘拐可提供穩定支撐..." },
          { icon:"♿", name:"【輝葉】輕型折疊輪椅", price:"$520", tag:"推薦原因：若病情加重，輪椅可作為備用方案，寬度 100cm 以內適用..." },
        ].map((item, i) => (
          <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", padding:"6px", border:"1px solid #EEE", borderRadius:6, marginBottom:6 }}>
            <div style={{ width:36, height:36, background:"#F5F5F5", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{item.icon}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:9, fontWeight:700, color:"#111", fontFamily:FONT }}>{item.name}</span>
                <span style={{ fontSize:9, color:C.accent, fontWeight:700, fontFamily:FONT }}>{item.price}</span>
              </div>
              <p style={{ fontSize:8, color:"#777", lineHeight:1.4, margin:"2px 0 0", fontFamily:FONT }}>{item.tag}</p>
              <button style={{ marginTop:4, padding:"2px 8px", background:C.primary, color:"#fff", border:"none", borderRadius:4, fontSize:8, fontFamily:FONT, cursor:"default" }}>加入購車</button>
            </div>
          </div>
        ))}
        {/* 分享 */}
        <div style={{ display:"flex", justifyContent:"center", marginTop:6 }}>
          <div style={{ padding:"4px 16px", border:`1px solid ${C.primary}`, borderRadius:9999, fontSize:8, color:C.primary, fontFamily:FONT }}>分享建議單</div>
        </div>
      </div>
    </div>
  );
}

// ── 手機 Mockup — LINE 聊天 ──────────────────────────────────────────────────
function PhoneLine({ parallaxRef }) {
  return (
    <div
      ref={parallaxRef}
      style={{
        width:        260,
        aspectRatio:  "9/18",
        background:   "#EFEFF4",
        borderRadius: 28,
        border:       "2px solid rgba(0,0,0,0.10)",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        boxShadow:    "0 24px 64px rgba(0,0,0,0.18)",
        flexShrink:   0,
      }}
    >
      {/* LINE header */}
      <div style={{ height:32, background:"#06C755", display:"flex", alignItems:"center", padding:"0 12px", gap:8 }}>
        <span style={{ fontSize:10, fontWeight:700, color:"#fff", fontFamily:FONT }}>99+</span>
        <span style={{ fontSize:10, color:"#fff", fontFamily:FONT, flex:1, textAlign:"center" }}>RENT4U 輔具租賃 💬</span>
      </div>
      {/* 對話訊息 */}
      <div style={{ flex:1, padding:"10px 10px", display:"flex", flexDirection:"column", gap:8, overflow:"hidden" }}>
        {[
          { side:"left", text:"您好！您的詢問單 AA135 已回覆，建議單號為 AA135S，分享連結：\nhttps://assist-hub.vercel.app/suggest/AA135S", time:"15:07" },
          { side:"left", text:"您好！您的訂單編號為 202502050002，訂單狀態已更新：\n運送狀態：運送中\n更多細節請查閱「我的訂單」查看", time:"13:19" },
        ].map((msg, i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:msg.side==="left"?"flex-start":"flex-end", gap:2 }}>
            <div style={{ background: msg.side==="left" ? "#fff" : "#06C755", borderRadius: msg.side==="left" ? "4px 12px 12px 12px" : "12px 4px 12px 12px", padding:"6px 8px", maxWidth:"80%", fontSize:8, color: msg.side==="left" ? "#333" : "#fff", lineHeight:1.5, fontFamily:FONT, whiteSpace:"pre-line" }}>
              {msg.text}
            </div>
            <span style={{ fontSize:7, color:"#AAA" }}>{msg.time}</span>
          </div>
        ))}
      </div>
      {/* 底部 app bar */}
      <div style={{ height:40, background:"#fff", borderTop:"1px solid #EEE", display:"flex", alignItems:"center", justifyContent:"space-around", padding:"0 8px" }}>
        {["📦 我的訂單","💬 詢問","🏠 首頁"].map((t,i)=>(
          <span key={i} style={{ fontSize:8, color:i===2?C.primary:"#888", fontFamily:FONT }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ── 功能 Row 資料 ────────────────────────────────────────────────────────────
const FEATURE_ROWS = [
  {
    id:      "inquiry",
    side:    "right",              // mockup 在右
    label:   "Feature 01",
    title:   "詢問單功能設計",
    body:    "詢問單設計基於粗大動作評估系統的分級標準，涵蓋五種失能級別，確保使用者能夠按照自身的失能狀態進行輔具諮詢。此機制有助於店家更準確地理解使用者需求，避免資訊不對稱或無法確定使用者目前的失能級別，進而提供最合適的輔具建議。",
    checks:  null,
    MockupComponent: PhoneInquiry,
    bg:      "#FAFAFA",
  },
  {
    id:      "suggestion",
    side:    "left",               // mockup 在左
    label:   "Feature 02",
    title:   "建議單功能設計",
    body:    "為了讓使用者明確了解適合的輔具，建議單會根據使用者提供的失能級別與需求，由專業店家提供適配建議。",
    checks:  [
      "依據失能標準：確保輔具推薦符合使用者實際需求",
      "專業店家建議：根據使用者的身體狀況與未來可能的需求，提供客製化輔具建議",
      "個別輔具建議：詳細說明推薦輔具的適用情境，幫助使用者做出最佳選擇",
    ],
    MockupComponent: DesktopSuggestion,
    bg:      "#F4F2EF",
  },
  {
    id:      "line",
    side:    "right",
    label:   "Feature 03",
    title:   "Line 功能",
    body:    "讓年長使用者快速上手，提升互動與使用便利性。",
    checks:  ["LineLogin", "LinePay", "LineMessaging"],
    MockupComponent: PhoneLine,
    bg:      "#F0FAF4",
  },
];

// ── 功能 Row ──────────────────────────────────────────────────────────────────
function FeatureRow({ label, title, body, checks, MockupComponent, bg, side }) {
  const parallaxRef = useParallax(0.14);
  const isRight = side === "right";

  const TextBlock = (
    <div
      style={{
        flex:          1,
        display:       "flex",
        flexDirection: "column",
        gap:           18,
        justifyContent:"center",
        padding:       isRight ? "0 40px 0 0" : "0 0 0 40px",
      }}
    >
      <span style={{ fontSize:11, fontWeight:600, color:C.primary, letterSpacing:"0.12em", textTransform:"uppercase" }}>
        {label}
      </span>
      <h3 style={{ fontSize:"clamp(22px,2.4vw,32px)", fontWeight:800, color:"#111", margin:0, lineHeight:1.25, fontFamily:FONT }}>
        {title}
      </h3>
      <p style={{ fontSize:14, color:"#555", lineHeight:1.85, margin:0, fontFamily:FONT }}>
        {body}
      </p>
      {checks && (
        <ul style={{ listStyle:"none", padding:0, margin:0, display:"flex", flexDirection:"column", gap:8 }}>
          {checks.map((c, i) => (
            <li key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", fontSize:13, color:"#444", fontFamily:FONT, lineHeight:1.5 }}>
              <span style={{ color:C.primary, fontWeight:700, flexShrink:0 }}>✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const MockupBlock = (
    <div
      style={{
        flex:           1,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        overflow:       "hidden",
        padding:        "40px 0",
      }}
    >
      <MockupComponent parallaxRef={parallaxRef} />
    </div>
  );

  return (
    <div
      style={{
        background: bg,
        padding:    "80px 60px",
        display:    "flex",
        gap:        40,
        alignItems: "center",
        minHeight:  520,
      }}
    >
      {isRight ? <>{TextBlock}{MockupBlock}</> : <>{MockupBlock}{TextBlock}</>}
    </div>
  );
}

function SectionLogic() {
  return (
    <section id="r4u-logic" style={{ fontFamily: FONT }}>
      {/* 節頭 */}
      <div
        style={{
          background:  C.white,
          padding:     "80px 60px 48px",
          borderBottom:"1px solid #E8E8E8",
        }}
      >
        <span style={{ fontSize:11, fontWeight:600, color:C.primary, letterSpacing:"0.14em", textTransform:"uppercase", display:"block", marginBottom:12 }}>
          Mock up
        </span>
        <h2 style={{ fontSize:"clamp(28px,3vw,44px)", fontWeight:900, color:"#111", margin:"0 0 16px", lineHeight:1.2 }}>
          核心功能展示
        </h2>
        <blockquote style={{ margin:0, padding:"0 0 0 18px", borderLeft:"3px solid #DDD" }}>
          <p style={{ fontSize:15, color:"#555", lineHeight:1.8, margin:0, fontFamily:FONT }}>
            「在自動化與專業安全性之間，我們找到了最佳平衡。」
          </p>
        </blockquote>
      </div>

      {/* 功能區塊 (視差) */}
      {FEATURE_ROWS.map(row => (
        <FeatureRow key={row.id} {...row} />
      ))}
    </section>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// SECTION IMPACT  (成效 · KPI)
// 暗色底 · count-up 動畫 · 4 個核心指標 · 收尾反思
// ─────────────────────────────────────────────────────────────────────────────

const KPI_DATA = [
  { value: 134, suffix: "+", label: "累計詢問單",   sub: "上線 3 個月內",     color: C.secondary },
  { value:  33, suffix: "",  label: "已回覆建議單", sub: "店家回覆率 25%",    color: "#7ECFB3"   },
  { value:   3, suffix: "",  label: "個月 0→上線",  sub: "研究・設計・開發",  color: "#A78BFA"   },
  { value:  12, suffix: "+", label: "位訪談對象",   sub: "使用者 ＋ 店家 ＋ 治療師", color: "#F9A8D4" },
];

/** count-up 動畫 hook */
function useCountUp(target, duration = 1600, triggered = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);   // ease-out cubic
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [triggered, target, duration]);
  return val;
}

/** 單張 KPI Card */
function KpiCard({ value, suffix, label, sub, color, triggered }) {
  const count = useCountUp(value, 1600, triggered);
  return (
    <div
      style={{
        flex:          1,
        display:       "flex",
        flexDirection: "column",
        gap:           10,
        padding:       "32px 24px",
        background:    "rgba(255,255,255,0.04)",
        border:        `1px solid rgba(255,255,255,0.07)`,
        borderRadius:  16,
        position:      "relative",
        overflow:      "hidden",
      }}
    >
      {/* 背景光暈 */}
      <div style={{ position:"absolute", top:-30, left:-20, width:100, height:100, borderRadius:"50%", background:`${color}18`, filter:"blur(30px)", pointerEvents:"none" }} />

      {/* 數字 */}
      <div
        style={{
          fontSize:      "clamp(42px, 5vw, 64px)",
          fontWeight:    900,
          color,
          lineHeight:    1,
          fontFamily:    "'IBM Plex Mono', monospace",
          letterSpacing: "-0.02em",
        }}
      >
        {count}{suffix}
      </div>

      {/* 標籤 */}
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        <span style={{ fontSize:15, fontWeight:700, color:"#fff", fontFamily:FONT }}>
          {label}
        </span>
        <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontFamily:FONT }}>
          {sub}
        </span>
      </div>

      {/* 底部色條 */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  );
}

function SectionImpact() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef(null);

  // 進入視口時觸發 count-up
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl || !sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { root: scrollEl, threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="r4u-impact"
      ref={sectionRef}
      style={{
        background: `linear-gradient(160deg, #0a0f1e 0%, #0E0E0E 60%, #141414 100%)`,
        fontFamily: FONT,
        padding:    "96px 60px 80px",
        position:   "relative",
        overflow:   "hidden",
      }}
    >
      {/* 背景光暈 */}
      <div style={{ position:"absolute", bottom:"10%", right:"5%", width:"35%", height:"35%", background:"radial-gradient(circle, rgba(0,55,149,0.15) 0%, transparent 70%)", pointerEvents:"none" }} />

      {/* 節頭 */}
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <span style={{ fontSize:11, fontWeight:600, color:C.secondary, letterSpacing:"0.14em", textTransform:"uppercase", display:"block", marginBottom:14 }}>
          Impact
        </span>
        <h2 style={{ fontSize:"clamp(28px,3.5vw,52px)", fontWeight:900, color:"#fff", margin:"0 0 12px", lineHeight:1.15 }}>
          數字背後的設計價值
        </h2>
        <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", lineHeight:1.7, margin:"0 0 64px", maxWidth:560 }}>
          從 0 開始構建的服務，在 3 個月內完成從研究到上線的完整週期，
          驗證了「診斷式推薦」模型的可行性。
        </p>

        {/* KPI 卡片 */}
        <div style={{ display:"flex", gap:16, marginBottom:72 }}>
          {KPI_DATA.map(kpi => (
            <KpiCard key={kpi.label} {...kpi} triggered={triggered} />
          ))}
        </div>

        {/* 分隔線 */}
        <div style={{ height:1, background:"rgba(255,255,255,0.08)", margin:"0 0 56px" }} />

        {/* 反思段落 */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:60 }}>
          <div>
            <h3 style={{ fontSize:18, fontWeight:700, color:"#fff", margin:"0 0 14px", fontFamily:FONT }}>
              學到最多的事
            </h3>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.85, margin:0 }}>
              設計輔具租賃平台，讓我深刻理解「專業知識的轉譯」是 UX 設計中最複雜的挑戰之一。
              如何讓不懂醫療的使用者，在不做出錯誤決策的前提下完成自助諮詢，需要同時兼顧
              <span style={{ color:"#fff", fontWeight:600 }}>資訊架構、信任建立與風險管控</span>。
            </p>
          </div>
          <div>
            <h3 style={{ fontSize:18, fontWeight:700, color:"#fff", margin:"0 0 14px", fontFamily:FONT }}>
              如果重來一次
            </h3>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.85, margin:0 }}>
              會更早導入
              <span style={{ color:"#fff", fontWeight:600 }}>可用性測試</span>——
              我在第二輪迭代才發現年長使用者對「粗大動作分級」的理解存在很大差異，
              導致問卷題目需要全面重寫。更早的測試能節省 2-3 週的迭代成本。
            </p>
          </div>
        </div>

        {/* CTA */}
        <div style={{ display:"flex", gap:12, marginTop:56, alignItems:"center" }}>
          <a
            href="#"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           8,
              padding:       "12px 28px",
              borderRadius:  9999,
              background:    C.primary,
              color:         "#fff",
              fontSize:      14,
              fontFamily:    FONT,
              fontWeight:    600,
              textDecoration:"none",
              letterSpacing: "0.03em",
            }}
          >
            前往網站 ↗
          </a>
          <button
            onClick={() => {
              const s = document.getElementById("main-scroll");
              const t = document.getElementById("r4u-summary");
              if (s && t) s.scrollTo({ top: t.offsetTop - 56, behavior:"smooth" });
            }}
            style={{
              background:    "transparent",
              border:        "1px solid rgba(255,255,255,0.2)",
              color:         "rgba(255,255,255,0.6)",
              padding:       "12px 24px",
              borderRadius:  9999,
              fontSize:      14,
              fontFamily:    FONT,
              cursor:        "pointer",
              letterSpacing: "0.03em",
            }}
          >
            ↑ 回到頂部
          </button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function Rent4UScrollStory() {
  const [active, setActive] = useState("summary");

  // Noto Sans TC
  useEffect(() => {
    const id = "noto-sans-tc";
    if (document.getElementById(id)) return;
    const link = Object.assign(document.createElement("link"), {
      id,
      rel:  "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700;900&display=swap",
    });
    document.head.appendChild(link);
  }, []);

  // IntersectionObserver → active nav highlight
  useEffect(() => {
    const scrollEl = document.getElementById("main-scroll");
    if (!scrollEl) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (!visible.length) return;
        // 選離視口中央最近的
        const mid = scrollEl.clientHeight / 2;
        const closest = visible.sort(
          (a, b) =>
            Math.abs(a.intersectionRect.top - mid) -
            Math.abs(b.intersectionRect.top - mid)
        )[0];
        setActive(closest.target.id.replace("r4u-", ""));
      },
      { root: scrollEl, rootMargin: "-20% 0px -20% 0px", threshold: 0 }
    );

    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(`r4u-${id}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: FONT }}>
      <TopNav active={active} />
      <SectionSummary />
      <SectionResearch />
      <SectionLogic />
      <SectionImpact />
    </div>
  );
}
