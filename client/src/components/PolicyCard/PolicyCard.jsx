import styles from './PolicyCard.module.css';

export default function PolicyCard() {
  return (
    <aside className={styles.card} aria-label="Poliçe Bilgileri">
      {/* Dekor daireler */}
      <span className={styles.deco1} aria-hidden="true" />
      <span className={styles.deco2} aria-hidden="true" />

      {/* İkon */}
      <div className={styles.icon}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>

      <h3 className={styles.title}>
        Poliçeniz için Yardımcı Olmaktan Mutluluk Duyarız
      </h3>

      <p className={styles.desc}>
        Adres sorgulama ile poliçelerinizi görüntüleyin, güncelleyin ve yönetin.
      </p>

      {/* Özellikler */}
      <ul className={styles.features} aria-label="Özellikler">
        {[
          'Anlık UAVT adres doğrulama',
          'Poliçe güncelleme',
          'Hasar takibi',
          'Tazminat başvurusu',
        ].map(f => (
          <li key={f} className={styles.feature}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>

    </aside>
  );
}
