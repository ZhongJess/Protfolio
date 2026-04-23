// ── ERP / CRM Case Study ScrollStory ─────────────────────────────────────
import { useState, useEffect, useRef } from "react"; // useState/useEffect used in useFadeIn
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ErpCrmScrollStory.module.css";

const ACCENT = "#2563EB";

const imgAmPm   = "/images/erp/erp-persona-ampm.png";
const imgGm     = "/images/erp/erp-persona-gm.png";
const imgAssist = "/images/erp/erp-persona-assist.png";
const imgMatrix       = "/images/erp/erp-matrix.png";
const imgMatrixMobile = "/images/erp/erp-matrix-mobile.png";
const imgDashboard    = "/images/erp/erp-dashboard-gm.png";
const imgDashboardAm  = "/images/erp/erp-dashboard-am.png";
const imgDsSystem     = "/images/erp/erp-ds-system.png";
const imgQuotation    = "/images/erp/erp-quotation.png";
const imgProtos       = [1, 2, 3, 4, 5, 6].map(n => `/images/erp/erp-proto-${n}.png`);

// ── Section nav items ─────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "erp-problem",   label: "問題"  },
  { id: "erp-process",   label: "流程"  },
  { id: "erp-dashboard", label: "儀表板" },
  { id: "erp-quotation", label: "報價"  },
  { id: "erp-decision",  label: "決策"  },
  { id: "erp-demo",      label: "Demo"  },
];

function scrollTo(id) {
  const el  = document.getElementById(id);
  const box = document.getElementById("main-scroll");
  if (el && box) box.scrollTo({ top: el.offsetTop - 52, behavior: "smooth" });
}

// ── Sticky nav ────────────────────────────────────────────────────────────
function SectionNav({ active, onBack }) {
  return (
    <nav className={styles.nav}>
      <span className={styles.navBrand}><span>Portfolio</span> / ERP·CRM</span>
      {NAV_ITEMS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`${styles.navBtn} ${active === id ? styles.navBtnActive : ""}`}
        >
          {label}
        </button>
      ))}
      <button className={styles.navBack} onClick={onBack}>← Projects</button>
    </nav>
  );
}

// ── Fade-in on scroll ─────────────────────────────────────────────────────
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.06 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, {
    opacity:    vis ? 1 : 0,
    transform:  vis ? "translateY(0)" : "translateY(16px)",
    transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
  }];
}

function Reveal({ children, delay = 0, className, style: extra }) {
  const [ref, style] = useFadeIn(delay);
  return <div ref={ref} style={{ ...style, ...extra }} className={className}>{children}</div>;
}

// ── Main component ────────────────────────────────────────────────────────
export default function ErpCrmScrollStory() {
  const navigate = useNavigate();
  const goBack = () => navigate("/projects");

  return (
    <div className={styles.root}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBackRow}>
            <button className={styles.heroBackBtn} onClick={goBack}>← Projects</button>
          </div>
          <div className={styles.heroContent}>
            <div className={styles.heroTagRow}>
              {["UX Research", "Information Architecture", "Role-based Dashboard",
                "B2B", "2026"].map(t => (
                <span key={t} className={styles.heroTag}>{t}</span>
              ))}
            </div>
            <h1 className={styles.heroH1}>
              從許願池<em>到決策判斷</em>
            </h1>
            <p className={styles.heroSub}>
              為一間 B2B 公司重新設計 ERP-CRM 模組——
              讓複雜的報價流程不再倚靠人腦。
            </p>
            <div className={styles.heroStats}>
              {[
                { num: "5",  sup: "+",  label: "跨部門訪談" },
                { num: "−40", sup: "%", label: "必填欄位縮減" },
                { num: "0",  sup: "",  label: "寄錯信事故"  },
                { num: "UXUI Designer", sup: "", label: "專案角色" },
              ].map(({ num, sup, label }) => (
                <div key={label} className={styles.statCard}>
                  <div className={styles.statNum}>{num}<span>{sup}</span></div>
                  <div className={styles.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroBannerWrap}>
            <img src={imgDashboard} alt="ERP / CRM Dashboard Preview" className={styles.heroBannerImg} />
          </div>
        </div>
        <div className={styles.heroSpacer} />
      </section>

      {/* ── 01 PROBLEM ────────────────────────────────────────────────── */}
      <section id="erp-problem" className={styles.sectionWrap}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>01 / 問題定義</span>
            <h2 className={styles.sectionH2}>許願池困境</h2>
            <p className={styles.sectionDesc}>
              超過 5 場跨部門訪談後，我發現這不是一個 UI 問題——
              這是一場資訊架構的失控。每個人都把這套系統想像成自己習慣的延伸，
              而不是整個組織的工具。
            </p>
          </Reveal>

          <Reveal delay={80} className={styles.insight}>
            <div className={styles.insightLabel}>Design Insight</div>
            <p>
              訪談分析後，發現 3 個結構性問題：
              <strong>系統現代化與功能升級、決策與監控需求、客戶資訊依附在人身上</strong>。
            </p>
          </Reveal>

          <Reveal delay={120} className={styles.personaZigzag}>
            {/* AM / PM — left */}
            <div className={`${styles.personaRow} ${styles.personaLeft}`}>
              <div className={styles.personaContent}>
                <div className={styles.qrole}>AM / PM</div>
                <img src={imgAmPm} alt="AM/PM 角色插圖" className={styles.personaImg} />
                <p className={styles.personaDesc}>
                  現有的介面與流程（如舊有的 EIP）已不符目前使用需求。
                  團隊計畫透過重新設計 UI，針對自家的需求來製作 ERP。
                </p>
                <p className={styles.personaConclusion}>↳ 系統現代化與功能升級</p>
              </div>
            </div>
            {/* 總經理 — right */}
            <div className={`${styles.personaRow} ${styles.personaRight}`}>
              <div className={styles.personaContent}>
                <div className={styles.qrole}>總經理</div>
                <img src={imgGm} alt="總經理角色插圖" className={styles.personaImg} />
                <p className={styles.personaDesc}>
                  從「老闆」的角度出發，需要一個整合平台來管理客戶。
                  管理者希望點進特定客戶時，能一目了然其基本資料、網站資產、聯絡人、業務機會，特別是針對報價單的狀態。
                </p>
                <p className={styles.personaConclusion}>↳ 決策與監控需求</p>
              </div>
            </div>
            {/* 經理特助 — left */}
            <div className={`${styles.personaRow} ${styles.personaLeft}`}>
              <div className={styles.personaContent}>
                <div className={styles.qrole}>經理特助</div>
                <img src={imgAssist} alt="經理特助角色插圖" className={`${styles.personaImg} ${styles.personaImgFlip}`} />
                <p className={styles.personaDesc}>
                  「每次要查之前的合約，都要翻信箱或問同事。有時候乾脆重做一份，但又怕跟之前的不一樣。」
                </p>
                <p className={styles.personaConclusion}>↳ 客戶資訊依附在人身上，不在系統裡</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 PROCESS ────────────────────────────────────────────────── */}
      <section id="erp-process" className={`${styles.sectionWrap} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>02 / 設計流程</span>
            <h2 className={styles.sectionH2}>AI 輔助設計流程</h2>
            <p className={styles.sectionDesc}>
              從需求訪談到可部署的 Demo，全程使用 AI 工具加速執行，但所有設計決策由設計師判斷。
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className={styles.flowWrap}>
              {[
                ["需求訪談",       false],
                ["AI 整理訪談分析",    true ],
                ["Function Map",   false],
                ["IA 資訊架構",    false],
                ["Sitemap",        false],
                ["Design System",  true ],
                ["Wireframe",      true ],
                ["Figma mockup",     false],
                ["MCP 串接",       true ],
                ["Claude code 原型",   false],
                ["AI 測試報告",    true ],
                ["迭代修正",       false],
              ].map(([label, isAi], i, arr) => (
                <div key={i} className={styles.flowStep}>
                  <div className={`${styles.flowBox} ${isAi ? styles.flowBoxAi : ""}`}>{label}</div>
                  {i < arr.length - 1 && <span className={styles.flowArrow}>→</span>}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160} className={styles.aiCollab}>
            <span className={styles.aiIcon}>⚡</span>
            <div>
              <p className={styles.aiTitle}>「我負責判斷，AI 負責執行。」</p>
              <p className={styles.aiBody}>
                考量業界以 Figma 為主流，我用 Claude Code 將設計稿重構為 Figma 元件與 Design Token，
                省去重新繪製的時間。AI 做整理與草稿，所有設計決策仍由我判斷——
                這是設計師用 AI 做槓桿，不是 AI 替代設計師。
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <img src={imgDsSystem} alt="Design System" className={styles.fullImg} />
          </Reveal>
        </div>
      </section>

      {/* ── 03 DASHBOARD ──────────────────────────────────────────────── */}
      <section id="erp-dashboard" className={styles.sectionWrap}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>03 / 儀表板設計</span>
            <h2 className={styles.sectionH2}>角色化儀表板</h2>
            <p className={styles.sectionDesc}>
              不是同一頁面加權限遮蔽，而是為每個角色設計不同的思維模型（Mental Model）與資訊架構。
            </p>
          </Reveal>

          <Reveal delay={80} className={styles.dbContainer}>
            {/* 總經理 — text left, preview right */}
            <div className={styles.dbRow}>
              <div className={styles.dbTextBlock}>
                <h3 className={styles.dbCardTitle}>總經理</h3>
                <div className={styles.dbCardSubtitle}>業績監控 + 例外管理</div>
                <p className={styles.dbCardDesc}>
                  業績達成率配合目標一眼看差距。「待審核報價」放最頂部——這是總經理每天最核心的行動。
                  大額議價警示、客戶集中度風險提供商業風險視角。
                </p>
                <div className={styles.chips}>
                  {["報價單漏斗", "待審核報價件數", "大額議價中案件 Top 5", "AM/PM 排行"].map(c => (
                    <span key={c} className={styles.chip}>{c}</span>
                  ))}
                </div>
              </div>
              <div className={styles.dbPreview}>
                <img src={imgDashboard} alt="總經理儀表板" className={styles.dbPreviewImg} />
              </div>
            </div>
            {/* AM/PM — preview left, text right */}
            <div className={styles.dbRow}>
              <div className={styles.dbPreview}>
                <img src={imgDashboardAm} alt="AM/PM 儀表板" className={styles.dbPreviewImg} />
              </div>
              <div className={styles.dbTextBlock}>
                <h3 className={styles.dbCardTitle}>AM / PM / 經理特助</h3>
                <div className={styles.dbCardSubtitle}>客戶關係 + 報價管理</div>
                <p className={styles.dbCardDesc}>
                  快速建立新報價，系統自動帶入客戶歷史資料，減少重複輸入。報價狀態漏斗隨時知道「卡在哪個階段」。
                  客戶互動歷史集中在客戶檔案下，不需要翻信箱。
                </p>
                <div className={styles.chips}>
                  {["業績一覽", "進行中的報價單", "客戶互動紀錄提醒", "今日待辦", "經理已審核報價單"].map(c => (
                    <span key={c} className={styles.chip}>{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 QUOTATION ──────────────────────────────────────────────── */}
      <section id="erp-quotation" className={`${styles.sectionWrap} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>04 / 報價流程</span>
            <h2 className={styles.sectionH2}>報價流程重設計</h2>
            <p className={styles.sectionDesc}>
              問題核心是：報價流程仰賴人腦記憶，版本混亂、無從追溯。
            </p>
          </Reveal>

          <Reveal delay={70} className={styles.aiCollab}>
            <span className={styles.aiIcon}>⚡</span>
            <div>
              <p className={styles.aiTitle}>「人腦不該是系統的備份。」</p>
              <p className={styles.aiBody}>
                「讓知識不隨人員流失」是 ERP 層級的大命題。
                <strong>CRM 能做的，是在客戶關係這個維度上，建立完整的互動歷史</strong>——
                讓每一筆客戶資料，都比任何一個人的記憶更可靠。
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className={styles.baGrid}>
            <div className={`${styles.baCol} ${styles.baBefore}`}>
              <div className={styles.baHead}>× Before — 舊流程</div>
              <ul>
                <li>手動查詢舊報價，自行計算</li>
                <li>手動寄信，無法召回錯誤</li>
                <li>每次報價從零開始，無歷史參考</li>
                <li>需使用 Excel 建檔，轉成 PDF</li>
              </ul>
            </div>
            <div className={`${styles.baCol} ${styles.baAfter}`}>
              <div className={styles.baHead}>✓ After — 新流程</div>
              <ul>
                <li>直接進入 CRM 查閱客戶歷史</li>
                <li>系統帶入常見欄位，只需修改差異</li>
                <li>系統生成格式完整的 Excel 草稿</li>
                <li>主管確認後人工寄出（含時間戳記）</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <img src={imgQuotation} alt="報價單流程頁面" className={styles.fullImg} />
          </Reveal>
        </div>
      </section>

      {/* ── 05 DECISION ───────────────────────────────────────────────── */}
      <section id="erp-decision" className={`${styles.sectionWrap} ${styles.sectionAlt}`}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>05 / 開發決策</span>
            <h2 className={styles.sectionH2}>需求取捨矩陣</h2>
            <p className={styles.sectionDesc}>
              訪談後，我面對的是充滿矛盾的需求清單。
              因此，我建立了一個評估矩陣，讓討論從「我想要」回到「應該做」。
            </p>
          </Reveal>

          <Reveal delay={80} className={styles.aiCollab}>
            <span className={styles.aiIcon}>⚡</span>
            <div>
              <p className={styles.aiTitle}>「需求不怕多，怕的是沒有衡量標準。」</p>
              <p className={styles.aiBody}>
                矛盾的需求清單是訪談的常態，問題不在需求本身，在於缺乏篩選框架。
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <picture>
              <source media="(max-width: 767px)" srcSet={imgMatrixMobile} />
              <img src={imgMatrix} alt="需求取捨矩陣" className={styles.matrixImg} />
            </picture>
          </Reveal>
        </div>
      </section>

      {/* ── 06 PROTOTYPE ──────────────────────────────────────────────── */}
      <section id="erp-demo" className={styles.sectionWrap}>
        <div className={styles.sectionInner}>
          <Reveal>
            <span className={styles.sectionBadge}>06 / Prototype</span>
            <h2 className={styles.sectionH2}>Vibe coding</h2>
            <p className={styles.sectionDesc}>
              前端 HTML / CSS / JavaScript（原生），後端 Node.js，部署於 Vercel。
            </p>
          </Reveal>

          <Reveal delay={60} className={styles.protoGrid}>
            {imgProtos.map((src, i) => (
              <img key={i} src={src} alt={`原型截圖 ${i + 1}`} className={styles.protoImg} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Portal buttons ─────────────────────────────────────────────── */}
      {createPortal(
        <>
          <a
            href="https://erp-crm-system.vercel.app/dashboard"
            target="_blank"
            rel="noreferrer"
            className={`${styles.glassBtn} ${styles.glassBtnLeft}`}
          >
            前往網站 ↗
          </a>
          <button
            className={`${styles.glassBtn} ${styles.glassBtnRight}`}
            onClick={() => document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "smooth" })}
          >
            ↑ 回到頂部
          </button>
        </>,
        document.body
      )}
    </div>
  );
}
