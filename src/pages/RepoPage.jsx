// Repo 策展式卡片頁
import { useNavigate } from "react-router-dom";
import { REPOS } from "../data";
import styles from './RepoPage.module.css';

function RepoCard({ repo }) {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card}
      onClick={() => navigate(`/repo/${repo.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && navigate(`/repo/${repo.id}`)}
    >
      <div className={styles.cardInner}>
      {/* Preview Image */}
      <div className={styles.cardImg}>
        <img src={repo.screenshot} alt={repo.name} className={styles.img} />
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        {/* Lang badge */}
        <span className={styles.lang} style={{ '--color': repo.langColor }}>
          {repo.lang}
        </span>

        {/* Title */}
        <h2 className={styles.cardTitle}>{repo.name}</h2>

        {/* One-line desc */}
        <p className={styles.cardDesc}>{repo.desc}</p>

        {/* Bottom row: tags + arrow */}
        <div className={styles.cardBottom}>
          <div className={styles.tags}>
            {repo.tags.map(tag => (
              <span
                key={tag}
                className={styles.tag}
                style={{ '--color': repo.langColor }}
              >{tag}</span>
            ))}
          </div>
          <span className={styles.arrow}>→</span>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function RepoPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          Technical Repositories · {REPOS.length} Projects
        </span>
        <h1 className={styles.pageTitle}>Repository</h1>
        <p className={styles.pageDesc}>
          HTML/CSS 控制力的實證。每個 repo 都源自真實專案中解決過的具體問題。
        </p>
      </div>

      <div className={styles.grid}>
        {REPOS.map(repo => <RepoCard key={repo.id} repo={repo} />)}
      </div>
    </div>
  );
}
