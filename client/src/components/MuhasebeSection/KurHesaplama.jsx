import { useEffect, useMemo, useRef, useState } from 'react';
import {
  fetchFinans,
  FIAT_LIST,
  GOLD_LIST,
  SILVER_LIST,
  TRY_ASSET,
} from '../../services/finansApi';
import {
  formatNumber,
  formatPercent,
  formatTRY,
  parseTrNumber,
} from '../../utils/format';
import styles from './KurHesaplama.module.css';

/* ── Birleşik varlık listesi (TRY dahil) ─────────────────── */
const ALL_ASSETS = [
  { ...TRY_ASSET, group: 'fiat' },
  ...FIAT_LIST.map(a => ({ ...a, group: 'fiat' })),
  ...GOLD_LIST.map(a => ({ ...a, group: 'gold' })),
  ...SILVER_LIST.map(a => ({ ...a, group: 'silver' })),
];

const REFRESH_MS = 60_000; // 60 sn'de bir otomatik yenile

/**
 * Bir varlığın TRY karşılığında (ortalama) "1 birim" değeri.
 * TRY için 1 döner. Bilinmeyen / yüklenmemiş varlık için null.
 */
function tryRate(items, code) {
  if (code === 'TRY') return 1;
  const it = items?.[code];
  return it?.mid ?? null;
}

export default function KurHesaplama() {
  const [data, setData]       = useState(null);   // { updatedAt, items }
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const [from,   setFrom]   = useState('USD');
  const [to,     setTo]     = useState('TRY');
  const [amount, setAmount] = useState('1');

  const abortRef = useRef(null);

  const load = () => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    setLoading(true);
    setError(null);
    fetchFinans({ signal: ctrl.signal })
      .then(d => { setData(d); setLoading(false); })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Bir hata oluştu');
        setLoading(false);
      });
  };

  useEffect(() => {
    load();
    const t = setInterval(load, REFRESH_MS);
    return () => { clearInterval(t); abortRef.current?.abort(); };
  }, []);

  /* ── Dönüşüm hesabı ─────────────────────────────────────── */
  const conversion = useMemo(() => {
    const amt = parseTrNumber(amount);
    if (amt == null || !data) return null;
    const fromRate = tryRate(data.items, from);
    const toRate   = tryRate(data.items, to);
    if (fromRate == null || toRate == null || toRate === 0) return null;
    const inTry = amt * fromRate;
    const result = inTry / toRate;
    return { amt, inTry, result, fromRate, toRate };
  }, [amount, from, to, data]);

  const swap = () => { setFrom(to); setTo(from); };

  /* ── Render yardımcıları ────────────────────────────────── */
  const renderOptions = () => {
    const groups = [
      { label: 'Para Birimleri', items: [TRY_ASSET, ...FIAT_LIST] },
      { label: 'Altın',          items: GOLD_LIST },
      { label: 'Gümüş & Değerli Metal', items: SILVER_LIST },
    ];
    return groups.map(g => (
      <optgroup key={g.label} label={g.label}>
        {g.items.map(a => (
          <option key={a.code} value={a.code}>
            {a.flag ? `${a.flag} ` : ''}{a.code} — {a.name}
          </option>
        ))}
      </optgroup>
    ));
  };

  const fromAsset = ALL_ASSETS.find(a => a.code === from);
  const toAsset   = ALL_ASSETS.find(a => a.code === to);

  return (
    <div className={styles.wrap}>
      {/* ── Üst Bilgi Çubuğu ─────────────────────────────── */}
      <div className={styles.topBar}>
        <div>
          <h2 className={styles.h2}>Döviz, Altın & Gümüş Hesaplayıcı</h2>
          <p className={styles.lede}>
            Türkiye finans piyasalarından canlı veri ile dünya çapında en çok kullanılan
            para birimleri, altın türleri (gram, çeyrek, yarım, tam, cumhuriyet, ata,
            22 ayar bilezik, ons), gümüş ve diğer değerli metaller arasında dönüşüm yapın.
          </p>
        </div>
        <div className={styles.statusGroup}>
          <span className={`${styles.dot} ${error ? styles.dotErr : loading ? styles.dotWait : styles.dotOk}`} />
          <span className={styles.statusText}>
            {error
              ? 'Bağlantı hatası'
              : loading
                ? (data ? 'Yenileniyor…' : 'Veriler yükleniyor…')
                : data?.fetchedAt
                  ? `Son alındı: ${data.fetchedAt.toLocaleTimeString('tr-TR')}`
                  : data?.updatedAt
                    ? `Güncel: ${data.updatedAt}`
                    : 'Hazır'}
          </span>
          <button
            type="button"
            className={styles.refreshBtn}
            onClick={load}
            disabled={loading}
            aria-label="Verileri yenile"
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className={loading ? styles.spin : ''}
            >
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            {loading ? 'Yenileniyor' : 'Yenile'}
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.alert} role="alert">
          {error} — verileri tekrar denemek için “Yenile”ye tıklayın.
        </div>
      )}

      {/* ── Dönüşüm Paneli ───────────────────────────────── */}
      <div className={styles.converter}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="kur-amount">Miktar</label>
          <input
            id="kur-amount"
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={e => setAmount(e.target.value.replace(/[^\d.,]/g, ''))}
            placeholder="0,00"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="kur-from">Bu birimden</label>
          <select id="kur-from" className={styles.select} value={from} onChange={e => setFrom(e.target.value)}>
            {renderOptions()}
          </select>
        </div>

        <button type="button" className={styles.swapBtn} onClick={swap} aria-label="Birimleri değiştir">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
        </button>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="kur-to">Bu birime</label>
          <select id="kur-to" className={styles.select} value={to} onChange={e => setTo(e.target.value)}>
            {renderOptions()}
          </select>
        </div>
      </div>

      {/* ── Sonuç Kartı ──────────────────────────────────── */}
      <div className={styles.resultCard}>
        {conversion ? (
          <>
            <div className={styles.resultEq}>
              <span className={styles.eqAmount}>
                {formatNumber(conversion.amt, { smart: true })} {fromAsset?.code}
              </span>
              <span className={styles.eqEquals}>=</span>
              <span className={styles.eqResult}>
                {formatNumber(conversion.result, { smart: true })} {toAsset?.code}
              </span>
            </div>
            <div className={styles.resultMeta}>
              {from !== 'TRY' && (
                <span>1 {from} = {formatTRY(conversion.fromRate)}</span>
              )}
              {to !== 'TRY' && (
                <span>1 {to} = {formatTRY(conversion.toRate)}</span>
              )}
              {(from !== 'TRY' && to !== 'TRY') && (
                <span>TRY üzerinden çapraz kur ile hesaplanmıştır</span>
              )}
            </div>
          </>
        ) : (
          <div className={styles.resultPlaceholder}>
            {loading ? 'Hesaplanıyor…' : 'Hesaplama için geçerli bir miktar girin.'}
          </div>
        )}
      </div>

      {/* ── Canlı Fiyat Tabloları ────────────────────────── */}
      <PriceTable
        title="Para Birimleri"
        items={FIAT_LIST}
        data={data}
        loading={loading}
      />
      <PriceTable
        title="Altın"
        items={GOLD_LIST}
        data={data}
        loading={loading}
      />
      <PriceTable
        title="Gümüş & Değerli Metaller"
        items={SILVER_LIST}
        data={data}
        loading={loading}
      />

      <p className={styles.disclaimer}>
        Veriler bilgi amaçlıdır ve yatırım tavsiyesi niteliği taşımaz. Gerçek alım-satım
        kurları için bankanız veya kuyumcunuza danışın. Kaynak: finans.truncgil.com
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
function PriceTable({ title, items, data, loading }) {
  return (
    <section className={styles.table}>
      <h3 className={styles.tableTitle}>{title}</h3>
      <div className={styles.tableHead}>
        <span>Varlık</span>
        <span>Alış</span>
        <span>Satış</span>
        <span>Değişim</span>
      </div>
      <ul className={styles.tableBody}>
        {items.map(asset => {
          const it = data?.items?.[asset.code];
          const change = it?.change ?? null;
          const dir = change == null ? 'neutral' : change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';
          return (
            <li key={asset.code} className={styles.row}>
              <span className={styles.rowName}>
                {asset.flag ? <span className={styles.flag}>{asset.flag}</span> : null}
                <span className={styles.rowCode}>{asset.code === 'ons' ? 'XAU' : asset.code.toUpperCase()}</span>
                <span className={styles.rowLabel}>{asset.name}</span>
              </span>
              <span className={styles.rowVal}>
                {it ? formatNumber(it.buying, { smart: true }) : (loading ? '…' : '—')}
              </span>
              <span className={styles.rowVal}>
                {it ? formatNumber(it.selling, { smart: true }) : (loading ? '…' : '—')}
              </span>
              <span className={`${styles.rowChange} ${styles[`chg_${dir}`]}`}>
                {change != null ? formatPercent(change) : '—'}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
