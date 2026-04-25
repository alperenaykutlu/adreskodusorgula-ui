/**
 * Site Konfigürasyonu — adreskodusorgula.com.tr
 * Tüm site bilgileri, navigasyon linkleri ve meta veriler burada tanımlanır.
 */

export const SITE = {
  name:        'Adres Kodu Sorgula',
  shortName:   'AKS',
  domain:      'adreskodusorgula.com.tr',
  url:         'https://adreskodusorgula.com.tr',
  description: 'UAVT Adres Kodu sorgulama, poliçe ve sigorta işlemleriniz için adres doğrulama platformu.',
  supportEmail:'destek@adreskodusorgula.com.tr',
  phone:       '0850 000 00 00',
};

/**
 * Navigasyon Menüsü
 * href: smooth scroll ya da route için kullanılır
 */
export const NAV_LINKS = [
  { id: 'uavt',           label: 'UAVT',                href: '#uavt' },
  { id: 'eimza',          label: 'E-İmza',              href: '/eimza' },
  { id: 'muhasebe',       label: 'Muhasebe İşlemleri',  href: '#muhasebe' },
  { id: 'onemli-bilgiler',label: 'Önemli Bilgiler',     href: '#onemli-bilgiler' },
  { id: 'hesaplama',      label: 'Hesaplama Aracı',     href: '/hesaplama' },
];

/**
 * Yardım Bölümü Kartları
 * icon       — HelpSection içindeki CardIcon bileşenine iletilir
 * accentVar  — Her karta özgü CSS değişkeni renk tonu
 * href: ileride sayfalara yönlendirilecek (şimdilik '#')
 */
export const HELP_CARDS = [
  {
    id:          'acenteler',
    icon:        'agent',          // Kravatlı temsilci ikonu
    accentVar:   '--primary',
    title:       'Acenteler',
    description: 'Türkiye genelinde 2.000+ yetkili acente ağımıza ulaşın. Size en yakın acente ile online veya yüz yüze görüşme ayarlayın.',
    href:        '/acenteler',
    linkLabel:   'Görüntüle',
  },
  {
    id:          'anlasmalı-servisler',
    icon:        'service',        // Anahtar + dişli ikonu
    accentVar:   '--accent-service',
    title:       'Anlaşmalı Servisler',
    description: 'Kasko ve konut sigortası kapsamında yetkili servislerimizden hızlı, öncelikli ve güvenceli onarım hizmeti alın.',
    href:        '/anlasmalı-servisler',
    linkLabel:   'Görüntüle',
  },
  {
    id:          'anlasmalı-kurumlar',
    icon:        'institution',    // Banka / resmi kurum sütun ikonu
    accentVar:   '--accent-institution',
    title:       'Anlaşmalı Kurumlar',
    description: 'Bankalar, hastaneler ve kamu kurumları dahil anlaşmalı iş ortaklarımızla entegre sigorta çözümleri sunuyoruz.',
    href:        '/anlasmalı-kurumlar',
    linkLabel:   'Görüntüle',
  },
];

/**
 * Footer Linkleri
 */
export const FOOTER_LINKS = {
  kurumsal: [
    { label: 'Hakkımızda',    href: '#' },
    { label: 'Kariyer',       href: '#' },
    { label: 'Basın',         href: '#' },
    { label: 'İletişim',      href: '#' },
  ],
  urunler: [
    { label: 'Konut Sigortası', href: '#' },
    { label: 'Kasko',           href: '#' },
    { label: 'Sağlık',          href: '#' },
    { label: 'Hayat',           href: '#' },
  ],
  destek: [
    { label: 'SSS',              href: '#faq' },
    { label: 'Adres Sorgulama',  href: '#sorgula' },
    { label: 'Acente Girişi',    href: '#' },
    { label: 'Gizlilik',         href: '#' },
  ],
};
