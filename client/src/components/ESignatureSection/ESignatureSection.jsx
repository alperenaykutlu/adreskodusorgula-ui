import { useState } from 'react';
import ContactModal from './ContactModal';
import styles from './ESignatureSection.module.css';

const PURCHASE_URL = 'https://evezne.netgsm.com.tr/?type=eimza';

const FEATURES = [
  {
    label: 'Güvenlik',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: 'Yasal',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M3 6l9-4 9 4" />
        <path d="M5 10v7" />
        <path d="M19 10v7" />
        <path d="M12 6v14" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    label: 'Kolay Kurulum',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
  {
    label: 'Hızlı Teslimat',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: 'Geniş Kullanım Alanı',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function ESignatureSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h2 className={styles.heading}>
          İhtiyacınız olan e-imza için size yardımcı olalım
        </h2>
        <p className={styles.subdesc}>
          Anlaşmalı kurumumuz üzerinden güvenli, yasal ve hızlı e-imza çözümü:
          kuruluma uzun zaman ayırmadan tüm ihtiyaçlarınızı karşılayın.
        </p>
      </header>

      <ul className={styles.features} aria-label="E-İmza Özellikleri">
        {FEATURES.map(({ label, icon }) => (
          <li key={label} className={styles.feature}>
            <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
            <span className={styles.featureLabel}>{label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={() => setModalOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.93.35 1.84.65 2.72a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.88.3 1.79.52 2.72.65A2 2 0 0 1 22 16.92z" />
          </svg>
          İletişime Geçin
        </button>

        <a
          href={PURCHASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btn} ${styles.btnPrimary}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Satın Al
        </a>
      </div>

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
