/**
 * Renk Token Sistemi — adreskodusorgula.com.tr
 * Tüm renk değerleri merkezi olarak buradan yönetilir.
 * CSS değişkenleri index.css içinde tanımlanır; bu dosya JS tarafı için kullanılır.
 */

export const COLORS = {
  // Ana Marka Renkleri
  primary:       '#000080',
  primaryLight:  '#1a1aad',
  primaryXLight: '#e8e8f5',
  primaryDark:   '#00005a',

  // Aksanlar
  accentGreen:        '#24D330',   // Canlı yeşil — marka aksanı
  accentService:      '#e67e00',   // Turuncu — anlaşmalı servisler
  accentInstitution:  '#24D330',   // Yeşil — anlaşmalı kurumlar

  // Nötr
  white:         '#ffffff',
  black:         '#000000',
  subtext:       '#908f8f',

  // Borders
  border:        '#d9d9e3',
  borderFocus:   '#000080',

  // Durum
  error:         '#e53e3e',
  errorBg:       '#fff5f5',
  success:       '#38a169',
  successBg:     '#e8f5e9',

  // Arka planlar
  bgPage:        '#f5f6fa',
  cardBg:        '#ffffff',
};

/**
 * Gölge değerleri
 */
export const SHADOWS = {
  sm:  '0 1px 4px rgba(0,0,128,.10)',
  md:  '0 4px 18px rgba(0,0,128,.13)',
  lg:  '0 12px 40px rgba(0,0,128,.18)',
};

/**
 * Border radius
 */
export const RADIUS = {
  sm: '8px',
  md: '14px',
  lg: '20px',
  full: '9999px',
};

/**
 * Geçiş animasyonları
 */
export const TRANSITIONS = {
  base: '.18s cubic-bezier(.4,0,.2,1)',
  slow: '.35s cubic-bezier(.4,0,.2,1)',
};
