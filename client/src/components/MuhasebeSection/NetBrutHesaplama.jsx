import { useMemo, useState } from 'react';
import { formatTRY, parseTrNumber } from '../../utils/format';
import styles from './NetBrutHesaplama.module.css';

/* ════════════════════════════════════════════════════════════
   2025 TR Bordro Parametreleri
   (Yıllık güncellemelerde sadece bu blok değiştirilmesi yeterlidir.)
   ════════════════════════════════════════════════════════════ */
const TAX_BRACKETS = [
  { upTo: 158_000,    rate: 0.15 },
  { upTo: 330_000,    rate: 0.20 },
  { upTo: 1_200_000,  rate: 0.27 },
  { upTo: 4_300_000,  rate: 0.35 },
  { upTo: Infinity,   rate: 0.40 },
];

const ASGARI_BRUT     = 26_005.50;     // 2025 aylık brüt asgari ücret
const SGK_TAVAN_AYLIK = 195_041.40;    // 2025 SGK tavan aylık (asgari × 7.5)
const SGK_ISCI_RATE      = 0.14;
const ISSIZLIK_ISCI      = 0.01;
const DAMGA_RATE         = 0.00759;
const SGK_ISVEREN_RATE   = 0.155;      // 5 puan indirimli oran
const ISSIZLIK_ISVEREN   = 0.02;

const AY_LIST = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
];

/* ── Hesap mantığı ──────────────────────────────────────── */

function progressiveTax(totalMatrah) {
  let tax = 0;
  let prev = 0;
  for (const b of TAX_BRACKETS) {
    if (totalMatrah <= b.upTo) {
      tax += (totalMatrah - prev) * b.rate;
      return tax;
    }
    tax += (b.upTo - prev) * b.rate;
    prev = b.upTo;
  }
  return tax;
}

function calcFromGross(grossMonthly, monthIndex /* 1..12 */) {
  const sgkBase     = Math.min(grossMonthly, SGK_TAVAN_AYLIK);
  const sgkIsci     = sgkBase * SGK_ISCI_RATE;
  const issizlikIs  = sgkBase * ISSIZLIK_ISCI;
  const matrah      = grossMonthly - sgkIsci - issizlikIs;

  // Aynı brütün her ay tekrarlandığı varsayımıyla kümülatif matrah
  const prevCum     = (monthIndex - 1) * matrah;
  const taxThisMo   = progressiveTax(prevCum + matrah) - progressiveTax(prevCum);

  // Asgari ücret istisnası (Gelir Vergisi)
  const asgariMatr  = ASGARI_BRUT * (1 - SGK_ISCI_RATE - ISSIZLIK_ISCI);
  const asgariGV    = asgariMatr * 0.15;
  const gvOdenecek  = Math.max(0, taxThisMo - asgariGV);

  // Damga vergisi + asgari ücret istisnası
  const damgaHesap  = grossMonthly * DAMGA_RATE;
  const asgariDamga = ASGARI_BRUT * DAMGA_RATE;
  const damgaOden   = Math.max(0, damgaHesap - asgariDamga);

  const totalKesinti = sgkIsci + issizlikIs + gvOdenecek + damgaOden;
  const net          = grossMonthly - totalKesinti;

  // İşveren maliyeti
  const sgkIsveren      = sgkBase * SGK_ISVEREN_RATE;
  const issizlikIsveren = sgkBase * ISSIZLIK_ISVEREN;
  const isverenMaliyet  = grossMonthly + sgkIsveren + issizlikIsveren;

  return {
    gross: grossMonthly,
    sgkIsci, issizlikIs,
    matrah, taxThisMo, asgariGV, gvOdenecek,
    damgaHesap, asgariDamga, damgaOden,
    totalKesinti, net,
    isveren: { sgk: sgkIsveren, issizlik: issizlikIsveren, total: isverenMaliyet },
  };
}

function calcFromNet(netMonthly, monthIndex) {
  // Net → Brüt için binary search
  let lo = netMonthly;
  let hi = Math.max(netMonthly * 3, ASGARI_BRUT * 2);
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    const r = calcFromGross(mid, monthIndex);
    if (r.net > netMonthly) hi = mid; else lo = mid;
  }
  return calcFromGross((lo + hi) / 2, monthIndex);
}

/* ── Bileşen ───────────────────────────────────────────── */

export default function NetBrutHesaplama() {
  const [mode, setMode]       = useState('brut'); // 'brut' veya 'net'
  const [amount, setAmount]   = useState('50000');
  const [month, setMonth]     = useState(1);

  const result = useMemo(() => {
    const v = parseTrNumber(amount);
    if (v == null || v <= 0) return null;
    return mode === 'brut' ? calcFromGross(v, month) : calcFromNet(v, month);
  }, [amount, mode, month]);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.h2}>Net / Brüt / Stopaj Maaş Hesaplayıcı</h2>
      <p className={styles.lede}>
        2025 yılı bordro parametrelerine göre brütten nete veya netten brüte
        hesaplama yapın. Sonuç; SGK işçi payı, işsizlik primi, gelir vergisi
        (asgari ücret istisnası dahil), damga vergisi ve işveren maliyetini
        ayrıntılı şekilde gösterir.
      </p>

      {/* ── Form ─────────────────────────────────────────── */}
      <div className={styles.form}>
        <div className={styles.field}>
          <span className={styles.label}>Hesaplama Yönü</span>
          <div className={styles.toggle} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'brut'}
              className={`${styles.toggleBtn} ${mode === 'brut' ? styles.toggleActive : ''}`}
              onClick={() => setMode('brut')}
            >
              Brüt → Net
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'net'}
              className={`${styles.toggleBtn} ${mode === 'net' ? styles.toggleActive : ''}`}
              onClick={() => setMode('net')}
            >
              Net → Brüt
            </button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="nb-amount">
            {mode === 'brut' ? 'Aylık Brüt Maaş (₺)' : 'Aylık Net Maaş (₺)'}
          </label>
          <input
            id="nb-amount"
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^\d.,]/g, ''))}
            placeholder="0,00"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="nb-month">Hesaplanan Ay</label>
          <select
            id="nb-month"
            className={styles.select}
            value={month}
            onChange={e => setMonth(Number(e.target.value))}
          >
            {AY_LIST.map((ay, i) => (
              <option key={ay} value={i + 1}>{i + 1}. ({ay})</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Sonuç kartları ─────────────────────────────── */}
      {result && (
        <>
          <div className={styles.summaryGrid}>
            <SummaryCard tone="primary" label="Aylık Brüt"        value={formatTRY(result.gross)} />
            <SummaryCard tone="success" label="Aylık Net (Eline Geçen)" value={formatTRY(result.net)} />
            <SummaryCard tone="muted"   label="Toplam Kesinti"    value={formatTRY(result.totalKesinti)} />
            <SummaryCard tone="warn"    label="İşveren Toplam Maliyeti" value={formatTRY(result.isveren.total)} />
          </div>

          {/* Detay tablosu */}
          <div className={styles.tableWrap}>
            <h3 className={styles.tableTitle}>İşçi Kesintileri</h3>
            <Table rows={[
              ['SGK İşçi Payı (%14)',                 result.sgkIsci],
              ['İşsizlik Sigortası İşçi Payı (%1)',   result.issizlikIs],
              ['Gelir Vergisi Matrahı',               result.matrah],
              ['Hesaplanan Gelir Vergisi',            result.taxThisMo],
              ['Asgari Ücret GV İstisnası (-)',       -result.asgariGV],
              ['Ödenecek Gelir Vergisi',              result.gvOdenecek, true],
              ['Hesaplanan Damga Vergisi (‰7,59)',    result.damgaHesap],
              ['Asgari Ücret Damga İstisnası (-)',    -result.asgariDamga],
              ['Ödenecek Damga Vergisi',              result.damgaOden, true],
              ['Toplam Kesinti',                      result.totalKesinti, true],
            ]} />
          </div>

          <div className={styles.tableWrap}>
            <h3 className={styles.tableTitle}>İşveren Maliyeti</h3>
            <Table rows={[
              ['Brüt Maaş',                           result.gross],
              ['SGK İşveren Payı (%15,5 — 5 puan indirimli)', result.isveren.sgk],
              ['İşsizlik Sigortası İşveren Payı (%2)',        result.isveren.issizlik],
              ['Toplam İşveren Maliyeti',             result.isveren.total, true],
            ]} />
          </div>

          {result.gross < ASGARI_BRUT && (
            <div className={styles.warn}>
              Hesaplanan brüt {formatTRY(result.gross)} olup 2025 brüt asgari ücretinin
              ({formatTRY(ASGARI_BRUT)}) altındadır. Pratikte ücret asgari ücretten az olamaz.
            </div>
          )}
        </>
      )}

      <p className={styles.note}>
        <strong>Not:</strong> Hesaplama; sigortalı statüsü 4/A (özel sektör), engellilik veya
        emeklilik (SGDP) durumu olmayan, BES otomatik katılım kesintisi bulunmayan bir
        çalışan için yapılmıştır. SGK işveren payı %15,5 (5 puan teşvik) varsayılmıştır.
        Kümülatif matrah hesabı, aynı brütün yıl boyunca tekrarlandığı varsayımı ile
        yapılır. Yıllık parametre değişiklikleri için bordrocu / SMMM ile teyit ediniz.
      </p>
    </div>
  );
}

/* ── Yardımcı bileşenler ─────────────────────────────────── */

function SummaryCard({ tone, label, value }) {
  return (
    <div className={`${styles.summary} ${styles[`tone_${tone}`]}`}>
      <span className={styles.summaryLabel}>{label}</span>
      <span className={styles.summaryValue}>{value}</span>
    </div>
  );
}

function Table({ rows }) {
  return (
    <table className={styles.table}>
      <tbody>
        {rows.map(([label, value, strong]) => (
          <tr key={label} className={strong ? styles.rowStrong : ''}>
            <th scope="row">{label}</th>
            <td>{formatTRY(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
