import { useState } from 'react';
import styles from './FAQ.module.css';

/**
 * FAQItem — Tek bir SSS sorusu (accordion)
 *
 * Props:
 *  question  — string
 *  answer    — string
 *  isOpen    — boolean
 *  onToggle  — () => void
 *  id        — string (erişilebilirlik için)
 */
export default function FAQItem({ question, answer, isOpen, onToggle, id }) {
  return (
    <article
      className={`${styles.item} ${isOpen ? styles.open : ''}`}
      aria-expanded={isOpen}
    >
      <button
        className={styles.question}
        onClick={onToggle}
        aria-controls={`${id}-answer`}
        id={`${id}-btn`}
      >
        <span className={styles.questionText}>{question}</span>
        <span className={styles.iconWrap} aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>

      <div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={styles.answerWrap}
      >
        <div className={styles.answerInner}>
          {answer}
        </div>
      </div>
    </article>
  );
}
