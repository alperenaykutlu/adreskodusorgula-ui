import { useState } from 'react';
import { FAQ_DATA } from '../../constants/faqData';
import FAQItem from './FAQItem';
import styles from './FAQ.module.css';

/**
 * FAQ — 2 sütun × 4 satır accordion grid
 */
export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id));

  // 2 sütunlu grid için veriyi böl
  const leftCol  = FAQ_DATA.filter((_, i) => i % 2 === 0);
  const rightCol = FAQ_DATA.filter((_, i) => i % 2 !== 0);

  return (
    <section className={styles.section} id="faq" aria-label="Sıkça Sorulan Sorular">
      <div className={styles.header}>
        <h2 className={styles.title}>Sıkça Sorulan Sorular</h2>
        <p className={styles.subtitle}>UAVT adres kodu sorgulama, e-imza ve muhasebe işlemleri hakkında merak edilenler</p>
      </div>

      <div className={styles.grid}>
        {/* Sol sütun */}
        <div className={styles.col}>
          {leftCol.map(item => (
            <FAQItem
              key={item.id}
              id={`faq-${item.id}`}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

        {/* Sağ sütun */}
        <div className={styles.col}>
          {rightCol.map(item => (
            <FAQItem
              key={item.id}
              id={`faq-${item.id}`}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
