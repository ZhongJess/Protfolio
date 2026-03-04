// Repo 詳細頁（程式碼預覽 + 截圖）
import { useEffect } from "react";
import Tag from "../components/Tag";
import styles from './RepoDetailPage.module.css';

function WindowDots() {
  return (
    <div className="flex gap-[6px]">
      {["#FF5F57", "#FFBD2E", "#28C840"].map(color => (
        <div key={color} className="w-[10px] h-[10px] rounded-full" style={{ background: color }} />
      ))}
    </div>
  );
}

export default function RepoDetailPage({ repo, onBack }) {
  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="bg-bg flex-1">

      {/* 返回按鈕 */}
      <div className={styles.backWrap}>
        <button
          onClick={onBack}
          className={styles.backBtn}
          onMouseEnter={e => e.currentTarget.style.color = repo.langColor}
          onMouseLeave={e => e.currentTarget.style.color = ''}
        >
          ← Repository
        </button>
      </div>

      {/* Repo 標題 + 描述 + 標籤 */}
      <div className={styles.headerWrap}>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[18px]" style={{ color: repo.langColor }}>⎇</span>
          <h1 className={styles.repoTitle}>{repo.name}</h1>
        </div>

        <p className={styles.desc}>{repo.desc}</p>

        <div className="flex gap-2 flex-wrap mb-8">
          {repo.tags.map(tag => <Tag key={tag} label={tag} color={repo.langColor} />)}
          <a
            href={repo.github}
            target="_blank" rel="noopener noreferrer"
            className={styles.githubLink}
            onMouseEnter={e => e.currentTarget.style.borderColor = repo.langColor}
            onMouseLeave={e => e.currentTarget.style.borderColor = ''}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub ↗
          </a>
        </div>
      </div>

      {/* 程式碼 + 截圖雙欄 */}
      <div className={styles.twoCols}>

        {/* 左：程式碼 */}
        <div className={styles.codePanel}>
          <div className={styles.panelBar}>
            <WindowDots />
            <span className={styles.filename}>{repo.name}.css</span>
          </div>
          <pre className={styles.pre}><code>{repo.code}</code></pre>
        </div>

        {/* 右：截圖 */}
        <div className={styles.previewPanel}>
          <div className={styles.panelBarSimple}>
            <span className={styles.filename}>Preview</span>
          </div>
          <div className={styles.previewImg}>
            <img
              src={repo.screenshot}
              alt="Component preview"
              className="w-full h-full object-cover brightness-[0.8] saturate-[0.9]"
            />
          </div>
          <div className={styles.previewFooter}>
            ★ {repo.stars} stars · {repo.lang}
          </div>
        </div>

      </div>
    </div>
  );
}
