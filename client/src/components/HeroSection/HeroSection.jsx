import { useState, useEffect } from 'react';
import AddressForm        from '../AddressForm/AddressForm';
import AddressResult      from '../AddressResult/AddressResult';
import ESignatureSection  from '../ESignatureSection/ESignatureSection';
import AccountingSection  from '../AccountingSection/AccountingSection';
import styles from './HeroSection.module.css';

/* ════════════════════════════════════════════════════════════
   Arka plan: sadece yıldız noktaları + nadir kayan yıldız
   ════════════════════════════════════════════════════════════ */
function HeroBg() {
  return (
    <div className={styles.bgDeco} aria-hidden="true">
      {/* Sabit küçük yıldız noktaları — 40 adet */}
      <span className={`${styles.star} ${styles.s1}`}  />
      <span className={`${styles.star} ${styles.s2}`}  />
      <span className={`${styles.star} ${styles.s3}`}  />
      <span className={`${styles.star} ${styles.s4}`}  />
      <span className={`${styles.star} ${styles.s5}`}  />
      <span className={`${styles.star} ${styles.s6}`}  />
      <span className={`${styles.star} ${styles.s7}`}  />
      <span className={`${styles.star} ${styles.s8}`}  />
      <span className={`${styles.star} ${styles.s9}`}  />
      <span className={`${styles.star} ${styles.s10}`} />
      <span className={`${styles.star} ${styles.s11}`} />
      <span className={`${styles.star} ${styles.s12}`} />
      <span className={`${styles.star} ${styles.s13}`} />
      <span className={`${styles.star} ${styles.s14}`} />
      <span className={`${styles.star} ${styles.s15}`} />
      <span className={`${styles.star} ${styles.s16}`} />
      <span className={`${styles.star} ${styles.s17}`} />
      <span className={`${styles.star} ${styles.s18}`} />
      <span className={`${styles.star} ${styles.s19}`} />
      <span className={`${styles.star} ${styles.s20}`} />
      <span className={`${styles.star} ${styles.s21}`} />
      <span className={`${styles.star} ${styles.s22}`} />
      <span className={`${styles.star} ${styles.s23}`} />
      <span className={`${styles.star} ${styles.s24}`} />
      <span className={`${styles.star} ${styles.s25}`} />
      <span className={`${styles.star} ${styles.s26}`} />
      <span className={`${styles.star} ${styles.s27}`} />
      <span className={`${styles.star} ${styles.s28}`} />
      <span className={`${styles.star} ${styles.s29}`} />
      <span className={`${styles.star} ${styles.s30}`} />
      <span className={`${styles.star} ${styles.s31}`} />
      <span className={`${styles.star} ${styles.s32}`} />
      <span className={`${styles.star} ${styles.s33}`} />
      <span className={`${styles.star} ${styles.s34}`} />
      <span className={`${styles.star} ${styles.s35}`} />
      <span className={`${styles.star} ${styles.s36}`} />
      <span className={`${styles.star} ${styles.s37}`} />
      <span className={`${styles.star} ${styles.s38}`} />
      <span className={`${styles.star} ${styles.s39}`} />
      <span className={`${styles.star} ${styles.s40}`} />

      {/* Kayan yıldızlar — nadir, aralıklı, 6 adet */}
      <span className={`${styles.shooter} ${styles.sh1}`} />
      <span className={`${styles.shooter} ${styles.sh2}`} />
      <span className={`${styles.shooter} ${styles.sh3}`} />
      <span className={`${styles.shooter} ${styles.sh4}`} />
      <span className={`${styles.shooter} ${styles.sh5}`} />
      <span className={`${styles.shooter} ${styles.sh6}`} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   HeroSection — Gradient hero + QueryCard (form veya sonuç)
   ════════════════════════════════════════════════════════════ */
export default function HeroSection({ formProps }) {
  const { result, handleReset, onQuery, ...rest } = formProps;

  /* Aktif sekme: 'adres' | 'eimza' | 'muhasebe' */
  const [activeTab, setActiveTab] = useState('adres');

  /* ── 3D Flip Animasyonu ─────────────────────────────── */
  const [displayResult, setDisplayResult] = useState(result);
  const [flipClass,     setFlipClass    ] = useState('');

  useEffect(() => {
    if (result === displayResult) return;

    setFlipClass(styles.flipOut);

    const t1 = setTimeout(() => {
      setDisplayResult(result);
      setFlipClass(styles.flipIn);
    }, 260);

    const t2 = setTimeout(() => setFlipClass(''), 520);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [result]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Tab değişimi — animasyonsuz, anında geçiş */
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  return (
    <section className={styles.hero} aria-label="Adres Sorgulama">
      <HeroBg />

      <div className={styles.inner}>
        {/* Başlık */}
        <div className={styles.titleGroup}>
          <h1 className={styles.title}>Adres Sorgulama</h1>
          <p className={styles.subtitle}>
            İl, ilçe, mahalle ve sokak bilgilerinizle UAVT adres kodunuzu anında öğrenin.
          </p>
        </div>

        {/* Ana Kart — flip animasyonlu */}
        <div className={`${styles.card} ${flipClass}`} role="main">

          {/* Tab Header */}
          <div className={styles.tabsHeader}>
            <button
              className={`${styles.tabBtn} ${activeTab === 'adres' ? styles.tabBtnActive : ''}`}
              id="tab-adres"
              onClick={() => handleTabChange('adres')}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Adres Kodu Öğrenme
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'eimza' ? styles.tabBtnActive : ''}`}
              id="tab-eimza"
              onClick={() => handleTabChange('eimza')}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <line x1="10" y1="9"  x2="8" y2="9"/>
              </svg>
              E-İmza İşlemleri
            </button>

            <button
              className={`${styles.tabBtn} ${activeTab === 'muhasebe' ? styles.tabBtnActive : ''}`}
              id="tab-muhasebe"
              onClick={() => handleTabChange('muhasebe')}
              type="button"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8"  y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Muhasebe İşlemleri
            </button>
          </div>

          {/* Kart Gövdesi */}
          <div className={styles.cardBody}>
            {activeTab === 'adres' && (
              displayResult ? (
                <AddressResult result={displayResult} onReset={handleReset} />
              ) : (
                <AddressForm {...rest} onQuery={onQuery} />
              )
            )}
            {activeTab === 'eimza' && <ESignatureSection />}
            {activeTab === 'muhasebe' && <AccountingSection />}
          </div>
        </div>
      </div>

      <div className={styles.wave} aria-hidden="true" />
    </section>
  );
}
