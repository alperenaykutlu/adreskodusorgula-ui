/**
 * Türkiye Adres Veri Yapısı
 * Genişletilebilir hiyerarşik yapı: il > ilçe > bucak > köy > mahalle > cadde/sokak > dış kapı > iç kapı
 * UAVT (Ulusal Adres Veri Tabanı) benzeri yapı
 */

const TURKEY_ADDRESS_DATA = {
  iller: [
    { id: "34", ad: "İSTANBUL" },
    { id: "06", ad: "ANKARA" },
    { id: "35", ad: "İZMİR" },
    { id: "01", ad: "ADANA" },
    { id: "16", ad: "BURSA" },
    { id: "07", ad: "ANTALYA" },
    { id: "55", ad: "SAMSUN" },
    { id: "25", ad: "ERZURUM" },
    { id: "27", ad: "GAZİANTEP" },
    { id: "42", ad: "KONYA" },
  ],

  ilceler: {
    "34": [
      { id: "3401", ad: "ADALAR" },
      { id: "3402", ad: "ARNAVUTKöY" },
      { id: "3403", ad: "ATAŞEHİR" },
      { id: "3404", ad: "AVCILAR" },
      { id: "3405", ad: "BAĞCILAR" },
      { id: "3406", ad: "BAHÇELİEVLER" },
      { id: "3407", ad: "BAKIRKÖY" },
      { id: "3408", ad: "BAŞAKŞEHİR" },
      { id: "3409", ad: "BAYRAMPAŞA" },
      { id: "3410", ad: "BEŞİKTAŞ" },
      { id: "3411", ad: "BEYKOZ" },
      { id: "3412", ad: "BEYLİKDÜZÜ" },
      { id: "3413", ad: "BEYOĞLU" },
      { id: "3414", ad: "BÜYÜKÇEKMECE" },
      { id: "3415", ad: "ÇATALCA" },
      { id: "3416", ad: "ÇEKMEKÖY" },
      { id: "3417", ad: "ESENLER" },
      { id: "3418", ad: "ESENYURT" },
      { id: "3419", ad: "EYÜPSULTAN" },
      { id: "3420", ad: "FATİH" },
      { id: "3421", ad: "GAZİOSMANPAŞA" },
      { id: "3422", ad: "GÜNGÖREN" },
      { id: "3423", ad: "KADIKÖY" },
      { id: "3424", ad: "KAĞITHANE" },
      { id: "3425", ad: "KARTAL" },
      { id: "3426", ad: "KÜÇÜKÇEKMECE" },
      { id: "3427", ad: "MALTEPE" },
      { id: "3428", ad: "PENDİK" },
      { id: "3429", ad: "SANCAKTEPE" },
      { id: "3430", ad: "SARIGAZİ" },
      { id: "3431", ad: "ŞILE" },
      { id: "3432", ad: "ŞİŞLİ" },
      { id: "3433", ad: "SULTANBEYLİ" },
      { id: "3434", ad: "SULTANGAZİ" },
      { id: "3435", ad: "TUZLA" },
      { id: "3436", ad: "ÜMRANİYE" },
      { id: "3437", ad: "ÜSKÜDAR" },
      { id: "3438", ad: "ZEYTİNBURNU" },
    ],
    "06": [
      { id: "0601", ad: "AKYURT" },
      { id: "0602", ad: "ALTINDAĞ" },
      { id: "0603", ad: "AYAŞ" },
      { id: "0604", ad: "BALA" },
      { id: "0605", ad: "BEYPAZARI" },
      { id: "0606", ad: "ÇAMLИДERE" },
      { id: "0607", ad: "ÇANKAYA" },
      { id: "0608", ad: "ÇUBUK" },
      { id: "0609", ad: "ELMАДAĞ" },
      { id: "0610", ad: "ETİMESGUT" },
      { id: "0611", ad: "EVREN" },
      { id: "0612", ad: "GÖLBAŞI" },
      { id: "0613", ad: "GÜDÜL" },
      { id: "0614", ad: "HAYMANA" },
      { id: "0615", ad: "KALECİK" },
      { id: "0616", ad: "KAZAN" },
      { id: "0617", ad: "KEÇİÖREN" },
      { id: "0618", ad: "KIZILCAHAMAM" },
      { id: "0619", ad: "MAMAK" },
      { id: "0620", ad: "NALLIHAN" },
      { id: "0621", ad: "POLATLΙ" },
      { id: "0622", ad: "PURSAKLAR" },
      { id: "0623", ad: "SİNCAN" },
      { id: "0624", ad: "ŞEREFLİKOÇHİSAR" },
      { id: "0625", ad: "YENİMAHALLE" },
    ],
    "35": [
      { id: "3501", ad: "ALİAĞA" },
      { id: "3502", ad: "BALÇOVA" },
      { id: "3503", ad: "BAYINDIR" },
      { id: "3504", ad: "BAYRAKLI" },
      { id: "3505", ad: "BERGAMA" },
      { id: "3506", ad: "BORNOVA" },
      { id: "3507", ad: "BUCA" },
      { id: "3508", ad: "ÇEŞME" },
      { id: "3509", ad: "DİKİLİ" },
      { id: "3510", ad: "FOÇA" },
      { id: "3511", ad: "GAZİEMİR" },
      { id: "3512", ad: "GÜZELBAHÇE" },
      { id: "3513", ad: "KARABAĞLAR" },
      { id: "3514", ad: "KARABURUN" },
      { id: "3515", ad: "KARŞIYAKA" },
      { id: "3516", ad: "KEMALPAŞA" },
      { id: "3517", ad: "KINIK" },
      { id: "3518", ad: "KİRAZ" },
      { id: "3519", ad: "KONAK" },
      { id: "3520", ad: "MENDERES" },
      { id: "3521", ad: "MENEMEN" },
      { id: "3522", ad: "NARLIDERE" },
      { id: "3523", ad: "ÖDEMİŞ" },
      { id: "3524", ad: "SEFERİHİSAR" },
      { id: "3525", ad: "SELÇUK" },
      { id: "3526", ad: "TİRE" },
      { id: "3527", ad: "TORBALI" },
      { id: "3528", ad: "URLA" },
    ],
    "42": [
      { id: "4201", ad: "AHIRLI" },
      { id: "4202", ad: "AKÖREN" },
      { id: "4203", ad: "AKŞEHİR" },
      { id: "4204", ad: "ALTINEKİN" },
      { id: "4205", ad: "BEYŞEHİR" },
      { id: "4206", ad: "BOZKIR" },
      { id: "4207", ad: "CİHANBEYLİ" },
      { id: "4208", ad: "ÇELTİK" },
      { id: "4209", ad: "ÇUMRA" },
      { id: "4210", ad: "DERBENT" },
      { id: "4211", ad: "DEREBUCAK" },
      { id: "4212", ad: "DOĞANHİSAR" },
      { id: "4213", ad: "EMİRGAZİ" },
      { id: "4214", ad: "EREĞLİ" },
      { id: "4215", ad: "GÜNEYSINIR" },
      { id: "4216", ad: "HADİM" },
      { id: "4217", ad: "HALKAPINAR" },
      { id: "4218", ad: "HÜYÜK" },
      { id: "4219", ad: "ILGIN" },
      { id: "4220", ad: "KADINHANI" },
      { id: "4221", ad: "KARATAY" },
      { id: "4222", ad: "KULU" },
      { id: "4223", ad: "MERAM" },
      { id: "4224", ad: "SARAYÖNÜ" },
      { id: "4225", ad: "SELÇUKLU" },
      { id: "4226", ad: "SEYDİŞEHİR" },
      { id: "4227", ad: "TAŞKENT" },
      { id: "4228", ad: "TUZLUKÇU" },
      { id: "4229", ad: "YALIHÜYÜK" },
      { id: "4230", ad: "YUNAK" },
    ],
    "07": [
      { id: "0701", ad: "AKSEKI" },
      { id: "0702", ad: "AKSU" },
      { id: "0703", ad: "ALANYA" },
      { id: "0704", ad: "AKDENİZ" },
      { id: "0705", ad: "DÖŞEMEALTI" },
      { id: "0706", ad: "ELMALI" },
      { id: "0707", ad: "FİNİKE" },
      { id: "0708", ad: "GAZİPAŞA" },
      { id: "0709", ad: "GÜNDOĞMUŞ" },
      { id: "0710", ad: "İBRADI" },
      { id: "0711", ad: "KAŞ" },
      { id: "0712", ad: "KEMER" },
      { id: "0713", ad: "KEPEZ" },
      { id: "0714", ad: "KONYAALTI" },
      { id: "0715", ad: "KORKUTELİ" },
      { id: "0716", ad: "KUMLuca" },
      { id: "0717", ad: "MANAVGAT" },
      { id: "0718", ad: "MURATPAŞA" },
      { id: "0719", ad: "SERİK" },
    ],
    "01": [
      { id: "0101", ad: "ALADAĞ" },
      { id: "0102", ad: "CEYHAN" },
      { id: "0103", ad: "ÇUKUROVA" },
      { id: "0104", ad: "FEKE" },
      { id: "0105", ad: "İMAMOĞLU" },
      { id: "0106", ad: "KARAİSALI" },
      { id: "0107", ad: "KARATAŞ" },
      { id: "0108", ad: "KOZAN" },
      { id: "0109", ad: "POZANTI" },
      { id: "0110", ad: "SAİMBEYLİ" },
      { id: "0111", ad: "SARΙÇAM" },
      { id: "0112", ad: "SEYHAN" },
      { id: "0113", ad: "TUFANBEYLİ" },
      { id: "0114", ad: "YUMURTALIK" },
      { id: "0115", ad: "YÜREĞİR" },
    ],
    "16": [
      { id: "1601", ad: "BÜYÜKORHAN" },
      { id: "1602", ad: "GEMLİK" },
      { id: "1603", ad: "GÜRSU" },
      { id: "1604", ad: "HARMANCIK" },
      { id: "1605", ad: "İNEGÖL" },
      { id: "1606", ad: "İZNİK" },
      { id: "1607", ad: "KARACABEY" },
      { id: "1608", ad: "KELES" },
      { id: "1609", ad: "KESTEL" },
      { id: "1610", ad: "MUDANYA" },
      { id: "1611", ad: "MUSTAFAKEMALPAŞA" },
      { id: "1612", ad: "NİLÜFER" },
      { id: "1613", ad: "ORHANELİ" },
      { id: "1614", ad: "ORHANGAZİ" },
      { id: "1615", ad: "OSMANGAZİ" },
      { id: "1616", ad: "YENİŞEHİR" },
      { id: "1617", ad: "YILDIRIM" },
    ],
    "55": [
      { id: "5501", ad: "ALAÇAM" },
      { id: "5502", ad: "ASARCIK" },
      { id: "5503", ad: "ATAKUM" },
      { id: "5504", ad: "AYVACIK" },
      { id: "5505", ad: "BAFRA" },
      { id: "5506", ad: "CANİK" },
      { id: "5507", ad: "ÇARŞAMBA" },
      { id: "5508", ad: "HAVZA" },
      { id: "5509", ad: "İLKADIM" },
      { id: "5510", ad: "KAVAK" },
      { id: "5511", ad: "LADİK" },
      { id: "5512", ad: "19 MAYIS" },
      { id: "5513", ad: "SALIPAZARI" },
      { id: "5514", ad: "TEKKEKÖY" },
      { id: "5515", ad: "TERME" },
      { id: "5516", ad: "VEZİRKÖPRÜ" },
      { id: "5517", ad: "YAKAKENT" },
    ],
    "25": [
      { id: "2501", ad: "AZIZIYE" },
      { id: "2502", ad: "CAT" },
      { id: "2503", ad: "HINIS" },
      { id: "2504", ad: "HORASAN" },
      { id: "2505", ad: "İSPİR" },
      { id: "2506", ad: "KARAÇOBAN" },
      { id: "2507", ad: "KARAYAZI" },
      { id: "2508", ad: "KÖPRÜKÖY" },
      { id: "2509", ad: "NARMAN" },
      { id: "2510", ad: "OLTU" },
      { id: "2511", ad: "OLUR" },
      { id: "2512", ad: "PALANDÖKEN" },
      { id: "2513", ad: "PASİNLER" },
      { id: "2514", ad: "PAZARYOLu" },
      { id: "2515", ad: "ŞENKAYA" },
      { id: "2516", ad: "TEKMAN" },
      { id: "2517", ad: "TORTUM" },
      { id: "2518", ad: "UZUNDERE" },
      { id: "2519", ad: "YAKUTİYE" },
    ],
    "27": [
      { id: "2701", ad: "ARABAN" },
      { id: "2702", ad: "İSLAHİYE" },
      { id: "2703", ad: "KARKAMIŞ" },
      { id: "2704", ad: "NİZİP" },
      { id: "2705", ad: "NURDAĞI" },
      { id: "2706", ad: "OĞUZELİ" },
      { id: "2707", ad: "ŞAHİNBEY" },
      { id: "2708", ad: "ŞEHİTKAMİL" },
      { id: "2709", ad: "YAVUZELİ" },
    ],
  },

  bucaklar: {
    "3423": [
      { id: "342301", ad: "MERKEZ BUCAĞI" },
      { id: "342302", ad: "KADIKÖY BUCAĞI" },
    ],
    "3410": [
      { id: "341001", ad: "MERKEZ BUCAĞI" },
      { id: "341002", ad: "BEŞİKTAŞ BUCAĞI" },
    ],
    "0607": [
      { id: "060701", ad: "ÇANKAYA MERKEZ" },
      { id: "060702", ad: "SAĞLIK BUCAĞI" },
    ],
    "3506": [
      { id: "350601", ad: "BORNOVA MERKEZ" },
      { id: "350602", ad: "DOĞANLAR BUCAĞI" },
    ],
    DEFAULT: [{ id: "DEFAULT01", ad: "MERKEZ BUCAĞI" }],
  },

  koyler: {
    "342301": [
      { id: "34230101", ad: "MERKEZ" },
      { id: "34230102", ad: "FENERYOLu" },
    ],
    "342302": [
      { id: "34230201", ad: "MERKEZ" },
      { id: "34230202", ad: "MODA" },
    ],
    "341001": [
      { id: "34100101", ad: "MERKEZ" },
      { id: "34100102", ad: "LevENT" },
    ],
    DEFAULT: [{ id: "DEFAULT0101", ad: "MERKEZ" }],
  },

  mahalleler: {
    "34230101": [
      { id: "3423010101", ad: "MODA MAHALLESİ" },
      { id: "3423010102", ad: "BAHARIYE MAHALLESİ" },
      { id: "3423010103", ad: "CAFERAĞA MAHALLESİ" },
      { id: "3423010104", ad: "FENERYOLu MAHALLESİ" },
    ],
    "34230201": [
      { id: "3423020101", ad: "KADIKÖY MAHALLESİ" },
      { id: "3423020102", ad: "FIKIRTEPE MAHALLESİ" },
    ],
    "34100101": [
      { id: "3410010101", ad: "BEBEK MAHALLESİ" },
      { id: "3410010102", ad: "ARNAVUTKÖу MAHALLESİ" },
      { id: "3410010103", ad: "KURUÇEŞME MAHALLESİ" },
    ],
    DEFAULT: [
      { id: "DEFAULT010101", ad: "MERKEZ MAHALLESİ" },
      { id: "DEFAULT010102", ad: "YENİ MAHALLESİ" },
      { id: "DEFAULT010103", ad: "ATATÜRK MAHALLESİ" },
    ],
  },

  caddeSokaklar: {
    "3423010101": [
      { id: "342301010101", ad: "MODA CADDESİ" },
      { id: "342301010102", ad: "RıHTIM CADDESİ" },
      { id: "342301010103", ad: "BAHARIYE CADDESİ" },
      { id: "342301010104", ad: "KARAKOLHANE CADDESİ" },
    ],
    "3423010102": [
      { id: "342301010201", ad: "İSTİKLAL CADDESİ" },
      { id: "342301010202", ad: "BAHARIYE SOKAĞı" },
    ],
    DEFAULT: [
      { id: "DEFAULT01010101", ad: "ATATÜRK CADDESİ" },
      { id: "DEFAULT01010102", ad: "CUMHURİYET CADDESİ" },
      { id: "DEFAULT01010103", ad: "İNÖNÜ CADDESİ" },
      { id: "DEFAULT01010104", ad: "BARIŞ SOKAĞı" },
      { id: "DEFAULT01010105", ad: "GÜL SOKAĞı" },
    ],
  },

  disKapilar: {
    "342301010101": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"],
    DEFAULT: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "12", "14", "15", "16", "18", "20"],
  },

  icKapilar: {
    DEFAULT: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
  },

  /**
   * UAVT Kodu oluşturma simülasyonu
   * Gerçek sistemde backend'den gelecek
   */
  generateUAVTCode: function (adres) {
    const base = "TR" + Date.now().toString().slice(-8);
    const hash = (
      adres.il.id +
      adres.ilce.id +
      (adres.mahalle ? adres.mahalle.id : "00") +
      adres.disKapi +
      (adres.icKapi || "0")
    )
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0)
      .toString()
      .slice(-4);
    return base + hash;
  },

  /**
   * Bina UAVT kodu oluşturma
   */
  generateBinaCode: function (adres) {
    return "BN" + Math.random().toString(36).substring(2, 10).toUpperCase();
  },
};

// Export for module usage (ileride modüler yapıya geçiş için)
if (typeof module !== "undefined" && module.exports) {
  module.exports = TURKEY_ADDRESS_DATA;
}
