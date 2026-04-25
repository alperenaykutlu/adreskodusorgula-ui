import FloatingSelect from './FloatingSelect';
import { FIELD_ORDER, FIELD_CONFIG } from '../../hooks/useAddressForm';
import styles from './AddressForm.module.css';

/**
 * AddressForm — 4×2 grid'de 8 alan + sorgula butonu
 *
 * Props:
 *  values, options, errors   — hook'tan gelen state
 *  loading                   — API isteği sürüyor mu
 *  onFieldChange             — (fieldId, value, label) => void
 *  onQuery                   — () => void
 */
export default function AddressForm({
  values,
  options,
  errors,
  loading,
  onFieldChange,
  onQuery,
}) {
  /* Hangi alanlar disabled: parent değeri yoksa disabled */
  const isDisabled = (fieldId) => {
    const idx = FIELD_ORDER.indexOf(fieldId);
    if (idx === 0) return false; // il hiçbir zaman disabled değil
    const parent = FIELD_ORDER[idx - 1];
    return !values[parent];
  };

  return (
    <div className={styles.formWrap} id="sorgula">
      {/* Üst satır: İl, İlçe, Bucak, Köy */}
      <div className={styles.grid}>
        {FIELD_ORDER.slice(0, 4).map(fieldId => (
          <FloatingSelect
            key={fieldId}
            id={`sel-${fieldId}`}
            label={FIELD_CONFIG[fieldId].label}
            value={values[fieldId]}
            options={options[fieldId]}
            disabled={isDisabled(fieldId)}
            error={errors[fieldId]}
            onChange={(val, lbl) => onFieldChange(fieldId, val, lbl)}
          />
        ))}
      </div>

      {/* Alt satır: Mahalle, Cadde/Sokak, Dış Kapı, İç Kapı */}
      <div className={styles.grid}>
        {FIELD_ORDER.slice(4).map(fieldId => (
          <FloatingSelect
            key={fieldId}
            id={`sel-${fieldId}`}
            label={FIELD_CONFIG[fieldId].label}
            value={values[fieldId]}
            options={options[fieldId]}
            disabled={isDisabled(fieldId)}
            error={errors[fieldId]}
            onChange={(val, lbl) => onFieldChange(fieldId, val, lbl)}
          />
        ))}
      </div>

      {/* Sorgula butonu */}
      <button
        id="btn-query"
        className={`${styles.btnQuery} ${loading ? styles.loading : ''}`}
        onClick={onQuery}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className={styles.spinner} aria-hidden="true" />
            <span>Sorgulanıyor...</span>
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>Sorgula</span>
          </>
        )}
      </button>
    </div>
  );
}
