// Repo 列表頁
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REPOS } from "../data";
import Tag from "../components/Tag";
import styles from './RepoPage.module.css';

// 單一 Repo 列
function RepoRow({ repo }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => navigate(`/repo/${repo.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hovered={isHovered}
      className={styles.row}
    >
      {/* Hover 背景光暈（顏色依 repo 語言不同，保留 inline） */}
      <div
        className={styles.rowGlow}
        data-hovered={isHovered}
        style={{ background: `linear-gradient(90deg, ${repo.langColor}06, transparent)` }}
      />

      {/* Repo 資訊 */}
      <div>
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span style={{ color: repo.langColor }} className="font-mono text-[13px]">⎇</span>
          <span className={styles.repoName}>{repo.name}</span>
          <span className={styles.branch}>{repo.branch}</span>
        </div>
        <p className={styles.desc}>{repo.desc}</p>
        <div className="flex gap-[6px] flex-wrap">
          {repo.tags.map(tag => <Tag key={tag} label={tag} color={repo.langColor} />)}
        </div>
      </div>

      {/* 星數 + 語言 + 箭頭 */}
      <div className="flex flex-col items-end gap-[10px]">
        <span className={styles.stars}>★ {repo.stars}</span>
        <span
          className={styles.lang}
          style={{ '--color': repo.langColor }}
        >
          {repo.lang}
        </span>
        <span
          className={styles.arrow}
          data-hovered={isHovered}
          style={{ color: isHovered ? repo.langColor : undefined }}
        >
          ↗
        </span>
      </div>
    </div>
  );
}

// Repo 列表頁主元件
export default function RepoPage() {
  return (
    <div className="bg-bg flex-1">
      <div className={styles.header}>
        <span className={styles.eyebrow}>
          Technical Repositories · {REPOS.length} Components
        </span>
        <h1 className={styles.pageTitle}>Repository</h1>
        <p className={styles.pageDesc}>
          HTML/CSS 控制力的實證。每個 repo 都源自真實專案中解決過的具體問題。
        </p>
      </div>
      <div className={styles.list}>
        {REPOS.map(repo => <RepoRow key={repo.id} repo={repo} />)}
        <div className="border-t border-border" />
      </div>
    </div>
  );
}
