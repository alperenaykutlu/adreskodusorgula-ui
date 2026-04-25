import styles from './AccountingSection.module.css';

const PURCHASE_URL = 'https://www.parasut.com/kullanici-kaydi?&ads_cmpid=1487348625&ads_adid=134618896512&ads_matchtype=e&ads_network=g&ads_creative=704193888874&ads_targetid=kwd-326275116883&ttv=2&campaignid=1487348625&adgroupid=134618896512&adid=704193888874&gad_campaignid=1487348625';
const CONTACT_PHONE = '0850 000 00 00';
const CONTACT_PHONE_HREF = 'tel:+908500000000';

const FEATURES = [
  {
    label: 'Online Erişim',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: 'E-Fatura / E-Arşiv',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
      </svg>
    ),
  },
  {
    label: 'Stok & Cari',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Gelir-Gider Takibi',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: 'Mali Müşavir Uyumlu',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function AccountingSection() {
  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <h2 className={styles.heading}>
          Muhasebe işlemleriniz için yanınızdayız
        </h2>
        <p className={styles.subdesc}>
          Anlaşmalı çözüm ortağımız Paraşüt ile e-fatura, e-arşiv, stok, cari ve gelir-gider
          takibinizi tek panelden yönetin. Mali müşaviriniz ile entegre, GİB onaylı ve
          KVKK uyumlu çalışır.
        </p>
      </header>

      <ul className={styles.features} aria-label="Muhasebe Özellikleri">
        {FEATURES.map(({ label, icon }) => (
          <li key={label} className={styles.feature}>
            <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
            <span className={styles.featureLabel}>{label}</span>
          </li>
        ))}
      </ul>

      <div className={styles.phoneCard}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.93.35 1.84.65 2.72a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.88.3 1.79.52 2.72.65A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>Bilgi Hattı:</span>
        <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>
      </div>

      <div className={styles.actions}>
        <a
          href={CONTACT_PHONE_HREF}
          className={`${styles.btn} ${styles.btnSecondary}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.93.35 1.84.65 2.72a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.88.3 1.79.52 2.72.65A2 2 0 0 1 22 16.92z" />
          </svg>
          İletişime Geçin
        </a>

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
    </div>
  );
}
