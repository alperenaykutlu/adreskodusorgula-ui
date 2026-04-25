import { useState, useMemo } from 'react';
import { useToast } from '../Toast/ToastContext';
import styles from './ContactForm.module.css';

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

export default function ContactForm() {
  const { showToast } = useToast();

  const [values, setValues] = useState({
    fullName: '', phone: '', email: '', captcha: '', kvkk: false,
  });
  const [errors, setErrors] = useState({});
  const [captchaCode, setCaptcha] = useState(() => generateCaptcha());
  const [submitting, setSubmitting] = useState(false);

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
    setTimeout(() => {
      showToast('İletişim formunuz kaydedildi. En kısa sürede dönüş yapılacaktır.', 'success', 3500);
      setSubmitting(false);
      setValues({ fullName: '', phone: '', email: '', captcha: '', kvkk: false });
      setCaptcha(generateCaptcha());
    }, 500);
  };

  const invalid = useMemo(() => !values.kvkk, [values.kvkk]);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.header}>
        <h3 className={styles.title}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Bilgi Alma Formu
        </h3>
        <p className={styles.subtitle}>Sizi en kısa sürede arayalım.</p>
      </header>

      <div className={styles.body}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="cf-name">
            Ad Soyad<span className={styles.required}>*</span>
          </label>
          <input
            id="cf-name"
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
          <label className={styles.label} htmlFor="cf-phone">
            Telefon No<span className={styles.required}>*</span>
          </label>
          <input
            id="cf-phone"
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
          <label className={styles.label} htmlFor="cf-email">
            E-Posta<span className={styles.required}>*</span>
          </label>
          <input
            id="cf-email"
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
          <label className={styles.label} htmlFor="cf-captcha">
            Güvenlik Kodu<span className={styles.required}>*</span>
          </label>
          <div className={styles.captchaRow}>
            <span className={styles.captchaCode} aria-label={`Güvenlik kodu: ${captchaCode}`}>
              {captchaCode}
            </span>
            <input
              id="cf-captcha"
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

        <label className={styles.kvkk} htmlFor="cf-kvkk">
          <input
            id="cf-kvkk"
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

        <button
          type="submit"
          className={styles.btnSubmit}
          disabled={submitting || invalid}
        >
          {submitting ? 'Gönderiliyor…' : 'Bilgi Talep Et'}
        </button>
      </div>
    </form>
  );
}
