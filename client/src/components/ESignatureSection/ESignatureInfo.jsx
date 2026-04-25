import ContactForm from './ContactForm';
import styles from './ESignatureInfo.module.css';

const CORE_FEATURES = [
  {
    title: 'Veri Bütünlüğü',
    text:
      'Elektronik imza ile imzalanan belgede sonradan herhangi bir değişiklik yapılması durumunda imza geçersiz hale gelir. Böylece belgenin izinsiz değiştirilmesi, silinmesi veya üzerine ekleme yapılması engellenir.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Kimlik Doğrulama',
    text:
      'Elektronik imza, belgenin hangi kullanıcı tarafından imzalandığını kesin olarak belirler. Bu sayede imzayı atan kişinin kimliği doğrulanmış olur.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: 'İnkar Edilemezlik',
    text:
      'Elektronik imza ile yapılan işlemler sonradan imza sahibi tarafından inkâr edilemez. İmza sahibinin işlemi gerçekleştirdiği teknik olarak doğrulanabilir.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const WHY_NEEDED = [
  'Elektronik ortamda kimlik doğrulama sağlamak',
  'Dijital belgelerin güvenli şekilde imzalanmasını sağlamak',
  'İşlemlerin hukuki geçerliliğini garanti altına almak',
  'Kağıt kullanımını azaltmak ve süreçleri hızlandırmak',
  'Uzaktan işlem yapılmasına imkan tanımak',
  'Belge bütünlüğünü korumak',
  'Yapılan işlemlerin inkâr edilmesini önlemek',
  'Kurumlar arası güvenli veri paylaşımı sağlamak',
];

const LEGAL_USES = [
  'Sözleşmeler',
  'Başvurular',
  'Resmi yazışmalar',
  'Kurumsal onay süreçleri',
  'Ticari belgeler',
  'Elektronik başvurular',
  'Kurumlar arası yazışmalar',
  'Vergi işlemleri',
  'Finansal işlemler',
];

const NOT_ALLOWED = [
  'Evlilik işlemleri',
  'Tapu devri ve gayrimenkul satışları',
  'Veraset ve intikal işlemleri',
  'Noter huzuru gerektiren işlemler',
  'Teminat sözleşmeleri',
];

const PUBLIC_USES = [
  'Kamu kurum başvuruları',
  'Sosyal güvenlik işlemleri',
  'Vergi işlemleri',
  'Sağlık uygulamaları',
  'Kurumlar arası yazışmalar',
  'Eğitim başvuruları',
  'e-Devlet işlemleri',
  'Resmi belge onayları',
];

const COMMERCIAL_USES = [
  'Sözleşme imzalama',
  'Finansal işlemler',
  'Dijital bankacılık işlemleri',
  'Sigorta işlemleri',
  'Kurumsal onay süreçleri',
  'Kağıtsız ofis uygulamaları',
  'Elektronik sipariş işlemleri',
  'Mutabakat süreçleri',
  'Tedarik zinciri belgeleri',
];

const ADVANTAGES = [
  'Fiziksel imza sürecini ortadan kaldırır',
  'İşlemleri hızlandırır',
  'Kağıt kullanımını azaltır',
  'Kurye ve posta maliyetlerini düşürür',
  'Uzaktan imzalama imkanı sunar',
  'Belge arşivlemeyi kolaylaştırır',
  'Güvenli kimlik doğrulama sağlar',
  'İnsan hatasını azaltır',
  'İş akışlarını hızlandırır',
  'Dijital dönüşümü destekler',
];

const APPLICATION_STEPS = [
  'Elektronik sertifika başvurusu yapılır',
  'Kimlik doğrulama işlemi gerçekleştirilir',
  'Sertifika üretilir',
  'Güvenli imza aracı teslim edilir',
  'Aktivasyon işlemi yapılır',
  'Elektronik imza kullanıma açılır',
];

const REQUIRED_DOCS = [
  'Kimlik belgesi',
  'Başvuru formu',
  'Sertifika taahhütnamesi',
  'Kurumsal başvurularda yetki belgeleri',
];

const PROFESSIONS = [
  'Avukatlar',
  'Mali müşavirler',
  'Muhasebeciler',
  'Doktorlar',
  'Mühendisler',
  'Şirket yetkilileri',
  'Kamu personeli',
  'Finans sektörü çalışanları',
];

const USAGE_STEPS = [
  'Elektronik imza cihazı bilgisayara takılır',
  'İmzalanacak belge açılır',
  'İmzala seçeneği seçilir',
  'PIN kodu girilir',
  'Belge imzalanır',
];

const POSSIBLE_OPERATIONS = [
  'Dijital sözleşme imzalama',
  'Resmi başvurular',
  'Kurumsal onay süreçleri',
  'Elektronik belge imzalama',
  'Vergi işlemleri',
  'Finansal işlemler',
  'Kurum içi yazışmalar',
  'Mutabakat süreçleri',
  'e-Belge uygulamaları',
  'Kamu başvuruları',
];

const HOW_IT_WORKS_STEPS = [
  'İmzalanacak belgenin sayısal özeti oluşturulur',
  'Bu özet kullanıcıya ait özel anahtar ile şifrelenir',
  'Oluşan veri elektronik imzayı oluşturur',
  'Karşı taraf açık anahtar ile imzayı doğrular',
];

export default function ESignatureInfo() {


  return (
    <article className={styles.article} aria-label="E-İmza Detaylı Bilgi" id="eimza">
     

      {/* ── 1. Elektronik İmza Nedir? ─────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza Nedir?</h2>
        <p className={styles.p}>
          Elektronik imza (e-imza), dijital ortamlarda oluşturulan belge, başvuru, sözleşme ve
          işlemlerin kim tarafından yapıldığını doğrulayan ve belgenin bütünlüğünü koruyan
          sayısal bir doğrulama mekanizmasıdır. Elektronik imza, fiziksel ortamda kullanılan
          ıslak imzanın dijital karşılığıdır ve elektronik ortamda yapılan işlemlere yasal
          geçerlilik kazandırır.
        </p>
        <p className={styles.p}>
          Geleneksel imzada kişiler bir belgeyi el ile imzalayarak kimliklerini doğrular ve
          işlem iradelerini ortaya koyarlar. Elektronik imzada ise bu doğrulama matematiksel
          algoritmalar, kriptografik anahtarlar ve sertifika altyapısı kullanılarak dijital
          ortamda gerçekleştirilir. Bu sayede imzalanan belge üzerinde sonradan yapılabilecek
          değişiklikler tespit edilebilir ve belgenin güvenliği sağlanır.
        </p>
        <p className={styles.p}>
          Elektronik imza, dijital belgelerin gerçekliğini ve bütünlüğünü doğrulamak için
          kullanılan bir teknolojidir. İmzalanan belgenin gerçekten ilgili kişi tarafından
          imzalandığını, imzalandıktan sonra değiştirilmediğini ve işlemin inkâr
          edilemeyeceğini garanti altına alır.
        </p>
      </section>

      {/* ── 2. Neden Gereklidir? ───────────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza Neden Gereklidir?</h2>
        <p className={styles.p}>
          Dijitalleşmenin yaygınlaşmasıyla birlikte kamu ve özel sektör işlemleri giderek
          elektronik ortamlara taşınmıştır. Bu dönüşüm, kimlik doğrulama ve işlem güvenliği
          ihtiyacını ortaya çıkarmıştır. Elektronik imza, bu ihtiyacı karşılayan en önemli
          teknolojilerden biridir.
        </p>
        <p className={styles.p}>Elektronik imza aşağıdaki nedenlerle gereklidir:</p>
        <ul className={styles.bullets}>
          {WHY_NEEDED.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p className={styles.p}>
          Elektronik imza sayesinde taraflar fiziksel olarak bir araya gelmeden sözleşme
          imzalayabilir, başvuru yapabilir ve resmi işlemleri tamamlayabilir. Bu durum zaman
          ve maliyet açısından önemli avantajlar sağlar.
        </p>
      </section>

      {/* ── 3. Temel Özellikler — 3 kart ───────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmzanın Temel Özellikleri</h2>
        <p className={styles.p}>Elektronik imza üç temel güvenlik özelliği sunar:</p>

        <div className={styles.featureGrid}>
          {CORE_FEATURES.map(({ title, text, icon }) => (
            <article key={title} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">{icon}</span>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureText}>{text}</p>
            </article>
          ))}
        </div>

        <p className={styles.p}>
          Bu üç özellik elektronik imzayı dijital ortamlarda güvenli işlem yapılabilmesini
          sağlayan temel yapı haline getirir.
        </p>
      </section>

      {/* ── 4. Hukuki Geçerlilik ───────────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmzanın Hukuki Geçerliliği</h2>
        <p className={styles.p}>
          Elektronik imzanın hukuki geçerliliği ilgili mevzuat ile düzenlenmiştir. Nitelikli
          elektronik imza, elle atılan imza ile aynı hukuki sonucu doğurur. Bu nedenle
          elektronik imza ile imzalanan belgeler resmi ve ticari işlemlerde geçerli kabul
          edilir.
        </p>
        <p className={styles.p}>Elektronik imza aşağıdaki işlemlerde yasal olarak kullanılabilir:</p>
        <ul className={styles.bullets}>
          {LEGAL_USES.map(item => <li key={item}>{item}</li>)}
        </ul>

        <p className={styles.p}>
          Ancak bazı işlemler kanun gereği elektronik imza ile gerçekleştirilemez. Resmi
          merasim gerektiren veya özel şekil şartına bağlı işlemlerde ıslak imza zorunludur.
        </p>
        <p className={styles.p}>Elektronik imzanın kullanılamadığı bazı işlemler:</p>
        <ul className={`${styles.bullets} ${styles.bulletsWarn}`}>
          {NOT_ALLOWED.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p className={styles.p}>
          Bu işlemler haricinde elektronik imza geniş bir kullanım alanına sahiptir.
        </p>
      </section>

      {/* ── 5. Nasıl Çalışır? ──────────────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza Nasıl Çalışır?</h2>
        <p className={styles.p}>
          Elektronik imza, açık anahtar altyapısı adı verilen kriptografik sistem üzerinden
          çalışır. Bu sistemde kullanıcıya özel bir anahtar çifti oluşturulur:
        </p>
        <ul className={styles.bullets}>
          <li>Özel anahtar (private key)</li>
          <li>Açık anahtar (public key)</li>
        </ul>

        <p className={styles.p}>İmzalama işlemi sırasında:</p>
        <ol className={styles.steps}>
          {HOW_IT_WORKS_STEPS.map((s, i) => (
            <li key={s}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span className={styles.stepText}>{s}</span>
            </li>
          ))}
        </ol>
        <p className={styles.p}>
          Bu işlem sonucunda belgeye özel bir dijital imza oluşur ve belgenin değiştirilmesi
          durumunda imza geçersiz hale gelir.
        </p>
      </section>

      {/* ── 6. Nerelerde Kullanılır? — 2 kolon ─────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza Nerelerde Kullanılır?</h2>
        <p className={styles.p}>
          Elektronik imza hem kamusal hem ticari birçok alanda kullanılabilir.
        </p>

        <div className={styles.twoColumn}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Kamusal Kullanım Alanları</h3>
            <ul className={styles.bullets}>
              {PUBLIC_USES.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Ticari Kullanım Alanları</h3>
            <ul className={styles.bullets}>
              {COMMERCIAL_USES.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <p className={styles.p}>
          Elektronik imza ayrıca PDF, Word, Excel, XML gibi birçok belge türünün dijital
          ortamda imzalanmasını sağlar.
        </p>
      </section>

      {/* ── 7. Avantajlar ──────────────────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza Kullanmanın Avantajları</h2>
        <p className={styles.p}>Elektronik imza kullanımı birçok avantaj sağlar:</p>
        <ul className={`${styles.bullets} ${styles.twoCol}`}>
          {ADVANTAGES.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p className={styles.p}>
          Elektronik imza sayesinde belgeler dijital ortamda güvenli şekilde saklanabilir ve
          gerektiğinde hızlı şekilde erişilebilir.
        </p>
      </section>

      {/* ── 8. Nasıl Alınır? ───────────────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza Nasıl Alınır?</h2>
        <p className={styles.p}>
          Elektronik imza alabilmek için öncelikle <strong>Nitelikli Elektronik Sertifika</strong>{' '}
          edinilmesi gerekir. Bu sertifika, imza sahibinin kimlik bilgilerini içeren ve
          elektronik imza oluşturulmasını sağlayan dijital bir kayıttır.
        </p>
        <p className={styles.p}>Elektronik imza başvurusu genel olarak şu adımlarla yapılır:</p>
        <ol className={styles.steps}>
          {APPLICATION_STEPS.map((s, i) => (
            <li key={s}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span className={styles.stepText}>{s}</span>
            </li>
          ))}
        </ol>
        <p className={styles.p}>Başvuru sırasında genellikle aşağıdaki belgeler talep edilir:</p>
        <ul className={styles.bullets}>
          {REQUIRED_DOCS.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

      {/* ── 9. Kimler Alabilir? ────────────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Kimler Elektronik İmza Alabilir?</h2>
        <p className={styles.p}>
          Elektronik imza bireysel veya kurumsal olarak alınabilir. <strong>18 yaşını
          doldurmuş tüm bireyler</strong> elektronik imza başvurusu yapabilir. Ayrıca
          kurumlar, yetkilendirdikleri personeller için kurumsal elektronik imza temin
          edebilir.
        </p>
        <p className={styles.p}>Elektronik imza en çok şu meslek grupları tarafından kullanılır:</p>
        <ul className={`${styles.bullets} ${styles.twoCol}`}>
          {PROFESSIONS.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p className={styles.p}>Ancak elektronik imza kullanım alanı bunlarla sınırlı değildir.</p>
      </section>

      {/* ── 10. Nasıl Kullanılır? ──────────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza Nasıl Kullanılır?</h2>
        <p className={styles.p}>Elektronik imza kullanımı oldukça basittir. Genel işlem adımları:</p>
        <ol className={styles.steps}>
          {USAGE_STEPS.map((s, i) => (
            <li key={s}>
              <span className={styles.stepNum}>{i + 1}</span>
              <span className={styles.stepText}>{s}</span>
            </li>
          ))}
        </ol>
        <p className={styles.p}>
          İmzalanan belge üzerinde yapılan değişiklikler otomatik olarak tespit edilir.
        </p>
      </section>

      {/* ── 11. Yapılabilecek İşlemler ─────────────────────── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Elektronik İmza ile Yapılabilecek İşlemler</h2>
        <p className={styles.p}>Elektronik imza ile aşağıdaki işlemler yapılabilir:</p>
        <ul className={`${styles.bullets} ${styles.twoCol}`}>
          {POSSIBLE_OPERATIONS.map(item => <li key={item}>{item}</li>)}
        </ul>
      </section>

      

      {/* ── 13. Daha Fazlası İçin (İletişim & Yönlendirme) ── */}
      <section className={styles.block}>
        <h2 className={styles.h2}>Daha Fazlası İçin</h2>
        <p className={styles.p}>
          E-imza süreciniz hakkında daha fazla bilgi almak veya satın alma yapmak için
          aşağıdaki iletişim kanalları ve yönlendirmeler üzerinden bize ulaşabilirsiniz.
        </p>

        <div className={styles.contactLayout}>
          <div className={styles.contactBoxWrap}>
          <div className={styles.contactBox}>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className={styles.contactBody}>
                <h3 className={styles.contactTitle}>Merkez Ofis</h3>
                <p className={styles.contactText}>
                  Üniversiteler Mahallesi, Bilkent CyberPark, CyberPlaza A Blok Kat: 6 No: 603
                  Çankaya / ANKARA
                </p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <div className={styles.contactBody}>
                <h3 className={styles.contactTitle}>İstanbul Ofis</h3>
                <p className={styles.contactText}>
                  Atatürk Mahallesi Ertuğrul Gazi Sk. No: 2H/22 B Blok Metropol İstanbul Projesi
                  Merkez Ataşehir / İstanbul
                </p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.93.35 1.84.65 2.72a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.36-1.36a2 2 0 0 1 2.11-.45c.88.3 1.79.52 2.72.65A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div className={styles.contactBody}>
                <h3 className={styles.contactTitle}>Destek Hattı</h3>
                <p className={styles.contactText}>
                  <a href="tel:4440276" className={styles.contactLink}>444 0 276</a>
                </p>
                <p className={styles.contactText}>
                  <a href="mailto:destek@arksigner.com" className={styles.contactLink}>
                    destek@arksigner.com
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </span>
              <div className={styles.contactBody}>
                <h3 className={styles.contactTitle}>Ankara Ofis (Satış Birimi)</h3>
                <p className={styles.contactText}>
                  <a href="tel:+903124847933" className={styles.contactLink}>0 312 484 79 33</a>
                </p>
                <p className={styles.contactText}>
                  <a href="mailto:satis@arksigner.com" className={styles.contactLink}>
                    satis@arksigner.com
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.contactIcon} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                  <path d="M9 9h.01" />
                  <path d="M13 9h.01" />
                  <path d="M9 13h.01" />
                  <path d="M13 13h.01" />
                </svg>
              </span>
              <div className={styles.contactBody}>
                <h3 className={styles.contactTitle}>Ar-Ge ve İdari Ofis</h3>
                <p className={styles.contactText}>
                  Üniversiteler Mahallesi, Bilkent CyberPark, CyberPlaza C Blok Kat: 4 No: 400A
                  Çankaya / ANKARA
                </p>
              </div>
            </div>
          </div>

          </div>

          <ContactForm />
        </div>
        <a
          href="https://www.arkimza.com/satin-al"
          target="_blank"ye
          rel="noopener noreferrer"
          className={styles.purchaseCTA}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          E-İmzanızı Hemen Satın Alın
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </section>
    </article>
  );
}
