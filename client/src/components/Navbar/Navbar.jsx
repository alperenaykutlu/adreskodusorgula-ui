import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_LINKS, SITE } from '../../constants/siteConfig';
import styles from './Navbar.module.css';

/* ════════════════════════════════════════════════════════════
   Logo İkonu — Ok ucu sol altı gösteren, 
   sağa doğru zigzaglarla yükselen/düşen özel çizim "A/M" şekli 
   ════════════════════════════════════════════════════════════ */
function LogoIcon() {
  return (
    <svg
      width="46" height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 
        Zigzag Ana Yol: 
        Sol alt uç (14,48) noktasından başlar.
        Yukarı sağa çıkar, vadi oluşturur, tekrar sivri bir zirve yapıp aşağı iner.
      */}
      <path
        d="M 14 48
           L 22 26
           L 26 36
           L 36 14
           L 46 44"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 
        Ok Ucu: 
        Sol alt köşe. Yön: sol alta (14,48) bakıyor.
      */}
      <polyline
        points="9,38 14,48 24,44"
        stroke="white"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
        return;
      }
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    navigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={styles.navbar} role="banner">
      <nav className={styles.inner} aria-label="Ana Navigasyon">

        {/* Logo */}
        <a href="/" className={styles.logo} aria-label={`${SITE.name} - Ana Sayfa`} onClick={handleLogoClick}>
          <span className={styles.logoIcon}>
            <LogoIcon />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoTitle}>Adres Kodu</span>
            <span className={styles.logoSub}>SORGULAMA</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul
          className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}
          role="list"
          id="nav-links"
        >
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <a
                href={link.href}
                className={styles.navLink}
                onClick={e => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={styles.hamburger}
          aria-label="Menüyü aç/kapat"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
    </header>
  );
}
