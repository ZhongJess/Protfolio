// 首頁：Hero + 橫排作品 + Repo 2×2 + 技能跑馬燈
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConstellationSkills from "../components/ConstellationSkills";
import Tag from "../components/Tag";
import { PROJECTS, REPOS, DESIGN_TOOLS } from "../data";
import styles from './HomePage.module.css';

// 品牌 Logo SVG（monochrome，依工具）
const BRAND_ICONS = {
  "Figma": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83" />
      <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF" />
      <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E" />
      <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262" />
      <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE" />
    </svg>
  ),
  "Miro": (
    <svg width="15" height="15" viewBox="0 0 24 24">
      <rect width="24" height="24" rx="5" fill="#FFD02F" />
      <path d="M4,20 V4 H7 L12,10 L17,4 H20 V20 H17 V11 L12,17 L7,11 V20 Z" fill="#050038" />
    </svg>
  ),
  "GitHub": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  "Notion": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933z" />
    </svg>
  ),
  "Claude Code": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#D97757">
      <path fillRule="evenodd" d="M13.613 3.447h-3.254L2.56 20.553h3.321l1.669-4.223h9.9l1.666 4.223h3.324zm-1.624 3.474 3.58 9.388H8.411z" />
    </svg>
  ),
  "Visual Studio": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.5.32L9.482 8.857l-4.57-3.47L1.786 6.947v9.106l3.126 1.56 4.622-3.47L17.5 23.68 23 21.286V2.714zm0 5.966v11.422l-4.5-3.415V9.712zm-11.928 8.58l-2.286-1.143V8.677l2.286-1.143 3.5 2.86v5.553z" />
    </svg>
  ),
};

// 跑馬燈元件（4× 複製確保無縫）
function Marquee() {
  const items = [...DESIGN_TOOLS, ...DESIGN_TOOLS, ...DESIGN_TOOLS, ...DESIGN_TOOLS];
  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeTrack}>
        {items.map((tool, i) => (
          <span key={i} className={styles.marqueeItem}>
            {BRAND_ICONS[tool.label] ?? <span className={styles.marqueeDot} style={{ background: tool.color }} />}
            {tool.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ★ 圖示
function IconStar() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// 像素風格 ↗ 箭頭
function IconPixelArrow() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" shapeRendering="crispEdges">
      <rect x="6" y="0" width="4" height="2" />
      <rect x="8" y="0" width="2" height="4" />
      <rect x="6" y="2" width="2" height="2" />
      <rect x="4" y="4" width="2" height="2" />
      <rect x="2" y="6" width="2" height="2" />
      <rect x="0" y="8" width="2" height="2" />
    </svg>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible] = useState(false);
  const [visibleRows, setVisibleRows] = useState(new Set());
  const [visibleRepo, setVisibleRepo] = useState(new Set());
  const rowRefs = useRef([]);
  const repoRefs = useRef([]);
  const worksRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const fn = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // IntersectionObserver：project rows
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisibleRows(p => new Set([...p, +e.target.dataset.rowIdx]));
      }),
      { threshold: 0.1 }
    );
    rowRefs.current.forEach(r => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  // IntersectionObserver：repo cards
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) setVisibleRepo(p => new Set([...p, +e.target.dataset.repoIdx]));
      }),
      { threshold: 0.1 }
    );
    repoRefs.current.forEach(r => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  function scrollToWorks() {
    worksRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="bg-bg flex flex-col flex-1">

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div
          className={styles.glow}
          style={{ background: `radial-gradient(ellipse 70% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,98,0,0.07) 0%, transparent 65%)` }}
        />
        <div className={styles.grid} />

        <div className={styles.textBlock} data-visible={visible}>
          <div className={styles.subtitle}>
            <span className={styles.subtitleLine} />
            Product Designer · UX Strategist
          </div>
          <h1 className={styles.heading}>
            我將商業需求<br />
            <em className={styles.accent}>翻譯</em>成<br />
            使用者能感知的設計
          </h1>
          <p className={styles.body}>
            具備橫跨 PM 邏輯與 UX 實作的複合視角——在商業目標與技術實作之間建造橋樑，讓產品的每一處細節，都能同時滿足市場企圖與用戶感受。
          </p>
          <button onClick={scrollToWorks} className={styles.cta}>
            看我的作品
          </button>
        </div>

        <div className={styles.physicsOverlay}>
          <ConstellationSkills />
        </div>

        <div className={styles.scrollHint} data-visible={visible}>
          <span className={styles.scrollDot} />
        </div>
      </section>

      {/* ── Project ── */}
      <section ref={worksRef} className={styles.works}>
        <div className={styles.worksInner}>
          <div className={styles.worksHeader}>
            <div>
              <div className={styles.worksLabel}>Selected Work</div>
              <h2 className={styles.worksTitle}>Project</h2>
            </div>
            <div className={styles.worksHeaderLine} />
          </div>
        </div>

        <div className={styles.worksInner}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={el => rowRefs.current[i] = el}
              data-row-idx={i}
              data-visible={visibleRows.has(i)}
              className={styles.projectRow}
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <div className={styles.projectImg}>
                <img src={project.img} alt={project.title} loading="lazy" />
                <span className={styles.projectNum}>{project.num}</span>
              </div>

              <div className={styles.projectContent}>
                <span className={styles.projectYear}>{project.year}</span>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <div className={styles.projectTags}>
                  {project.tags.map(tag => (
                    <Tag key={tag} label={`# ${tag}`} color={project.tagColor} />
                  ))}
                </div>
                <p className={styles.projectDesc}>{project.desc}</p>
                <span className={styles.projectBtn}>
                  查看案例
                  <IconPixelArrow />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Repository 2×2 ── */}
      <section className={styles.repoSection}>
        <div className={styles.worksInner}>
          <div className={styles.worksHeader}>
            <div>
              <div className={styles.worksLabel}>Code & Component</div>
              <h2 className={styles.worksTitle}>Repository</h2>
            </div>
            <div className={styles.worksHeaderLine} />
          </div>

          <div className={styles.repoGrid}>
            {REPOS.map((repo, i) => (
              <div
                key={repo.id}
                ref={el => repoRefs.current[i] = el}
                data-repo-idx={i}
                data-visible={visibleRepo.has(i)}
                className={styles.repoCard}
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
                onClick={() => navigate(`/repo/${repo.id}`)}
              >
                {/* 預覽圖 */}
                <div className={styles.repoImg}>
                  <img src={repo.screenshot} alt={repo.name} loading="lazy" />
                </div>

                {/* 內容 */}
                <div className={styles.repoBody}>
                  <div className={styles.repoMeta}>
                    <span
                      className={styles.repoLang}
                      style={{ color: repo.langColor, borderColor: `${repo.langColor}33`, background: `${repo.langColor}0D` }}
                    >
                      {repo.lang}
                    </span>
                    <span className={styles.repoStars}>
                      <IconStar /> {repo.stars}
                    </span>
                  </div>
                  <h3 className={styles.repoName}>{repo.name}</h3>
                  <p className={styles.repoDesc}>{repo.desc}</p>
                  <div className={styles.repoTags}>
                    {repo.tags.map(tag => (
                      <span key={tag} className={styles.repoTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 技能跑馬燈 ── */}
      <section className={styles.marqueeSection}>
        <div className={styles.marqueeSectionLabel}>Design Tools</div>
        <Marquee />
      </section>

    </div>
  );
}
