import { useState } from 'react';
import KurHesaplama   from './KurHesaplama';
import NetBrutHesaplama from './NetBrutHesaplama';
import KdvHesaplama    from './KdvHesaplama';
import KidemHesaplama  from './KidemHesaplama';
import FaizHesaplama   from './FaizHesaplama';
import styles from './MuhasebeHub.module.css';

const TABS = [
  {
    id: 'kur',
    label: 'Döviz, Altın & Gümüş',
    short: 'Döviz / Altın',
    component: KurHesaplama,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0 -18" />
      </svg>
    ),
  },
  {
    id: 'maas',
    label: 'Net / Brüt / Stopaj Maaş',
    short: 'Net / Brüt',
    component: NetBrutHesaplama,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 9h.01M18 15h.01" />
      </svg>
    ),
  },
  {
    id: 'kdv',
    label: 'KDV Hesaplayıcı',
    short: 'KDV',
    component: KdvHesaplama,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
  {
    id: 'kidem',
    label: 'Kıdem & İhbar Tazminatı',
    short: 'Kıdem',
    component: KidemHesaplama,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0 -2 -2h-4a2 2 0 0 0 -2 2v2" />
        <path d="M12 12v4M10 14h4" />
      </svg>
    ),
  },
  {
    id: 'faiz',
    label: 'Basit & Bileşik Faiz',
    short: 'Faiz',
    component: FaizHesaplama,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 16l4 -4l3 3l5 -7" />
      </svg>
    ),
  },
];

export default function MuhasebeHub() {
  const [active, setActive] = useState('kur');
  const ActiveComp = (TABS.find(t => t.id === active) ?? TABS[0]).component;

  return (
    <article className={styles.article} aria-label="Hesaplama Araçları" id="hesaplama">
      {/* Hero */}
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>Hesaplama Aracı</h1>
        <p className={styles.heroSubtitle}>
          Canlı döviz, altın ve gümüş kurlarından maaş, KDV, kıdem ve faiz
          hesaplayıcılarına kadar günlük muhasebe ve mali işlemleriniz için
          ihtiyacınız olan tüm araçlar tek panelde. Tüm değerler eş zamanlı
          kaynaklardan beslenir.
        </p>
      </header>

      {/* Tab bar */}
      <nav className={styles.tabBar} role="tablist" aria-label="Hesaplayıcı sekmeleri">
        {TABS.map(t => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${t.id}`}
              id={`tab-${t.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
              onClick={() => setActive(t.id)}
            >
              <span className={styles.tabIcon} aria-hidden="true">{t.icon}</span>
              <span className={styles.tabLabelLong}>{t.label}</span>
              <span className={styles.tabLabelShort}>{t.short}</span>
            </button>
          );
        })}
      </nav>

      {/* Active panel */}
      <section
        role="tabpanel"
        id={`tab-panel-${active}`}
        aria-labelledby={`tab-${active}`}
        className={styles.panel}
      >
        <ActiveComp />
      </section>
    </article>
  );
}
