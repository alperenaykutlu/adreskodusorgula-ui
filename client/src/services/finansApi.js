/**
 * Finans Api — truncgil.com canlı döviz, altın ve gümüş kaynağı.
 * Yanıt yapısı: { Update_Date, USD: {Alış, Satış, Tür, Değişim}, ... }
 * Türkçe ondalık (virgül) ve binlik (nokta) ayrılmış string değerler döner;
 * burada sayıya parse edilmiş normalize bir kayıt setine dönüştürülür.
 */

const DIRECT_ENDPOINT = 'https://finans.truncgil.com/today.json';

/**
 * CORS engellerini aşmak için sırayla denenecek kaynaklar.
 * İlk başarılı yanıt kullanılır. Public CORS proxyler bazen yavaş veya
 * geçici olarak kapalı olabilir; bu yüzden çoklu fallback gerekli.
 */
const ENDPOINTS = [
  // Doğrudan (CORS izni varsa en hızlısı)
  (cb) => `${DIRECT_ENDPOINT}?_=${cb}`,
  // corsproxy.io (raw passthrough)
  (cb) => `https://corsproxy.io/?${encodeURIComponent(`${DIRECT_ENDPOINT}?_=${cb}`)}`,
  // allorigins raw passthrough
  (cb) => `https://api.allorigins.win/raw?url=${encodeURIComponent(`${DIRECT_ENDPOINT}?_=${cb}`)}`,
  // codetabs
  (cb) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(`${DIRECT_ENDPOINT}?_=${cb}`)}`,
];

/* ── Görünür/seçilebilir varlıklar ─────────────────────── */

export const FIAT_LIST = [
  { code: 'USD', name: 'ABD Doları',     flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro',           flag: '🇪🇺' },
  { code: 'GBP', name: 'İngiliz Sterlini', flag: '🇬🇧' },
  { code: 'CHF', name: 'İsviçre Frangı',   flag: '🇨🇭' },
  { code: 'JPY', name: 'Japon Yeni',     flag: '🇯🇵' },
  { code: 'CAD', name: 'Kanada Doları',  flag: '🇨🇦' },
  { code: 'AUD', name: 'Avustralya Doları', flag: '🇦🇺' },
  { code: 'CNY', name: 'Çin Yuanı',      flag: '🇨🇳' },
  { code: 'RUB', name: 'Rus Rublesi',    flag: '🇷🇺' },
  { code: 'SAR', name: 'Suudi Riyali',   flag: '🇸🇦' },
  { code: 'AED', name: 'BAE Dirhemi',    flag: '🇦🇪' },
  { code: 'SEK', name: 'İsveç Kronu',    flag: '🇸🇪' },
  { code: 'NOK', name: 'Norveç Kronu',   flag: '🇳🇴' },
  { code: 'DKK', name: 'Danimarka Kronu', flag: '🇩🇰' },
  { code: 'KRW', name: 'Güney Kore Wonu', flag: '🇰🇷' },
  { code: 'AZN', name: 'Azerbaycan Manatı', flag: '🇦🇿' },
];

export const GOLD_LIST = [
  { code: 'gram-altin',          name: 'Gram Altın' },
  { code: 'gram-has-altin',      name: 'Gram Has Altın' },
  { code: 'ceyrek-altin',        name: 'Çeyrek Altın' },
  { code: 'yarim-altin',         name: 'Yarım Altın' },
  { code: 'tam-altin',           name: 'Tam Altın' },
  { code: 'ikibucuk-altin',      name: 'İkibuçuk Altın' },
  { code: 'besli-altin',         name: 'Beşli Altın' },
  { code: 'gremse-altin',        name: 'Gremse Altın' },
  { code: 'cumhuriyet-altini',   name: 'Cumhuriyet Altını' },
  { code: 'ata-altin',           name: 'Ata Altın' },
  { code: 'resat-altin',         name: 'Reşat Altını' },
  { code: 'hamit-altin',         name: 'Hamit Altını' },
  { code: '14-ayar-altin',       name: '14 Ayar Altın' },
  { code: '18-ayar-altin',       name: '18 Ayar Altın' },
  { code: '22-ayar-bilezik',     name: '22 Ayar Bilezik' },
  { code: 'ons',                 name: 'Ons Altın (USD)' },
];

export const SILVER_LIST = [
  { code: 'gumus',         name: 'Gram Gümüş' },
  { code: 'gram-platin',   name: 'Gram Platin' },
  { code: 'gram-paladyum', name: 'Gram Paladyum' },
];

/* Birim dönüşümü için her varlığın TRY karşılığında "1 adet" değeri kabul edilir.
   Türk Lirası (TRY) için referans 1.0 (kendisi) sayılacak. */
export const TRY_ASSET = { code: 'TRY', name: 'Türk Lirası', flag: '🇹🇷' };

/* ── Yardımcılar ───────────────────────────────────────── */

function trNumberToFloat(s) {
  if (typeof s === 'number') return s;
  if (!s) return null;
  // "44.135,72" → "44135.72"
  const cleaned = String(s).replace(/\./g, '').replace(',', '.').replace(/[^\d.\-]/g, '');
  const v = parseFloat(cleaned);
  return Number.isFinite(v) ? v : null;
}

function trChangeToNumber(s) {
  if (!s) return 0;
  // "%0,19" veya "-%0,12" gibi
  const sign = String(s).trim().startsWith('-') ? -1 : 1;
  const cleaned = String(s).replace(/[%\-\+\s]/g, '').replace(',', '.');
  const v = parseFloat(cleaned);
  return Number.isFinite(v) ? sign * v : 0;
}

function normalize(json) {
  const out = { updatedAt: json.Update_Date || null, items: {} };
  for (const [code, raw] of Object.entries(json)) {
    if (code === 'Update_Date' || !raw || typeof raw !== 'object') continue;
    const buy  = trNumberToFloat(raw['Alış'] ?? raw['Alis'] ?? raw.buying);
    const sell = trNumberToFloat(raw['Satış'] ?? raw['Satis'] ?? raw.selling);
    const change = trChangeToNumber(raw['Değişim'] ?? raw['Degisim'] ?? raw.change);
    out.items[code] = {
      code,
      buying:  buy,
      selling: sell,
      // ortalama, dönüşümlerde kullanılır
      mid:     buy != null && sell != null ? (buy + sell) / 2 : (sell ?? buy),
      change,
      type:    raw['Tür'] ?? raw['Tur'] ?? raw.type ?? null,
    };
  }
  return out;
}

/* ── Public API ─────────────────────────────────────────── */

async function tryFetchOnce(url, signal) {
  const res = await fetch(url, {
    signal,
    cache: 'no-store',
    headers: { 'Accept': 'application/json' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  // Bazı proxyler text/plain döner; her durumda JSON'a parse et
  const text = await res.text();
  return JSON.parse(text);
}

export async function fetchFinans({ signal } = {}) {
  const cb = Date.now();
  const errors = [];

  for (const buildUrl of ENDPOINTS) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const url = buildUrl(cb);
    try {
      const json = await tryFetchOnce(url, signal);
      const normalized = normalize(json);
      normalized.fetchedAt = new Date();
      normalized.source = url.includes('truncgil.com') && !url.includes('proxy')
        ? 'direct'
        : new URL(url).host;
      return normalized;
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      errors.push(`${new URL(url).host}: ${err.message}`);
    }
  }

  throw new Error(`Finans servisine erişilemedi. Denenen kaynaklar: ${errors.join(' | ')}`);
}
