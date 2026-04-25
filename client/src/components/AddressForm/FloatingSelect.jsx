import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './FloatingSelect.module.css';

/**
 * FloatingSelect — Aranabilir, floating-label, portal-dropdown
 *
 * Dropdown, createPortal ile document.body'e render edilir →
 * hiçbir parent'ın overflow:hidden'ından etkilenmez.
 */
export default function FloatingSelect({
  id,
  label,
  value,
  options = [],
  disabled = false,
  error = '',
  onChange,
}) {
  const [isOpen,       setIsOpen      ] = useState(false);
  const [search,       setSearch      ] = useState('');
  const [dropPos,      setDropPos     ] = useState({ top: 0, left: 0, width: 0 });
  const wrapperRef = useRef(null);

  /* ── Seçili değeri input'a yansıt ─────────────────────── */
  useEffect(() => {
    if (value) {
      const opt = options.find(o => (typeof o === 'string' ? o : o.id) === value);
      setSearch(opt ? (typeof opt === 'string' ? opt : opt.ad) : '');
    } else {
      setSearch('');
    }
  }, [value, options]);

  /* ── Dropdown pozisyonunu hesapla ─────────────────────── */
  const calcPos = useCallback(() => {
    if (!wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    setDropPos({
      top:   r.bottom + 6,
      left:  r.left,
      width: r.width,
    });
  }, []);

  /* ── Scroll / resize → pozisyonu güncelle ─────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const onScroll = calcPos;
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', calcPos);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', calcPos);
    };
  }, [isOpen, calcPos]);

  /* ── Dışarı tıklanınca dropdown kapat ─────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        // Arama metnini seçili değere geri döndür
        const opt = options.find(o => (typeof o === 'string' ? o : o.id) === value);
        setSearch(opt ? (typeof opt === 'string' ? opt : opt.ad) : '');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, value, options]);

  /* ── Filtrele ───────────────────────────────────────────── */
  const filtered = options.filter(opt => {
    const lbl = typeof opt === 'string' ? opt : (opt?.ad ?? '');
    const srch = typeof search === 'string' ? search : '';
    return lbl.toLocaleLowerCase('tr-TR').includes(srch.toLocaleLowerCase('tr-TR'));
  });

  /* ── Seçim yap ─────────────────────────────────────────── */
  const handleSelect = (opt) => {
    const val = typeof opt === 'string' ? opt : opt.id;
    const lbl = typeof opt === 'string' ? opt : opt.ad;
    setSearch(lbl);
    onChange(val, lbl);
    setIsOpen(false);
  };

  const hasValue = Boolean(search);

  /* ── Portal dropdown ───────────────────────────────────── */
  const dropdownPortal = isOpen && !disabled && createPortal(
    <ul
      className={styles.dropdown}
      role="listbox"
      style={{
        position: 'fixed',
        top:   dropPos.top,
        left:  dropPos.left,
        width: dropPos.width,
      }}
    >
      {filtered.length > 0 ? (
        filtered.map(opt => {
          const val  = typeof opt === 'string' ? opt : opt.id;
          const lbl  = typeof opt === 'string' ? opt : opt.ad;
          const isSel = val === value;
          return (
            <li
              key={val}
              role="option"
              aria-selected={isSel}
              className={`${styles.dropdownItem} ${isSel ? styles.selectedItem : ''}`}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(opt); }}
            >
              {lbl}
            </li>
          );
        })
      ) : (
        <li className={styles.dropdownEmpty}>Sonuç bulunamadı</li>
      )}
    </ul>,
    document.body
  );

  return (
    <div
      ref={wrapperRef}
      className={[
        styles.wrap,
        hasValue || isOpen ? styles.hasValue  : '',
        error               ? styles.hasError  : '',
        disabled            ? styles.isDisabled: '',
      ].join(' ')}
    >
      <input
        id={id}
        type="text"
        className={styles.select}
        value={search}
        autoComplete="off"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={e => { setSearch(e.target.value); setIsOpen(true); }}
        onFocus={() => { if (!disabled) { calcPos(); setIsOpen(true); } }}
      />

      {/* Floating Label */}
      <label htmlFor={id} className={styles.label}>{label}</label>

      {/* Chevron */}
      <span
        className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        aria-hidden="true"
        onMouseDown={e => {
          e.preventDefault();
          if (!disabled) { calcPos(); setIsOpen(o => !o); }
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </span>

      {/* Portal dropdown */}
      {dropdownPortal}

      {/* Hata mesajı */}
      {error && (
        <span id={`${id}-error`} role="alert" className={styles.errorMsg}>
          {error}
        </span>
      )}
    </div>
  );
}
