/**
 * Türkçe lokalizasyonlu sayı / para formatlayıcılar.
 */

const trMoney = new Intl.NumberFormat('tr-TR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const trMoney4 = new Intl.NumberFormat('tr-TR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

const trInt = new Intl.NumberFormat('tr-TR');

export function formatTRY(v) {
  if (v == null || !Number.isFinite(v)) return '—';
  return `${trMoney.format(v)} ₺`;
}

export function formatNumber(v, opts) {
  if (v == null || !Number.isFinite(v)) return '—';
  if (opts?.smart) {
    const abs = Math.abs(v);
    if (abs >= 100) return trMoney.format(v);
    return trMoney4.format(v);
  }
  return trMoney.format(v);
}

export function formatPercent(v) {
  if (v == null || !Number.isFinite(v)) return '—';
  const sign = v > 0 ? '+' : '';
  return `${sign}${v.toFixed(2).replace('.', ',')}%`;
}

export function formatInt(v) {
  if (v == null || !Number.isFinite(v)) return '—';
  return trInt.format(Math.round(v));
}

/** "1.234,56" veya "1234.56" → 1234.56 */
export function parseTrNumber(s) {
  if (typeof s === 'number') return s;
  if (s == null || s === '') return null;
  const cleaned = String(s).replace(/\s/g, '').replace(/\./g, '').replace(',', '.');
  const v = parseFloat(cleaned);
  return Number.isFinite(v) ? v : null;
}
