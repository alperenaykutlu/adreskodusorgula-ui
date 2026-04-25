import { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '../Toast/ToastContext';
import styles from './ContactModal.module.css';

function generateCaptcha() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9\s()+-]{10,}$/;

export default function ContactModal({ onClose }) {
  const { showToast } = useToast();

  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    captcha: '',
    kvkk: false,
  });
  const [errors, setErrors]       = useState({});
  const [captchaCode, setCaptcha] = useState(() => generateCaptcha());
  const [submitting, setSubmitting] = useState(false);

  const firstInputRef = useRef(null);

  /* ESC ile kapat + ilk alana odakla + body scroll kilidi */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstInputRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleChange = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues(v => ({ ...v, [field]: val }));
    if (errors[field]) setErrors(er => ({ ...er, [field]: undefined }));
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setValues(v => ({ ...v, captcha: '' }));
    if (errors.captcha) setErrors(er => ({ ...er, captcha: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.fullName.trim() || values.fullName.trim().length < 3) {
      e.fullName = 'Lütfen ad ve soyadınızı girin.';
    }
    if (!values.phone.trim() || !PHONE_RE.test(values.phone.trim())) {
      e.phone = 'Geçerli bir telefon numarası girin.';
    }
    if (!values.email.trim() || !EMAIL_RE.test(values.email.trim())) {
      e.email = 'Geçerli bir e-posta adresi girin.';
    }
    if (values.captcha.trim().toUpperCase() !== captchaCode) {
      e.captcha = 'Güvenlik kodu hatalı.';
    }
    if (!values.kvkk) {
      e.kvkk = 'Devam etmek için KVKK metnini onaylayın.';
    }
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setSubmitting(true);
    /* Backend yok: şimdilik yalnızca bildirim */
    setTimeout(() => {
      showToast('İletişim formunuz kaydedildi. En kısa sürede dönüş yapılacaktır.', 'success', 3500);
      setSubmitting(false);
      onClose();
    }, 500);
  };

  const onBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const invalid = useMemo(() => !values.kvkk, [values.kvkk]);

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <form className={styles.modal} onSubmit={handleSubmit} noValidate>
        <header className={styles.header}>
          <h3 className={styles.title} id="contact-modal-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            İletişime Geçin
          </h3>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Kapat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="ct-name">
              Ad Soyad<span className={styles.required}>*</span>
            </label>
            <input
              ref={firstInputRef}
              id="ct-name"
              type="text"
              className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
              value={values.fullName}
              onChange={handleChange('fullName')}
              autoComplete="name"
              maxLength={80}
            />
            {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ct-phone">
              Telefon No<span className={styles.required}>*</span>
            </label>
            <input
              id="ct-phone"
              type="tel"
              className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
              value={values.phone}
              onChange={handleChange('phone')}
              autoComplete="tel"
              placeholder="05XX XXX XX XX"
              maxLength={20}
            />
            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ct-email">
              E-Posta<span className={styles.required}>*</span>
            </label>
            <input
              id="ct-email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              value={values.email}
              onChange={handleChange('email')}
              autoComplete="email"
              maxLength={120}
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="ct-captcha">
              Güvenlik Kodu<span className={styles.required}>*</span>
            </label>
            <div className={styles.captchaRow}>
              <span className={styles.captchaCode} aria-label={`Güvenlik kodu: ${captchaCode}`}>
                {captchaCode}
              </span>
              <input
                id="ct-captcha"
                type="text"
                className={`${styles.input} ${errors.captcha ? styles.inputError : ''}`}
                value={values.captcha}
                onChange={handleChange('captcha')}
                autoComplete="off"
                maxLength={10}
                placeholder="Yandaki kodu girin"
              />
              <button
                type="button"
                className={styles.refreshBtn}
                onClick={refreshCaptcha}
                aria-label="Yeni kod oluştur"
                title="Yeni kod"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </button>
            </div>
            {errors.captcha && <span className={styles.errorText}>{errors.captcha}</span>}
          </div>

          <label className={styles.kvkk} htmlFor="ct-kvkk">
            <input
              id="ct-kvkk"
              type="checkbox"
              className={styles.kvkkBox}
              checked={values.kvkk}
              onChange={handleChange('kvkk')}
            />
            <span>
              Kişisel verilerimin <a href="#kvkk" onClick={(e) => e.preventDefault()}>KVKK Aydınlatma Metni</a>
              {' '}kapsamında işlenmesini kabul ediyorum.
            </span>
          </label>
          {errors.kvkk && <span className={styles.errorText}>{errors.kvkk}</span>}
        </div>

        <footer className={styles.footer}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={onClose}
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className={styles.btnSave}
            disabled={submitting || invalid}
          >
            {submitting ? 'Kaydediliyor…' : 'Kaydet'}
          </button>
        </footer>
      </form>
    </div>,
    document.body,
  );
}
