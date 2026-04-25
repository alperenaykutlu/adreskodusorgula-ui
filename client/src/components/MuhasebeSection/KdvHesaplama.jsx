import { useMemo, useState } from 'react';
import { formatTRY, parseTrNumber } from '../../utils/format';
import styles from './Calc.module.css';

const KDV_ORANLARI = [1, 10, 20];

export default function KdvHesaplama() {
  const [mode, setMode] = useState('haric'); // 'haric' = KDV ekle, 'dahil' = KDV ayır
  const [oran, setOran] = useState(20);
  const [tutar, setTutar] = useState('1000');

  const result = useMemo(() => {
    const v = parseTrNumber(tutar);
    if (v == null || v < 0) return null;
    const r = oran / 100;
    if (mode === 'haric') {
      // KDV hariç tutardan brüt hesapla
      const kdv  = v * r;
      const brut = v + kdv;
      return { matrah: v, kdv, brut };
    }
    // KDV dahil → matrah ve KDV ayır
    const matrah = v / (1 + r);
    const kdv    = v - matrah;
    return { matrah, kdv, brut: v };
  }, [tutar, oran, mode]);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.h2}>KDV Hesaplayıcı</h2>
      <p className={styles.lede}>
        KDV dahil tutardan matrah ve vergiyi ayırın ya da KDV hariç tutara KDV
        ekleyerek brüt fiyatı bulun. Türkiye’de uygulanan %1, %10 ve %20 oranları
        ile birlikte serbest oran girişi de desteklenir.
      </p>

      <div className={styles.form}>
        <div className={styles.field}>
          <span className={styles.label}>Hesaplama Yönü</span>
          <div className={styles.toggle} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'haric'}
              className={`${styles.toggleBtn} ${mode === 'haric' ? styles.toggleActive : ''}`}
              onClick={() => setMode('haric')}
            >KDV Ekle (hariç → dahil)</button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'dahil'}
              className={`${styles.toggleBtn} ${mode === 'dahil' ? styles.toggleActive : ''}`}
              onClick={() => setMode('dahil')}
            >KDV Ayır (dahil → matrah)</button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="kdv-tutar">
            {mode === 'haric' ? 'KDV Hariç Tutar (₺)' : 'KDV Dahil Tutar (₺)'}
          </label>
          <input
            id="kdv-tutar"
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={tutar}
            onChange={e => setTutar(e.target.value.replace(/[^\d.,]/g, ''))}
            placeholder="0,00"
          />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>KDV Oranı</span>
          <div className={styles.pillRow}>
            {KDV_ORANLARI.map(o => (
              <button
                key={o}
                type="button"
                className={`${styles.pill} ${oran === o ? styles.pillActive : ''}`}
                onClick={() => setOran(o)}
              >%{o}</button>
            ))}
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              className={styles.input}
              style={{ maxWidth: 100, padding: '8px 12px' }}
              value={oran}
              onChange={e => setOran(Number(e.target.value) || 0)}
              aria-label="Özel KDV oranı"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className={styles.summaryGrid}>
          <Summary tone="muted"   label="Matrah (KDV Hariç)" value={formatTRY(result.matrah)} />
          <Summary tone="warn"    label={`KDV (%${oran})`}    value={formatTRY(result.kdv)} />
          <Summary tone="primary" label="Brüt (KDV Dahil)"    value={formatTRY(result.brut)} />
        </div>
      )}

      <p className={styles.note}>
        <strong>Bilgi:</strong> Türkiye’de standart KDV oranı %20’dir. Gıda, ilaç, eğitim
        ve bazı temel ürünlerde indirimli oran %10, temel gıda gibi belirli mallarda %1
        uygulanır. Sektörel istisnalar için Hazine ve Maliye Bakanlığı tebliğlerini
        kontrol ediniz.
      </p>
    </div>
  );
}

function Summary({ tone, label, value }) {
  return (
    <div className={`${styles.summary} ${styles[`tone_${tone}`] || ''}`}>
      <span className={styles.summaryLabel}>{label}</span>
      <span className={styles.summaryValue}>{value}</span>
    </div>
  );
}
