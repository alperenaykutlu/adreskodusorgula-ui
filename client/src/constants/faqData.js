/**
 * SSS (Sıkça Sorulan Sorular) Verisi
 * Üç başlık altında: UAVT • E-İmza • Muhasebe
 */

export const FAQ_DATA = [
  /* ── UAVT ───────────────────────────────────────────── */
  {
    id: 1,
    question: 'UAVT Kodu Nedir?',
    answer:
      'UAVT (Ulusal Adres Veri Tabanı), Türkiye\'deki tüm adreslerin standart bir formatta kayıt altına alındığı ulusal sistemdir. Her adrese özgün bir UAVT kodu atanır. Bu kod; resmi başvurular, sigorta poliçeleri, e-devlet işlemleri ve kamu hizmetlerinde adresinizi hızlı ve doğru biçimde tanımlamak için kullanılır.',
  },
  {
    id: 2,
    question: 'UAVT Adres Kodu Sorgulama Nasıl Yapılır?',
    answer:
      'Adres sorgulama formunda sırasıyla il, ilçe, bucak, köy/belde, mahalle, cadde/sokak, dış kapı ve iç kapı bilgilerinizi seçin. Tüm alanları doldurduktan sonra "Sorgula" butonuna tıklayın. Sistem size anlık olarak UAVT adres kodunuzu ve bina kodunuzu gösterecektir.',
  },
  {
    id: 3,
    question: 'UAVT Adres Kodu Neden Önemlidir?',
    answer:
      'UAVT kodu; sigorta poliçelerinde adres doğrulaması, acil servis müdahalelerinde hızlı konum tespiti, bankacılık işlemlerinde adres doğrulaması ve e-devlet hizmetlerinde kimlik teyidi için kritik öneme sahiptir. Özellikle konut ve kasko sigortası başvurularında UAVT kodu zorunlu olarak talep edilmektedir.',
  },
  {
    id: 4,
    question: 'Sorgulama Sonucunda Adresimi Bulamadım, Ne Yapmalıyım?',
    answer:
      'Adresiniz sistemde görünmüyorsa: 1) Seçimlerinizi kontrol edin ve sırasıyla tekrar deneyin. 2) İlçe ya da mahalle adında büyük/küçük harf veya yazım farkı olabilir. 3) Adresiniz UAVT\'ye henüz kayıtlı olmayabilir; bu durumda bağlı bulunduğunuz belediyeye veya muhtarlığa başvurun. 4) Destek hattımız 0850 000 00 00\'ı arayabilirsiniz.',
  },
  {
    id: 5,
    question: 'UAVT Sorgulama Ücretsiz mi?',
    answer:
      'Evet, UAVT adres kodu sorgulama hizmeti tamamen ücretsizdir. Adreskodusorgula.com.tr üzerinden istediğiniz kadar sorgulama yapabilirsiniz. Kayıt veya üyelik gerektirmeksizin anında sonuç alabilirsiniz.',
  },

  /* ── E-İmza ─────────────────────────────────────────── */
  {
    id: 6,
    question: 'E-İmza Nedir ve Hangi İşlemlerde Kullanılır?',
    answer:
      'Elektronik imza (e-imza), kâğıt üzerinde atılan ıslak imzanın elektronik ortamdaki yasal karşılığıdır. 5070 sayılı Elektronik İmza Kanunu kapsamında ıslak imza ile aynı hukuki geçerliliğe sahiptir. E-Devlet, vergi dairesi, MERSİS, KEP, EBYS, ihale platformları, mali müşavirlik ve noter işlemleri gibi pek çok alanda kullanılır.',
  },
  {
    id: 7,
    question: 'Nitelikli Elektronik Sertifika (NES) ile E-İmza Aynı Şey midir?',
    answer:
      'E-imza atabilmek için Nitelikli Elektronik Sertifika (NES) gereklidir. NES, BTK tarafından yetkilendirilmiş Elektronik Sertifika Hizmet Sağlayıcıları (ESHS) tarafından üretilen, kullanıcının kimliğini elektronik ortamda doğrulayan dijital sertifikadır. E-imza, NES ile birlikte akıllı kart veya USB token üzerinde kullanılır.',
  },
  {
    id: 8,
    question: 'E-İmza Başvurusu İçin Hangi Belgeler Gerekir?',
    answer:
      'Bireysel başvurularda yalnızca T.C. kimlik numarası ve geçerli bir kimlik belgesi yeterlidir. Kurumsal başvurularda ise vergi numarası, imza sirküleri, faaliyet belgesi ve yetkili imzasına ait kimlik belgesi istenir. Anlaşmalı kurumumuza başvurarak süreci dakikalar içinde başlatabilirsiniz.',
  },
  {
    id: 9,
    question: 'E-İmza Kaç Yıl Geçerlidir?',
    answer:
      'Nitelikli elektronik sertifikalar genellikle 1, 2 veya 3 yıl süreyle satın alınabilir. Süre dolduğunda yenileme yapılması gerekir; sertifikanın geçerlilik süresi içerisinde atılan imzalar süresiz olarak hukuki geçerliliğini korur.',
  },

  /* ── Muhasebe ───────────────────────────────────────── */
  {
    id: 10,
    question: 'Online Ön Muhasebe Yazılımı Kimler Kullanabilir?',
    answer:
      'Şahıs şirketleri, limited ve anonim şirketler, serbest meslek mensupları, freelance çalışanlar ve e-ticaret işletmeleri online ön muhasebe yazılımlarını kullanabilir. Anlaşmalı çözüm ortağımız Paraşüt; fatura, irsaliye, e-arşiv, e-fatura, stok, cari ve gelir-gider takibini tek panelden sunar.',
  },
  {
    id: 11,
    question: 'E-Fatura ve E-Arşiv Fatura Arasında Ne Fark Var?',
    answer:
      'E-Fatura, GİB e-Fatura sistemine kayıtlı mükellefler arasında düzenlenir; alıcı ve satıcı her ikisi de e-Fatura kullanıcısıdır. E-Arşiv Fatura ise alıcısı e-Fatura mükellefi olmayan kişi/kurumlara kesilen elektronik faturadır. Her iki sürecin de yönetimi muhasebe yazılımı üzerinden tek tıkla yapılabilir.',
  },
  {
    id: 12,
    question: 'Muhasebe Yazılımı İçin E-İmza Gerekli mi?',
    answer:
      'Mali Mührü olan tüzel kişilikler e-Fatura kesebilir; e-İmza ise serbest meslek makbuzu, KEP üzerinden tebligat ve e-Devlet işlemlerinde kullanılır. Şirket türünüze göre Mali Mühür ve/veya e-İmza gerekebilir; doğru çözümü belirlemek için bize iletişim formundan ulaşabilirsiniz.',
  },
  {
    id: 13,
    question: 'Paraşüt Yazılımı için Ücretsiz Deneme Var mı?',
    answer:
      'Evet. Anlaşmalı çözüm ortağımız Paraşüt, kayıt sonrası 14 günlük ücretsiz deneme sunar. Site üzerindeki "Satın Al" butonuna tıkladığınızda doğrudan kayıt sayfasına yönlendirilir, kredi kartı bilgisi girmeden hemen kullanmaya başlayabilirsiniz.',
  },
  {
    id: 14,
    question: 'Verilerim Güvende mi?',
    answer:
      'E-imza ve muhasebe çözümleri için yalnızca BTK ve GİB tarafından yetkilendirilmiş yasal kurumlarla çalışırız. Kullanıcı verileri sitemiz üzerinde saklanmaz; siz "Satın Al" butonuna tıkladığınızda doğrudan ilgili anlaşmalı kurumun güvenli sayfasına yönlendirilirsiniz. Tüm süreçler KVKK uyumludur.',
  },
];
