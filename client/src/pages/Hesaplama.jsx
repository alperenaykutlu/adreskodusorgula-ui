import MuhasebeHub from '../components/MuhasebeSection/MuhasebeHub';
import styles from './Hesaplama.module.css';

export default function Hesaplama() {
  return (
    <div className={styles.pageWrap}>
      <main className={styles.main}>
        <MuhasebeHub />
      </main>
    </div>
  );
}
