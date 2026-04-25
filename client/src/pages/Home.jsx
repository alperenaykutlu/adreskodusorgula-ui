import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection     from '../components/HeroSection/HeroSection';
import HelpSection     from '../components/HelpSection/HelpSection';
import FAQ             from '../components/FAQ/FAQ';
import useAddressForm  from '../hooks/useAddressForm';
import styles from './Home.module.css';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  const {
    values,
    options,
    errors,
    loading,
    result,
    onFieldChange,
    handleQuery,   // Sorgula butonu callback'i
    handleReset,
  } = useAddressForm();

  /* AddressForm'un beklediği prop yapısına uygun obje */
  const formProps = {
    values,
    options,
    errors,
    loading,
    result,
    onFieldChange,
    onQuery:     handleQuery,   // ← isim eşleştirmesi burada yapılıyor
    handleReset,
  };

  return (
    <>
      <HeroSection formProps={formProps} />

      <main className={styles.main}>
        <HelpSection />
        <FAQ />
      </main>
    </>
  );
}
