// 聯絡頁面（使用 mailto: 開啟郵件客戶端，不需要後端）
import { useState, useEffect } from "react";
import styles from './ContactPage.module.css';

export default function ContactPage({ onBack }) {
  const [form, setForm] = useState({ email: "", name: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSend = () => {
    if (!form.email || !form.name || !form.message) {
      setError("請填寫所有欄位。");
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`);
    window.location.href = `mailto:sk2377328815@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="bg-bg flex-1 flex flex-col">
      <div className={styles.wrap}>

        {/* 卡片 */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Dear Jess,</h2>

          {sent ? (
            /* 送出成功狀態 */
            <div className="text-center py-8">
              <div className="text-[32px] mb-4">✉️</div>
              <p className={styles.sentTitle}>郵件已開啟</p>
              <p className={styles.sentDesc}>你的郵件客戶端應該已彈出。<br />請確認並送出郵件。</p>
              <button onClick={() => setSent(false)} className={styles.resetBtn}>再寫一封</button>
            </div>
          ) : (
            <>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  name="email" type="email" placeholder="Your email"
                  value={form.email} onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input
                  name="name" type="text" placeholder="Your name"
                  value={form.name} onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea
                  name="message" placeholder="Write your message here..."
                  value={form.message} onChange={handleChange}
                  rows={6}
                  className={`${styles.input} ${styles.textarea}`}
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <button onClick={handleSend} className={styles.sendBtn}>Send email</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
