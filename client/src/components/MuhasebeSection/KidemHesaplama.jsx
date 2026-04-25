import { useMemo, useState } from 'react';
import { formatTRY, parseTrNumber } from '../../utils/format';
import styles from './Calc.module.css';

/* 2025 1. dönem (Ocak-Haziran) kıdem tazminatı tavanı */
const KIDEM_TAVAN = 41_828.42;
const DAMGA_RATE  = 0.00759;

/* İş Kanunu m. 17 → ihbar süreleri (hafta) */
const IHBAR_HAFTA = [
  { minAy:   0, maxAy:   6, hafta: 2 },
  { minAy:   6, maxAy:  18, hafta: 4 },
  { minAy:  18, maxAy:  36, hafta: 6 },
  { minAy:  36, maxAy: Infinity, hafta: 8 },
];

function ihbaraGoreHafta(toplamAy) {
  return IHBAR_HAFTA.find(b => toplamAy >= b.minAy && toplamAy < b.maxAy)?.hafta ?? 8;
}

function diffYearsMonthsDays(start, end) {
  if (!(start instanceof Date) || !(end instanceof Date) || isNaN(start) || isNaN(end) || end < start) {
    return null;
  }
  let y = end.getFullYear() - start.getFullYear();
  let m = end.getMonth() - start.getMonth();
  let d = end.getDate() - start.getDate();
  if (d < 0) {
    m -= 1;
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    d += lastMonth;
  }
  if (m < 0) { y -= 1; m += 12; }
  return { y, m, d };
}

function totalDays(start, end) {
  const ms = end.getTime() - start.getTime();
  return ms / (1000 * 60 * 60 * 24);
}

export default function KidemHesaplama() {
  const [bruteAy, setBruteAy]   = useState('60000');
  const [iseGiris, setIseGiris] = useState('2020-01-01');
  const [isCikis, setIsCikis]   = useState(new Date().toISOString().slice(0, 10));

  const result = useMemo(() => {
    const brut = parseTrNumber(bruteAy);
    const start = new Date(iseGiris);
    const end   = new Date(isCikis);
    if (brut == null || brut <= 0) return null;
    const ymd = diffYearsMonthsDays(start, end);
    if (!ymd) return null;
    const tdays = totalDays(start, end);
    if (tdays <= 0) return null;

    // Kıdem: yıl başına 30 günlük brüt ücret. Yıl + ay + gün hassasiyetiyle orantılı.
    // Ay 30, yıl 365 gün varsayımı standart pratik
    const yilKesir = tdays / 365.25;
    // Tavan uygulanır
    const kidemBrutAyl = Math.min(brut, KIDEM_TAVAN);
    const kidemBrut = kidemBrutAyl * yilKesir;
    const kidemDamga = kidemBrut * DAMGA_RATE;
    const kidemNet = kidemBrut - kidemDamga;
    const tavanUygulandi = brut > KIDEM_TAVAN;

    // İhbar: çalışma süresine göre haftalık brüt
    const toplamAy = ymd.y * 12 + ymd.m + ymd.d / 30;
    const ihbarHafta = ihbaraGoreHafta(toplamAy);
    // Haftalık brüt = aylık brüt / 30 × 7
    const gunlukBrut = brut / 30;
    const ihbarBrut = gunlukBrut * 7 * ihbarHafta;
    // İhbarda gelir vergisi de kesilir, basit yaklaşımla %15 + damga
    const ihbarGV = ihbarBrut * 0.15;
    const ihbarDamga = ihbarBrut * DAMGA_RATE;
    const ihbarNet = ihbarBrut - ihbarGV - ihbarDamga;

    return {
      ymd, tdays, yilKesir,
      kidemBrutAyl, kidemBrut, kidemDamga, kidemNet, tavanUygulandi,
      ihbarHafta, gunlukBrut, ihbarBrut, ihbarGV, ihbarDamga, ihbarNet,
    };
  }, [bruteAy, iseGiris, isCikis]);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.h2}>Kıdem & İhbar Tazminatı Hesaplayıcı</h2>
      <p className={styles.lede}>
        İşe giriş - işten çıkış tarihinizi ve son brüt ücretinizi girin; iş kanunu
        kapsamında hak edilen kıdem ve ihbar tazminatı tutarlarını birlikte hesaplayın.
        Kıdem tazminatı tavanı 2025 dönemine göre uygulanır.
      </p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="kid-brut">Aylık Brüt Ücret (₺)</label>
          <input
            id="kid-brut"
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={bruteAy}
            onChange={e => setBruteAy(e.target.value.replace(/[^\d.,]/g, ''))}
            placeholder="0,00"
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="kid-giris">İşe Giriş</label>
          <input
            id="kid-giris"
            className={styles.input}
            type="date"
            value={iseGiris}
            onChange={e => setIseGiris(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="kid-cikis">İşten Çıkış</label>
          <input
            id="kid-cikis"
            className={styles.input}
            type="date"
            value={isCikis}
            onChange={e => setIsCikis(e.target.value)}
          />
        </div>
      </div>

      {result && (
        <>
          <div className={styles.summaryGrid}>
            <Summary tone="muted" label="Çalışma Süresi"
              value={`${result.ymd.y} yıl ${result.ymd.m} ay ${result.ymd.d} gün`} />
            <Summary tone="primary" label="Kıdem Tazminatı (Net)" value={formatTRY(result.kidemNet)} />
            <Summary tone="success" label="İhbar Tazminatı (Net)"  value={formatTRY(result.ihbarNet)} />
            <Summary tone="warn"    label="Toplam Net Tazminat"
              value={formatTRY(result.kidemNet + result.ihbarNet)} />
          </div>

          <div className={styles.tableWrap}>
            <h3 className={styles.tableTitle}>Kıdem Tazminatı Detayı</h3>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th>Kıdem Hesaplamasına Esas Aylık Brüt</th>
                  <td>{formatTRY(result.kidemBrutAyl)}</td>
                </tr>
                {result.tavanUygulandi && (
                  <tr>
                    <th>Uygulanan Kıdem Tavanı (2025)</th>
                    <td>{formatTRY(KIDEM_TAVAN)}</td>
                  </tr>
                )}
                <tr>
                  <th>Hizmet Süresi (yıl olarak)</th>
                  <td>{result.yilKesir.toFixed(4).replace('.', ',')} yıl</td>
                </tr>
                <tr>
                  <th>Kıdem Tazminatı Brüt</th>
                  <td>{formatTRY(result.kidemBrut)}</td>
                </tr>
                <tr>
                  <th>Damga Vergisi (‰7,59)</th>
                  <td>{formatTRY(result.kidemDamga)}</td>
                </tr>
                <tr className={styles.rowStrong}>
                  <th>Kıdem Tazminatı Net</th>
                  <td>{formatTRY(result.kidemNet)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.tableWrap}>
            <h3 className={styles.tableTitle}>İhbar Tazminatı Detayı</h3>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <th>İhbar Süresi</th>
                  <td>{result.ihbarHafta} hafta</td>
                </tr>
                <tr>
                  <th>Günlük Brüt</th>
                  <td>{formatTRY(result.gunlukBrut)}</td>
                </tr>
                <tr>
                  <th>İhbar Tazminatı Brüt</th>
                  <td>{formatTRY(result.ihbarBrut)}</td>
                </tr>
                <tr>
                  <th>Gelir Vergisi (yaklaşık %15)</th>
                  <td>{formatTRY(result.ihbarGV)}</td>
                </tr>
                <tr>
                  <th>Damga Vergisi (‰7,59)</th>
                  <td>{formatTRY(result.ihbarDamga)}</td>
                </tr>
                <tr className={styles.rowStrong}>
                  <th>İhbar Tazminatı Net</th>
                  <td>{formatTRY(result.ihbarNet)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className={styles.note}>
        <strong>Not:</strong> Kıdem tazminatı yalnızca damga vergisine tabidir. İhbar
        tazminatı ise stopaj ve damga vergisine tabi olup hesaplama gelir vergisi
        diliminin %15 olduğu varsayımı ile yapılmıştır. Asıl tutar; kümülatif vergi
        matrahı, ihbar süresinin daha önce kullanılmış olması veya iş akdinin haklı
        nedenle feshi gibi durumlara göre değişebilir. Kesin hesap için bordro
        uzmanına danışınız.
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
