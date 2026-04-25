import ESignatureInfo from '../components/ESignatureSection/ESignatureInfo';
import styles from './Eimza.module.css';

export default function Eimza() {
  return (
    <div className={styles.pageWrap}>
      <main className={styles.main}>
        <ESignatureInfo />
      </main>
    </div>
  );
}
