import { useMemo, useState } from 'react';
import { formatTRY, parseTrNumber } from '../../utils/format';
import styles from './Calc.module.css';

const STOPAJ_RATE = 0.075; // Mevduat stopajı: 6 aya kadar TL mevduat genel oranı (bilgi amaçlı varsayılan)

const PERIYOD = {
  gunluk:  { label: 'Günlük',  perYear: 365 },
  aylik:   { label: 'Aylık',   perYear: 12  },
  uceyrek: { label: '3 Aylık', perYear: 4   },
  yillik:  { label: 'Yıllık',  perYear: 1   },
};

export default function FaizHesaplama() {
  const [mode, setMode]       = useState('bilesik'); // 'basit' | 'bilesik'
  const [anapara, setAnapara] = useState('100000');
  const [oran, setOran]       = useState('45');      // yıllık % faiz
  const [vade, setVade]       = useState('12');      // ay
  const [donem, setDonem]     = useState('aylik');   // bileşiklenme periyodu
  const [stopajKes, setStopajKes] = useState(false);

  const result = useMemo(() => {
    const P = parseTrNumber(anapara);
    const r = parseTrNumber(oran);
    const tAy = parseTrNumber(vade);
    if (P == null || r == null || tAy == null || P <= 0 || tAy <= 0) return null;

    const yillikOran = r / 100;
    const tYil = tAy / 12;

    let brutFaiz, schedule = [];
    if (mode === 'basit') {
      brutFaiz = P * yillikOran * tYil;
      // Tablo: ay bazında lineer
      const aylikFaiz = P * yillikOran / 12;
      for (let i = 1; i <= Math.min(tAy, 60); i++) {
        schedule.push({
          period: `${i}. ay`,
          faiz:   aylikFaiz,
          birikim: P + aylikFaiz * i,
        });
      }
    } else {
      const n = PERIYOD[donem].perYear;
      const totalPeriods = Math.round(tYil * n);
      const perRate = yillikOran / n;
      const final = P * Math.pow(1 + perRate, totalPeriods);
      brutFaiz = final - P;

      let acc = P;
      for (let i = 1; i <= Math.min(totalPeriods, 60); i++) {
        const f = acc * perRate;
        acc += f;
        schedule.push({
          period: `${i}. ${PERIYOD[donem].label.toLowerCase()}`,
          faiz: f,
          birikim: acc,
        });
      }
    }

    const stopaj = stopajKes ? brutFaiz * STOPAJ_RATE : 0;
    const netFaiz = brutFaiz - stopaj;
    const toplam  = P + netFaiz;

    return { P, brutFaiz, stopaj, netFaiz, toplam, schedule };
  }, [mode, anapara, oran, vade, donem, stopajKes]);

  return (
    <div className={styles.wrap}>
      <h2 className={styles.h2}>Basit & Bileşik Faiz Hesaplayıcı</h2>
      <p className={styles.lede}>
        Mevduat, vadeli hesap ya da kredi simülasyonu için anapara, yıllık faiz oranı
        ve vade üzerinden basit veya bileşik faiz tutarınızı hesaplayın. Bileşik
        modda dönem (günlük, aylık, üç aylık, yıllık) seçilebilir; isterseniz mevduat
        stopajını da otomatik düşürün.
      </p>

      <div className={styles.form}>
        <div className={styles.field}>
          <span className={styles.label}>Faiz Türü</span>
          <div className={styles.toggle} role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'basit'}
              className={`${styles.toggleBtn} ${mode === 'basit' ? styles.toggleActive : ''}`}
              onClick={() => setMode('basit')}
            >Basit Faiz</button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'bilesik'}
              className={`${styles.toggleBtn} ${mode === 'bilesik' ? styles.toggleActive : ''}`}
              onClick={() => setMode('bilesik')}
            >Bileşik Faiz</button>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fz-anapara">Anapara (₺)</label>
          <input
            id="fz-anapara"
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={anapara}
            onChange={e => setAnapara(e.target.value.replace(/[^\d.,]/g, ''))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fz-oran">Yıllık Faiz (%)</label>
          <input
            id="fz-oran"
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={oran}
            onChange={e => setOran(e.target.value.replace(/[^\d.,]/g, ''))}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fz-vade">Vade (ay)</label>
          <input
            id="fz-vade"
            className={styles.input}
            type="text"
            inputMode="decimal"
            value={vade}
            onChange={e => setVade(e.target.value.replace(/[^\d.,]/g, ''))}
          />
        </div>

        {mode === 'bilesik' && (
          <div className={styles.field}>
            <label className={styles.label} htmlFor="fz-donem">Bileşiklenme Dönemi</label>
            <select
              id="fz-donem"
              className={styles.select}
              value={donem}
              onChange={e => setDonem(e.target.value)}
            >
              {Object.entries(PERIYOD).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>
        )}

        <div className={styles.field}>
          <span className={styles.label}>Stopaj</span>
          <label className={styles.toggle} style={{ cursor: 'pointer' }}>
            <span
              className={`${styles.toggleBtn} ${!stopajKes ? styles.toggleActive : ''}`}
              onClick={() => setStopajKes(false)}
            >Stopaj Yok</span>
            <span
              className={`${styles.toggleBtn} ${stopajKes ? styles.toggleActive : ''}`}
              onClick={() => setStopajKes(true)}
            >Stopaj Düş (%7,5)</span>
          </label>
        </div>
      </div>

      {result && (
        <>
          <div className={styles.summaryGrid}>
            <Summary tone="muted"   label="Anapara"           value={formatTRY(result.P)} />
            <Summary tone="warn"    label="Brüt Faiz Geliri"  value={formatTRY(result.brutFaiz)} />
            {stopajKes && (
              <Summary tone="muted" label="Stopaj (%7,5)"    value={formatTRY(result.stopaj)} />
            )}
            <Summary tone="success" label="Net Faiz Geliri"   value={formatTRY(result.netFaiz)} />
            <Summary tone="primary" label="Vade Sonu Toplam"  value={formatTRY(result.toplam)} />
          </div>

          <div className={`${styles.tableWrap} ${styles.compact}`}>
            <h3 className={styles.tableTitle}>Dönemsel Birikim Tablosu</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Dönem</th>
                  <th style={{ textAlign: 'right' }}>Bu Dönem Faiz</th>
                  <th style={{ textAlign: 'right' }}>Birikim</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row, i) => (
                  <tr key={i}>
                    <th scope="row" style={{ fontWeight: 500 }}>{row.period}</th>
                    <td>{formatTRY(row.faiz)}</td>
                    <td>{formatTRY(row.birikim)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className={styles.note}>
        <strong>Not:</strong> Hesaplama formüllerdir, banka bazında günlük baz
        (ACT/360 veya ACT/365) farkları, hesap işletim ücretleri ve özel kampanya
        oranları nedeniyle gerçekleşen tutarda küçük sapmalar olabilir. Mevduat
        stopaj oranları vade ve hesabın türüne göre değişir; varsayılan %7,5
        sadece bilgi amaçlıdır.
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
