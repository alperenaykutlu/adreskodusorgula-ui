import { useToast } from './ToastContext';
import styles from './Toast.module.css';

export default function Toast() {
  const { toast, hideToast } = useToast();

  return (
    <div
      className={`${styles.toast} ${toast.visible ? styles.show : ''} ${styles[toast.type]}`}
      role="status"
      aria-live="polite"
    >
      {/* İkon */}
      {toast.type === 'success' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {toast.type === 'error' && (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      )}

      <span className={styles.message}>{toast.message}</span>

      <button
        className={styles.close}
        onClick={hideToast}
        aria-label="Bildirimi kapat"
      >
        ×
      </button>
    </div>
  );
}
