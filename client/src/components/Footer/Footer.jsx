import { SITE, FOOTER_LINKS } from '../../constants/siteConfig';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <span className={styles.brandTitle}>Adres Kodu</span>
              <span className={styles.brandSub}>SORGULAMA</span>
            </div>
            <p className={styles.brandDesc}>
              UAVT Adres Kodu sorgulama platformu. Adresinizi doğrulayın, poliçelerinizi yönetin.
            </p>
            <p className={styles.domain}>{SITE.domain}</p>
          </div>

          {/* Kurumsal */}
          <nav className={styles.col} aria-label="Kurumsal">
            <h4 className={styles.colTitle}>Kurumsal</h4>
            <ul className={styles.colList} role="list">
              {FOOTER_LINKS.kurumsal.map(l => (
                <li key={l.label}>
                  <a href={l.href} className={styles.colLink}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ürünler */}
          <nav className={styles.col} aria-label="Ürünler">
            <h4 className={styles.colTitle}>Ürünler</h4>
            <ul className={styles.colList} role="list">
              {FOOTER_LINKS.urunler.map(l => (
                <li key={l.label}>
                  <a href={l.href} className={styles.colLink}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Destek */}
          <nav className={styles.col} aria-label="Destek">
            <h4 className={styles.colTitle}>Destek</h4>
            <ul className={styles.colList} role="list">
              {FOOTER_LINKS.destek.map(l => (
                <li key={l.label}>
                  <a href={l.href} className={styles.colLink}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className={styles.bottom}>
          <p>© {year} {SITE.name}. Tüm hakları saklıdır.</p>
          <p>
            <a href={`tel:${SITE.phone}`} className={styles.bottomLink}>{SITE.phone}</a>
            &nbsp;·&nbsp;
            <a href={`mailto:${SITE.supportEmail}`} className={styles.bottomLink}>{SITE.supportEmail}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
