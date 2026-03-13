// 首頁：Hero + 橫排作品 + Repo 2×2 + 技能跑馬燈
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConstellationSkills from "../components/ConstellationSkills";
import Tag from "../components/Tag";
import { PROJECTS, REPOS, DESIGN_TOOLS } from "../data";
import styles from './HomePage.module.css';

// 跑馬燈元件
function Marquee() {
  const items = [...DESIGN_TOOLS, ...DESIGN_TOOLS];
  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeTrack}>
        {items.map((pill, i) => (
          <span key={i} className={styles.marqueeItem}>
            <span className={styles.marqueeDot} style={{ background: pill.color }} />
            {pill.label}
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
      <rect x="6" y="0" width="4" height="2"/>
      <rect x="8" y="0" width="2" height="4"/>
      <rect x="6" y="2" width="2" height="2"/>
      <rect x="4" y="4" width="2" height="2"/>
      <rect x="2" y="6" width="2" height="2"/>
      <rect x="0" y="8" width="2" height="2"/>
    </svg>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [mousePos, setMousePos]       = useState({ x: 0.5, y: 0.5 });
  const [visible, setVisible]         = useState(false);
  const [visibleRows, setVisibleRows] = useState(new Set());
  const [visibleRepo, setVisibleRepo] = useState(new Set());
  const rowRefs  = useRef([]);
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
            我把商業需求<br />
            <em className={styles.accent}>翻譯</em>成<br />
            用戶能感受到的設計
          </h1>
          <p className={styles.body}>
            2-4 年橫跨 PM 與 UX 的複合視角——在商業目標與用戶感受之間建造橋樑，讓兩端都聽得懂對方的語言。
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
        <div className={styles.marqueeSectionLabel}>Design Tools & Skills</div>
        <Marquee />
      </section>

    </div>
  );
}
