/**
 * Türkiye Adres Veri Tabanı — Server Katmanı
 * UAVT benzeri hiyerarşik yapı: il > ilçe > bucak > köy > mahalle > cadde > dış kapı > iç kapı
 * İleride gerçek MERNİS/UAVT API entegrasyonu için bu dosyayı güncelle.
 */

const ADDRESS_DB = {
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
      { id: '3401', ad: 'ADALAR' },
      { id: '3402', ad: 'ARNAVUTKöY' },
      { id: '3403', ad: 'ATAŞEHİR' },
      { id: '3404', ad: 'AVCILAR' },
      { id: '3405', ad: 'BAĞCILAR' },
      { id: '3406', ad: 'BAHÇELİEVLER' },
      { id: '3407', ad: 'BAKIRKÖY' },
      { id: '3408', ad: 'BAŞAKŞEHİR' },
      { id: '3409', ad: 'BAYRAMPAŞA' },
      { id: '3410', ad: 'BEŞİKTAŞ' },
      { id: '3411', ad: 'BEYKOZ' },
      { id: '3412', ad: 'BEYLİKDÜZÜ' },
      { id: '3413', ad: 'BEYOĞLU' },
      { id: '3414', ad: 'BÜYÜKÇEKMECE' },
      { id: '3415', ad: 'ÇATALCA' },
      { id: '3416', ad: 'ÇEKMEKÖY' },
      { id: '3417', ad: 'ESENLER' },
      { id: '3418', ad: 'ESENYURT' },
      { id: '3419', ad: 'EYÜPSULTAN' },
      { id: '3420', ad: 'FATİH' },
      { id: '3421', ad: 'GAZİOSMANPAŞA' },
      { id: '3422', ad: 'GÜNGÖREN' },
      { id: '3423', ad: 'KADIKÖY' },
      { id: '3424', ad: 'KAĞITHANE' },
      { id: '3425', ad: 'KARTAL' },
      { id: '3426', ad: 'KÜÇÜKÇEKMECE' },
      { id: '3427', ad: 'MALTEPE' },
      { id: '3428', ad: 'PENDİK' },
      { id: '3429', ad: 'SANCAKTEPE' },
      { id: '3430', ad: 'SARIYER' },
      { id: '3431', ad: 'ŞİLE' },
      { id: '3432', ad: 'ŞİŞLİ' },
      { id: '3433', ad: 'SULTANBEYLİ' },
      { id: '3434', ad: 'SULTANGAZİ' },
      { id: '3435', ad: 'TUZLA' },
      { id: '3436', ad: 'ÜMRANİYE' },
      { id: '3437', ad: 'ÜSKÜDAR' },
      { id: '3438', ad: 'ZEYTİNBURNU' },
    ],
    '06': [
      { id: '0601', ad: 'AKYURT' },
      { id: '0602', ad: 'ALTINDAĞ' },
      { id: '0603', ad: 'AYAŞ' },
      { id: '0604', ad: 'BALA' },
      { id: '0605', ad: 'BEYPAZARI' },
      { id: '0607', ad: 'ÇANKAYA' },
      { id: '0608', ad: 'ÇUBUK' },
      { id: '0610', ad: 'ETİMESGUT' },
      { id: '0612', ad: 'GÖLBAŞI' },
      { id: '0617', ad: 'KEÇİÖREN' },
      { id: '0619', ad: 'MAMAK' },
      { id: '0622', ad: 'PURSAKLAR' },
      { id: '0623', ad: 'SİNCAN' },
      { id: '0625', ad: 'YENİMAHALLE' },
    ],
    '35': [
      { id: '3501', ad: 'ALİAĞA' },
      { id: '3502', ad: 'BALÇOVA' },
      { id: '3503', ad: 'BAYINDIR' },
      { id: '3504', ad: 'BAYRAKLI' },
      { id: '3505', ad: 'BERGAMA' },
      { id: '3506', ad: 'BORNOVA' },
      { id: '3507', ad: 'BUCA' },
      { id: '3508', ad: 'ÇEŞME' },
      { id: '3515', ad: 'KARŞIYAKA' },
      { id: '3519', ad: 'KONAK' },
      { id: '3522', ad: 'NARLIDERE' },
      { id: '3528', ad: 'URLA' },
    ],
    '42': [
      { id: '4221', ad: 'KARATAY' },
      { id: '4223', ad: 'MERAM' },
      { id: '4225', ad: 'SELÇUKLU' },
      { id: '4203', ad: 'AKŞEHİR' },
      { id: '4205', ad: 'BEYŞEHİR' },
      { id: '4209', ad: 'ÇUMRA' },
      { id: '4214', ad: 'EREĞLİ' },
      { id: '4219', ad: 'ILGIN' },
      { id: '4226', ad: 'SEYDİŞEHİR' },
    ],
    '07': [
      { id: '0703', ad: 'ALANYA' },
      { id: '0705', ad: 'DÖŞEMEALTI' },
      { id: '0706', ad: 'ELMALI' },
      { id: '0713', ad: 'KEPEZ' },
      { id: '0714', ad: 'KONYAALTI' },
      { id: '0717', ad: 'MANAVGAT' },
      { id: '0718', ad: 'MURATPAŞA' },
      { id: '0719', ad: 'SERİK' },
    ],
    DEFAULT: [
      { id: 'D001', ad: 'MERKEZ' },
    ],
  },

  bucaklar: {
    '3423': [{ id: '342301', ad: 'MERKEZ BUCAĞI' }, { id: '342302', ad: 'KADIKÖY BUCAĞI' }],
    '3410': [{ id: '341001', ad: 'MERKEZ BUCAĞI' }, { id: '341002', ad: 'BEŞİKTAŞ BUCAĞI' }],
    '0607': [{ id: '060701', ad: 'ÇANKAYA MERKEZ' }, { id: '060702', ad: 'SAĞLIK BUCAĞI' }],
    '3506': [{ id: '350601', ad: 'BORNOVA MERKEZ' }, { id: '350602', ad: 'DOĞANLAR BUCAĞI' }],
    DEFAULT: [{ id: 'B001', ad: 'MERKEZ BUCAĞI' }, { id: 'B002', ad: 'KÖYLER BUCAĞI' }],
  },

  koyler: {
    '342301': [{ id: '34230101', ad: 'MERKEZ' }, { id: '34230102', ad: 'FENERYOLu' }],
    '342302': [{ id: '34230201', ad: 'MERKEZ' }, { id: '34230202', ad: 'MODA' }],
    '341001': [{ id: '34100101', ad: 'MERKEZ' }, { id: '34100102', ad: 'LEVENT' }],
    DEFAULT: [{ id: 'K001', ad: 'MERKEZ' }, { id: 'K002', ad: 'YENİ BELDE' }],
  },

  mahalleler: {
    '34230101': [
      { id: '3423010101', ad: 'MODA MAHALLESİ' },
      { id: '3423010102', ad: 'BAHARIYE MAHALLESİ' },
      { id: '3423010103', ad: 'CAFERAĞA MAHALLESİ' },
      { id: '3423010104', ad: 'FENERYOLu MAHALLESİ' },
    ],
    '34230201': [
      { id: '3423020101', ad: 'KADIKÖY MAHALLESİ' },
      { id: '3423020102', ad: 'FIKIRTEPE MAHALLESİ' },
    ],
    '34100101': [
      { id: '3410010101', ad: 'BEBEK MAHALLESİ' },
      { id: '3410010102', ad: 'ARNAVUTKÖy MAHALLESİ' },
      { id: '3410010103', ad: 'KURUÇEŞME MAHALLESİ' },
    ],
    DEFAULT: [
      { id: 'M001', ad: 'MERKEZ MAHALLESİ' },
      { id: 'M002', ad: 'YENİ MAHALLESİ' },
      { id: 'M003', ad: 'ATATÜRK MAHALLESİ' },
      { id: 'M004', ad: 'CUMHURİYET MAHALLESİ' },
    ],
  },

  caddeSokaklar: {
    '3423010101': [
      { id: 'C3423010101_1', ad: 'MODA CADDESİ' },
      { id: 'C3423010101_2', ad: 'RıHTIM CADDESİ' },
      { id: 'C3423010101_3', ad: 'BAHARIYE CADDESİ' },
      { id: 'C3423010101_4', ad: 'KARAKOLHANE CADDESİ' },
    ],
    '3423010102': [
      { id: 'C3423010102_1', ad: 'İSTİKLAL CADDESİ' },
      { id: 'C3423010102_2', ad: 'BAHARIYE SOKAĞı' },
    ],
    DEFAULT: [
      { id: 'CS001', ad: 'ATATÜRK CADDESİ' },
      { id: 'CS002', ad: 'CUMHURİYET CADDESİ' },
      { id: 'CS003', ad: 'İNÖNÜ CADDESİ' },
      { id: 'CS004', ad: 'BARIŞ SOKAĞı' },
      { id: 'CS005', ad: 'GÜL SOKAĞı' },
      { id: 'CS006', ad: 'LİMAN CADDESİ' },
    ],
  },
};

/**
 * Kapı numaraları listesi üretici
 */
function buildKapiList(start, end, step = 1) {
  return Array.from({ length: Math.floor((end - start) / step) + 1 }, (_, i) =>
    String(start + i * step)
  );
}

const DIS_KAPI_LIST = buildKapiList(1, 200);
const IC_KAPI_LIST  = buildKapiList(1, 50);

/**
 * Lookup yardımcısı — DEFAULT fallback ile
 */
function lookup(map, key) {
  return map[key] ?? map['DEFAULT'] ?? [];
}

module.exports = {
  ADDRESS_DB,
  DIS_KAPI_LIST,
  IC_KAPI_LIST,
  lookup,
};
