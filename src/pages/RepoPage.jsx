// Repo 策展式卡片頁
import { REPOS } from "../data";
import styles from './RepoPage.module.css';

function RepoCard({ repo }) {
  return (
    <div className={styles.card}>
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

        {/* Description */}
        <p className={styles.cardDesc}>{repo.desc}</p>

        {/* Tags */}
        <div className={styles.tags}>
          {repo.tags.map(tag => (
            <span
              key={tag}
              className={styles.tag}
              style={{ '--color': repo.langColor }}
            >{tag}</span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={repo.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubBtn}
        >
          Explore Source Code on GitHub ↗
        </a>
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
