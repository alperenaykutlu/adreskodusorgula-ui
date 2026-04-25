import styles from './HelpSection.module.css';

const REASONS = [
  {
    title: 'Resmî veriye dayalı sorgulama',
    text: 'UAVT veri tabanından çekilen güncel adres bilgisiyle hatasız sonuç alırsınız.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Anlaşmalı yetkili kurumlar',
    text: 'E-imza için Netgsm, muhasebe için Paraşüt gibi ESHS/SMM yetkilileriyle çalışırız — verileriniz aracısız iletilir.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 6l9-4 9 4" />
        <path d="M5 10v7" />
        <path d="M19 10v7" />
        <path d="M12 6v14" />
        <path d="M3 20h18" />
      </svg>
    ),
  },
  {
    title: 'Üyelik gerektirmez',
    text: 'Sorgulama tamamen ücretsiz ve kayıt gerektirmez. İletişim formu dışında hiçbir kişisel veri saklanmaz.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'KVKK uyumlu',
    text: 'Tüm form süreçleri aydınlatma metni ve açık rıza ile yürütülür; veriler yalnızca talebiniz için kullanılır.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Tek noktadan çözüm',
    text: 'Adres kodu, e-imza ve muhasebe ihtiyaçlarınızı ayrı sitelerde aramak yerine tek panelden ilerletin.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

export default function HelpSection() {
  return (
    <section className={styles.section} aria-label="Yardım Bölümü" id="onemli-bilgiler">
      <div className={styles.header}>
        <h2 className={styles.title}>İşinizi Kolaylaştırın</h2>
        <p className={styles.subtitle}>
          UAVT adres kodu sorgulamak, e-imza temin etmek ve muhasebe yazılımına erişmek için
          eskiden onlarca farklı kuruma başvurmanız gerekiyordu. Bizim amacımız bu süreçleri
          <strong> tek bir noktadan, hızlı ve ücretsiz</strong> biçimde yönetmenizi sağlamak.
          Resmî kaynaklı UAVT verisini kullanırız; e-imza ve muhasebe için ise{' '}
          <strong>Türkiye'nin önde gelen yetkili kurumları</strong> ile anlaşmalı çalışırız.
          Kullanıcılarımız doğrudan o kurumlara güvenli biçimde yönlendirilir.
        </p>
      </div>

      <h3 className={styles.reasonsTitle}>
        <span className={styles.reasonsTitleIcon} aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        Niçin Bizi Tercih Etmelisiniz?
      </h3>

      <div className={styles.reasonsGrid}>
        {REASONS.map(({ title, text, icon }) => (
          <article key={title} className={styles.reasonCard}>
            <span className={styles.reasonIcon} aria-hidden="true">{icon}</span>
            <h4 className={styles.reasonCardTitle}>{title}</h4>
            <p className={styles.reasonCardText}>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
