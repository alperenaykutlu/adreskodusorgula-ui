/**
 * Yerel Adres Mock Verisi
 * Sunucu erişimi olmadığında ya da geliştirme modunda kullanılır.
 * Gerçek API entegrasyonunda addressService.js içindeki USE_LOCAL flag'ini kaldır.
 */

export const ADDRESS_LOCAL = {
  iller: [
    { id: '34', ad: 'İSTANBUL' },
    { id: '06', ad: 'ANKARA' },
    { id: '35', ad: 'İZMİR' },
    { id: '01', ad: 'ADANA' },
    { id: '16', ad: 'BURSA' },
    { id: '07', ad: 'ANTALYA' },
    { id: '27', ad: 'GAZİANTEP' },
    { id: '42', ad: 'KONYA' },
    { id: '55', ad: 'SAMSUN' },
    { id: '25', ad: 'ERZURUM' },
  ],

  ilceler: {
    '34': [
      { id: '3407', ad: 'BAKIRKÖY' },   { id: '3410', ad: 'BEŞİKTAŞ' },
      { id: '3413', ad: 'BEYOĞLU' },    { id: '3420', ad: 'FATİH' },
      { id: '3423', ad: 'KADIKÖY' },    { id: '3424', ad: 'KAĞITHANE' },
      { id: '3425', ad: 'KARTAL' },     { id: '3427', ad: 'MALTEPE' },
      { id: '3428', ad: 'PENDİK' },     { id: '3430', ad: 'SARIYER' },
      { id: '3432', ad: 'ŞİŞLİ' },     { id: '3435', ad: 'TUZLA' },
      { id: '3436', ad: 'ÜMRANİYE' },  { id: '3437', ad: 'ÜSKÜDAR' },
      { id: '3405', ad: 'BAĞCILAR' },   { id: '3408', ad: 'BAŞAKŞEHİR' },
    ],
    '06': [
      { id: '0607', ad: 'ÇANKAYA' },    { id: '0617', ad: 'KEÇİÖREN' },
      { id: '0619', ad: 'MAMAK' },      { id: '0625', ad: 'YENİMAHALLE' },
      { id: '0623', ad: 'SİNCAN' },     { id: '0610', ad: 'ETİMESGUT' },
      { id: '0612', ad: 'GÖLBAŞI' },   { id: '0622', ad: 'PURSAKLAR' },
    ],
    '35': [
      { id: '3506', ad: 'BORNOVA' },    { id: '3507', ad: 'BUCA' },
      { id: '3515', ad: 'KARŞIYAKA' }, { id: '3519', ad: 'KONAK' },
      { id: '3504', ad: 'BAYRAKLI' },  { id: '3502', ad: 'BALÇOVA' },
      { id: '3522', ad: 'NARLIDERE' }, { id: '3528', ad: 'URLA' },
    ],
    '42': [
      { id: '4221', ad: 'KARATAY' },   { id: '4223', ad: 'MERAM' },
      { id: '4225', ad: 'SELÇUKLU' },  { id: '4205', ad: 'BEYŞEHİR' },
      { id: '4214', ad: 'EREĞLİ' },   { id: '4226', ad: 'SEYDİŞEHİR' },
    ],
    '07': [
      { id: '0703', ad: 'ALANYA' },    { id: '0713', ad: 'KEPEZ' },
      { id: '0714', ad: 'KONYAALTI' },{ id: '0718', ad: 'MURATPAŞA' },
      { id: '0717', ad: 'MANAVGAT' }, { id: '0719', ad: 'SERİK' },
    ],
    DEFAULT: [{ id: 'D01', ad: 'MERKEZ' }],
  },

  bucaklar: {
    '3423': [{ id: 'B3423_1', ad: 'MERKEZ BUCAĞI' }, { id: 'B3423_2', ad: 'KADIKÖY BUCAĞI' }],
    '3410': [{ id: 'B3410_1', ad: 'BEŞİKTAŞ MERKEZ' }],
    '0607': [{ id: 'B0607_1', ad: 'ÇANKAYA MERKEZ' }, { id: 'B0607_2', ad: 'SAĞLIK BUCAĞI' }],
    '3506': [{ id: 'B3506_1', ad: 'BORNOVA MERKEZ' }, { id: 'B3506_2', ad: 'DOĞANLAR BUCAĞI' }],
    DEFAULT: [{ id: 'BDEF_1', ad: 'MERKEZ BUCAĞI' }, { id: 'BDEF_2', ad: 'BAĞLI KÖYLER' }],
  },

  koyler: {
    'B3423_1': [{ id: 'K3423_1', ad: 'MERKEZ' }, { id: 'K3423_2', ad: 'FENERYOLU' }],
    'B3423_2': [{ id: 'K3423_3', ad: 'MODA' }, { id: 'K3423_4', ad: 'CAFERAĞA' }],
    'B3410_1': [{ id: 'K3410_1', ad: 'MERKEZ' }, { id: 'K3410_2', ad: 'LEVENT' }],
    DEFAULT:   [{ id: 'KDEF_1', ad: 'MERKEZ' }, { id: 'KDEF_2', ad: 'YENİ BELDE' }],
  },

  mahalleler: {
    'K3423_1': [
      { id: 'M3423_1', ad: 'MODA MAHALLESİ' },
      { id: 'M3423_2', ad: 'BAHARIYE MAHALLESİ' },
      { id: 'M3423_3', ad: 'CAFERAĞA MAHALLESİ' },
    ],
    'K3423_2': [{ id: 'M3423_4', ad: 'FENERYOLU MAHALLESİ' }, { id: 'M3423_5', ad: 'GÖZTEPE MAHALLESİ' }],
    'K3423_3': [{ id: 'M3423_6', ad: 'MODA MAHALLESİ' }, { id: 'M3423_7', ad: 'SUADİYE MAHALLESİ' }],
    'K3410_1': [{ id: 'M3410_1', ad: 'BEBEK MAHALLESİ' }, { id: 'M3410_2', ad: 'KURUÇEŞME MAHALLESİ' }],
    'K3410_2': [{ id: 'M3410_3', ad: 'LEVENT MAHALLESİ' }, { id: 'M3410_4', ad: '1. LEVENT MAHALLESİ' }],
    DEFAULT: [
      { id: 'MDEF_1', ad: 'MERKEZ MAHALLESİ' },
      { id: 'MDEF_2', ad: 'YENİ MAHALLESİ' },
      { id: 'MDEF_3', ad: 'ATATÜRK MAHALLESİ' },
      { id: 'MDEF_4', ad: 'CUMHURİYET MAHALLESİ' },
    ],
  },

  caddeSokaklar: {
    'M3423_1': [
      { id: 'C3423_1', ad: 'MODA CADDESİ' },
      { id: 'C3423_2', ad: 'RIHTIM CADDESİ' },
      { id: 'C3423_3', ad: 'BAHARIYE CADDESİ' },
    ],
    'M3423_2': [{ id: 'C3423_4', ad: 'İSTİKLAL CADDESİ' }],
    DEFAULT: [
      { id: 'CDEF_1', ad: 'ATATÜRK CADDESİ' },
      { id: 'CDEF_2', ad: 'CUMHURİYET CADDESİ' },
      { id: 'CDEF_3', ad: 'İNÖNÜ SOKAĞI' },
      { id: 'CDEF_4', ad: 'BARIŞ SOKAĞI' },
      { id: 'CDEF_5', ad: 'LİMAN CADDESİ' },
    ],
  },
};

/** Helper: anahtar bulunmazsa DEFAULT döner */
export function localLookup(map, key) {
  return map[key] ?? map['DEFAULT'] ?? [];
}

/** Kapı numaraları listesi */
export function buildKapiList(n) {
  return Array.from({ length: n }, (_, i) => String(i + 1));
}

/** Mock UAVT kodu üretici — deterministik, tekrar edilebilir */
export function mockUAVT(adres) {
  const seed = Object.values(adres).filter(Boolean).join('');
  const hash = seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const ts   = Date.now().toString().slice(-8);
  const uavtCode = `TR${ts}${String(hash % 10000).padStart(4, '0')}`;
  const binaCode = `BN${Math.random().toString(36).toUpperCase().slice(2, 10)}`;
  return { uavtCode, binaCode };
}
