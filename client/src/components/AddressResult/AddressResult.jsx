import { useState } from 'react';
import { useToast } from '../Toast/ToastContext';
import styles from './AddressResult.module.css';

/**
 * AddressResult — UAVT kodu sonuç ekranı
 *
 * Props:
 *  result   — { uavtCode, binaCode, snapshotLabels }
 *  onReset  — "Tekrar Sorgula" callback
 */
export default function AddressResult({ result, onReset }) {
  const toast   = useToast();
  const showToast = toast?.showToast ?? (() => {});
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const { uavtCode, binaCode, snapshotLabels: L = {} } = result;

  /* Adres satırı: mahalle, cadde, dış kapı, iç kapı, ilçe/il */
  const adresText = [
    L.mahalle,
    L.cadde,
    L.disKapi ? `No: ${L.disKapi}` : '',
    L.icKapi  ? `Daire: ${L.icKapi}` : '',
    [L.ilce, L.il].filter(Boolean).join(' / '),
  ].filter(Boolean).join(', ');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uavtCode);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = uavtCode;
      ta.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    showToast('UAVT kodu panoya kopyalandı ✓');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={styles.result} role="region" aria-label="Sorgu Sonucu">

      {/* Başarı badge */}
      <div className={styles.badge}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Sorgu Tamamlandı
      </div>

      {/* UAVT Kodu + kopyala (border/bg yok) */}
      <div className={styles.codeBox}>
        <div className={styles.codeLeft}>
          <span className={styles.codeLabel}>UAVT Adres Kodu</span>
          <span className={styles.codeValue} id="uavt-code-display">{uavtCode}</span>
        </div>

        <button
          id="btn-copy"
          className={`${styles.btnCopy} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          aria-label="UAVT kodunu kopyala"
        >
          {copied ? (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Kopyalandı
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              Kodu Kopyala
            </>
          )}
        </button>
      </div>

      {/* Adres Detayı */}
      <div className={styles.adresDetail}>
        <h4 className={styles.detailLabel}>Girilen Adres Bilgisi</h4>
        <p className={styles.adresText} id="result-address-text">
          {adresText || '—'}
        </p>
        <div className={styles.binaRow}>
      
          Bina Kodu:&nbsp;<strong id="result-bina-code">{binaCode}</strong>
        </div>
      </div>

      {/* Tekrar Sorgula */}
      <button
        id="btn-requery"
        className={styles.btnRequery}
        onClick={onReset}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="1 4 1 10 7 10"/>
          <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
        </svg>
        Tekrar Sorgula
      </button>
    </div>
  );
}
