# 📋 Muhasebe İşlemleri & E-İmza Entegrasyon Modülü

> **UAVT Adres Doğrulama · Temel Muhasebe İşlemleri · Elektronik İmza Süreci**  
> Kurumsal düzeyde, Clean Architecture prensiplerine uygun tam entegre muhasebe ve e-imza yönetim arayüzü.

---

## 📑 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Sistem Mimarisi](#sistem-mimarisi)
3. [Modüller & Özellikler](#modüller--özellikler)
   - [UAVT Adres Sorgulama](#1-uavt-adres-sorgulama)
   - [Muhasebe İşlemleri](#2-muhasebe-islemleri)
   - [E-İmza Süreci](#3-e-imza-sureci)
4. [İş Akışı (Business Flow)](#is-akisi-business-flow)
5. [Entegrasyon Noktaları](#entegrasyon-noktaları)
6. [API Referansı](#api-referansı)
7. [Güvenlik](#güvenlik)
8. [Hata Yönetimi & Edge Case'ler](#hata-yönetimi--edge-caseler)
9. [Kurulum & Geliştirme](#kurulum--geliştirme)
10. [Ekran Açıklamaları (UI Sections)](#ekran-açıklamaları-ui-sections)

---

## Genel Bakış

Bu modül, aşağıdaki üç kritik iş sürecini **tek bir entegre arayüz** üzerinden yönetmektedir:

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENTEGRE MUHASEBE MODÜLÜ                       │
│                                                                   │
│  ┌─────────────┐    ┌──────────────────┐    ┌────────────────┐  │
│  │    UAVT     │───▶│   MUHASEBE       │───▶│   E-İMZA      │  │
│  │   Adres     │    │   İşlemleri      │    │   Süreci      │  │
│  │  Sorgulama  │    │  (Fatura/Fiş)    │    │  (Onay/İmza)  │  │
│  └─────────────┘    └──────────────────┘    └────────────────┘  │
│         │                   │                       │            │
│         ▼                   ▼                       ▼            │
│  Adres Doğrulama    Kayıt Oluşturma          Belge İmzalama     │
│  Kod Eşleştirme     Deftere İşleme           Arşivleme          │
└─────────────────────────────────────────────────────────────────┘
```

### Neden Bu Üç Süreç Birlikte?

| Sorun | Çözüm |
|-------|-------|
| Fatura adresleri UAVT koduyla doğrulanmadan kaydediliyordu | UAVT sorgusu muhasebe kaydından önce zorunlu hale getirildi |
| Muhasebe belgeleri kağıt imzayla onaylanıyordu | E-imza entegrasyonu ile tamamen dijital süreç |
| Adres uyuşmazlıkları e-imzalı belgelerde sorun yaratıyordu | Üç süreç pipeline mantığıyla zincirlendi |

---

## Sistem Mimarisi

### Katmanlı Mimari (Clean Architecture)

```
┌──────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                       │
│         Vue.js / React SPA  ←→  REST API Gateway             │
├──────────────────────────────────────────────────────────────┤
│                      APPLICATION LAYER                        │
│   MuhasebeIslemleriCommandHandler                            │
│   UavtSorguQueryHandler                                      │
│   EImzaBaslatCommandHandler                                  │
├──────────────────────────────────────────────────────────────┤
│                       DOMAIN LAYER                            │
│   MuhasebeKaydi  │  AdresKodu  │  EImzaBelgesi               │
│   (Aggregate)      (Value Obj)   (Aggregate)                 │
├──────────────────────────────────────────────────────────────┤
│                   INFRASTRUCTURE LAYER                        │
│   UavtApiClient  │  EImzaGateway  │  MuhasebeRepository     │
│   (PTT/NVI API)    (TÜBİTAK BES)   (MySQL)                  │
└──────────────────────────────────────────────────────────────┘
```

### Sayfa İçi Bileşen Ağacı

```
MuhasebeEImzaPage (Root)
├── UavtSorguPanel
│   ├── AdresArama (İl/İlçe/Mahalle cascade select)
│   ├── UavtSonucListesi
│   └── SecilenAdresOzeti
│
├── MuhasebeFormu
│   ├── TemelBilgiler (tarih, fiş no, açıklama)
│   ├── KarsiTarafBilgileri (Ad, VKN/TCKN, adres ← UAVT besler)
│   ├── KalemListesi (borç/alacak satırları)
│   ├── HesapPlaníSecici (Tekdüzen Hesap Planı)
│   └── ToplamOzet (KDV, toplam borç/alacak dengesi)
│
└── EImzaPanel
    ├── BelgeOnizleme (PDF render)
    ├── ImzaciListesi (sıralı imza zinciri)
    ├── SertifikaSecici (akıllı kart / mobil imza)
    └── ImzaDurumTimeline
```

---

## Modüller & Özellikler

---

<a id="1-uavt-adres-sorgulama"></a>
### 1. UAVT Adres Sorgulama Modülü

**UAVT (Ulusal Adres Veri Tabanı)** — İçişleri Bakanlığı tarafından yönetilen Türkiye'nin resmi adres tescil sistemi.

#### Sorgulama Akışı

```
Kullanıcı Girişi
     │
     ▼
┌─────────────┐     API İsteği      ┌──────────────────────┐
│  İl Seçimi  │ ─────────────────▶  │   UAVT REST API      │
└─────────────┘                     │   (İçişleri Bak.)    │
     │                              └──────────────────────┘
     ▼                                        │
┌─────────────┐   Cascade Trigger             │
│ İlçe Seçimi │ ◀─────────────────────────────┘
└─────────────┘     İlçe Listesi
     │
     ▼
┌──────────────────┐   UAVT Kodu Döner   ┌──────────────────┐
│ Mahalle / Köy    │ ─────────────────▶  │  Adres Nesnesi   │
│ Cadde / Sokak    │                     │  (12 haneli kod) │
│ Kapı / Daire No  │                     └──────────────────┘
└──────────────────┘                              │
                                                  ▼
                                    MuhasebeFormuna Otomatik Doldur
```

#### UAVT Kodu Yapısı

```
UAVT Kodu: 123456789012  (12 hane)
│
├── İl Kodu       : [1-2]   → 06 (Ankara)
├── İlçe Kodu     : [3-5]   → 063 (Çankaya)
├── Mahalle Kodu  : [6-8]   → 001
├── Cadde/Sokak   : [9-10]  → 12
└── Bina/Daire    : [11-12] → 05
```

#### Desteklenen Sorgulama Türleri

| Tür | Açıklama | Kullanım Senaryosu |
|-----|----------|--------------------|
| **Kademeli Arama** | İl → İlçe → Mahalle → Sokak cascade | Yeni adres girişi |
| **Kod ile Arama** | Bilinen UAVT kodu direkt sorgu | Kayıtlı müşteri |
| **Serbest Metin** | Adres stringi ile fuzzy search | Belirsiz adres durumu |
| **Koordinat** | Lat/Lng ile reverse geocode | Harita entegrasyonu |

#### Önemli İş Kuralları

```
⚠️  ZORUNLU: Muhasebe kaydı oluşturulmadan önce karşı taraf adresi UAVT ile doğrulanmalıdır.
⚠️  ZORUNLU: UAVT kodu geçersizse kayıt taslak olarak kalır, e-imzaya gönderilemez.
✅  İSTİSNA: Yurt dışı adresler için UAVT zorunluluğu devre dışı bırakılır.
✅  İSTİSNA: Kısa süreli işlemler (kasa fişi) için UAVT opsiyoneldir.
```

---

<a id="2-muhasebe-islemleri"></a>
### 2. Muhasebe İşlemleri Modülü

#### Desteklenen İşlem Türleri

```
┌─────────────────────────────────────────────────────────┐
│                  İŞLEM TİPLERİ                           │
├──────────────────────┬──────────────────────────────────┤
│  FATURA              │  GİDER                           │
│  ├─ Satış Faturası   │  ├─ Personel Gider Fişi          │
│  ├─ Alış Faturası    │  ├─ Avans Kapatma                │
│  └─ İade Faturası    │  └─ Masraf Dekontu               │
├──────────────────────┼──────────────────────────────────┤
│  BANKA               │  KASA                            │
│  ├─ Havale/EFT       │  ├─ Tahsilat Fişi                │
│  ├─ Çek İşlemleri    │  ├─ Ödeme Fişi                   │
│  └─ Kredi Kartı      │  └─ Virman Fişi                  │
└──────────────────────┴──────────────────────────────────┘
```

#### Muhasebe Kaydı Veri Modeli

```
MuhasebeKaydi (Aggregate Root)
│
├── FisNo          : string   → Otomatik sıralı, yıl bazlı (2025-00001)
├── FisTarihi      : DateTime → İşlem tarihi (geçmiş tarih kısıtı var)
├── FisTipi        : enum     → Fatura / Fiş / Dekont / Senet
├── Aciklama       : string   → max 500 karakter
├── DovizKodu      : string   → TRY / USD / EUR / GBP
├── UavtAdresKodu  : string   → 12 haneli doğrulanmış kod
│
├── KarsiTaraf (Value Object)
│   ├── Ad / Unvan
│   ├── VergiKimlikNo (VKN 10 hane / TCKN 11 hane)
│   ├── VergiDairesi
│   └── DogrulanmisAdres ← UAVT modülünden gelir
│
├── KalemListesi (Collection)
│   └── MuhasebeKalemi
│       ├── HesapKodu   → Tekdüzen Hesap Planı (3 haneli ana / 9 haneli tam)
│       ├── HesapAdi
│       ├── Borc        : decimal
│       ├── Alacak      : decimal
│       ├── KdvOrani    : %0 / %1 / %8 / %10 / %18 / %20
│       └── Aciklama
│
├── MaliOzet (Value Object)
│   ├── ToplamBorc
│   ├── ToplamAlacak
│   ├── Denge           → Borc - Alacak = 0 olmalı ✅
│   ├── ToplamKdv
│   └── GenelToplam
│
└── EImzaDurumu (Value Object)
    ├── Durum           → Taslak / BekleyenImza / Imzalandi / Reddedildi
    ├── ImzaciListesi
    └── SonGuncelleme
```

#### Hesap Planı Entegrasyonu (Tekdüzen Hesap Planı)

```
100 - KASA HESABI
  ├── 100.01 - TL Kasası
  └── 100.02 - Döviz Kasası

120 - ALICILAR
  ├── 120.001 - [Müşteri Kodu]
  └── ...

320 - SATICILAR

391 - HESAPLANAN KDV
  ├── 391.01 - %1 KDV
  ├── 391.08 - %8 KDV  (veya %10)
  └── 391.18 - %18 KDV (veya %20)

600 - YURTİÇİ SATIŞLAR
```

#### Validation Kuralları

```
Kayıt Oluşturma Öncesi Kontroller:
  ✅ Borç = Alacak (muhasebe dengesi)
  ✅ En az 1 kalem girilmeli
  ✅ Hesap kodu geçerli Tekdüzen hesap planında mevcut olmalı
  ✅ VKN/TCKN algoritma doğrulaması geçilmeli
  ✅ Fiş tarihi kapanmış dönemde olmamalı
  ✅ UAVT kodu doğrulanmış olmalı (yurt içi işlemler için)
  ✅ KDV tutarı kalem tutarıyla matematiksel tutarlı olmalı
```

---

<a id="3-e-imza-sureci"></a>
### 3. E-İmza Süreci Modülü

#### E-İmza Türleri

| Tür | Standart | Hukuki Geçerlilik | Kullanım |
|-----|----------|-------------------|----------|
| **Nitelikli E-İmza (NES)** | eIDAS / 5070 sayılı Kanun | Islak imza ile eşdeğer | Resmi fatura, sözleşme |
| **Mali Mühür** | TÜBİTAK BES | Kurumsal onay | Tüzel kişi belgeleri |
| **Mobil İmza** | BTK onaylı | Nitelikli sayılır | Hızlı onay senaryoları |
| **Elektronik Onay** | İç süreç | Kurumsal geçerlilik | Ön onay adımları |

#### İmza Süreci Pipeline

```
[Muhasebe Kaydı Oluşturuldu]
           │
           ▼
   ┌───────────────┐
   │ Belge Üretimi │  → PDF/A formatında, zaman damgalı
   └───────────────┘
           │
           ▼
   ┌───────────────────────┐
   │  İmzacı Zinciri       │  → Roller bazlı sıralı imza
   │  Tanımlanması         │
   │                       │
   │  1. Muhasebe Uzmanı   │  → İlk imza zorunlu
   │  2. Mali İşler Müd.   │  → Tutar > 50.000₺ ise
   │  3. Genel Müdür       │  → Tutar > 500.000₺ ise
   └───────────────────────┘
           │
           ▼
   ┌───────────────────────┐
   │  İmza Daveti          │  → Email + SMS bildirim
   │  (Her imzacıya)       │
   └───────────────────────┘
           │
           ▼
   ┌───────────────────────┐
   │  İmzacı Girişi        │  → Akıllı kart / Mobil imza PIN
   │  & Doğrulama          │
   └───────────────────────┘
           │
           ▼
   ┌───────────────────────┐
   │  TÜBİTAK BES          │  → Sertifika geçerliliği
   │  Doğrulama Servisi    │  → OCSP sorgusu
   └───────────────────────┘
           │
           ▼
   ┌───────────────────────┐
   │  Zaman Damgası        │  → RFC 3161 uyumlu
   │  (TSA)                │  → TÜBİTAK / Akıllı Kart
   └───────────────────────┘
           │
           ▼
   ┌───────────────────────┐
   │  Belge Arşivleme      │  → Uzun süreli saklama
   │  (LTV - Long-Term     │  → 10 yıl erişilebilirlik
   │   Validation)         │
   └───────────────────────┘
           │
           ▼
   [İmzalı Belge Hazır] → Muhasebe kaydı "İmzalandı" durumuna geçer
```

#### İmza Durumu State Machine

```
        ┌──────────────────────────────────────────────┐
        │                                              │
   [TASLAK] ──oluştur──▶ [ONAY_BEKLIYOR] ──imzala──▶ [İMZALANDI]
        │                      │                          │
        │                      │ reddet                   │
        │                      ▼                          │ iptal
        │                 [REDDEDİLDİ]                    │
        │                      │                          ▼
        │                   revize               [İPTAL_EDİLDİ]
        │                      │
        └──────────────────────┘
              (Revize → Tekrar Taslak)
```

#### Sertifika Doğrulama

```
İmza Anında Yapılan Kontroller:
  ✅ Sertifika geçerlilik süresi dolmamış
  ✅ OCSP ile gerçek zamanlı iptal sorgusu
  ✅ Sertifika zinciri TÜBİTAK kök CA'ya bağlanıyor
  ✅ Sertifika sahibi, imzacı olarak tanımlanan kişiyle eşleşiyor
  ✅ Sertifika tipi (NES / Mali Mühür) belge tipine uygun
```

---

<a id="is-akisi-business-flow"></a>
## İş Akışı (Business Flow)

### Tam Senaryo: Satış Faturası Oluşturma ve İmzalama

```
ADIM 1: UAVT SORGULAMA
────────────────────────────────────────────────
Kullanıcı    → İl/İlçe/Mahalle seçer
Sistem       → UAVT API'ye sorgu atar (< 500ms)
UAVT API     → Adres kodu + doğrulanmış adres döner
Sistem       → Kodu form alanına otomatik doldurur
UI           → "Adres Doğrulandı ✅" banner gösterir

ADIM 2: MUHASEBE KAYDI OLUŞTURMA
────────────────────────────────────────────────
Kullanıcı    → Fatura bilgilerini girer (tutar, KDV, açıklama)
Kullanıcı    → Hesap kodlarını seçer
Sistem       → Borç-Alacak dengesi anlık hesaplanır
Kullanıcı    → VKN/TCKN girer → Otomatik algoritma doğrulaması
Kullanıcı    → "Kaydet" butonuna basar
Sistem       → Tüm validasyonlar çalışır
Sistem       → Kayıt "Taslak" statüsünde oluşturulur
Sistem       → Fiş numarası otomatik atanır (2025-00847)

ADIM 3: E-İMZA SÜRECİ BAŞLATMA
────────────────────────────────────────────────
Kullanıcı    → "E-İmzaya Gönder" butonuna basar
Sistem       → Tutar bazlı imzacı zinciri otomatik belirlenir
Sistem       → PDF/A belgesi oluşturulur (önizleme gösterilir)
Kullanıcı    → İmza zincirini onaylar
Sistem       → İmzacılara email + SMS bildirimi gönderir
Kayıt        → "Onay Bekliyor" statüsüne geçer

ADIM 4: İMZA TOPLAMA
────────────────────────────────────────────────
İmzacı       → Email linkine tıklar / sisteme giriş yapar
İmzacı       → Belgeyi inceler
İmzacı       → Akıllı kartını takar / Mobil imza PIN'ini girer
Sistem       → TÜBİTAK OCSP doğrulaması yapar
Sistem       → İmzayı belgeye işler, zaman damgası ekler
Sistem       → Sonraki imzacıya bildirim gönderir
[Tüm imzalar tamamlandıktan sonra]
Kayıt        → "İmzalandı" statüsüne geçer
Sistem       → Muhasebe defterine otomatik kaydeder
Sistem       → Arşiv sistemine gönderir
```

---

## Entegrasyon Noktaları

### Dış Servis Bağımlılıkları

```
┌────────────────────────────────────────────────────────────────┐
│                    DIŞ SERVİSLER                                │
│                                                                  │
│  ┌─────────────────────┐   ┌─────────────────────────────────┐ │
│  │   İçişleri Bak.     │   │       TÜBİTAK BİLGEM           │ │
│  │   UAVT REST API     │   │   BES (Belge Yönetim Sistemi)   │ │
│  │                     │   │                                  │ │
│  │  /il               │   │  OCSP Doğrulama Servisi         │ │
│  │  /ilce/{ilKod}     │   │  TSA (Zaman Damgası)            │ │
│  │  /mahalle/{ilcKod} │   │  Sertifika Doğrulama            │ │
│  │  /adres/{uavtKod}  │   │  CRL Listesi                    │ │
│  └─────────────────────┘   └─────────────────────────────────┘ │
│                                                                  │
│  ┌─────────────────────┐   ┌─────────────────────────────────┐ │
│  │   GİB (Gelir İd.    │   │     Akıllı Kart / Mobil İmza    │ │
│  │   Başkanlığı)       │   │         Middleware              │ │
│  │                     │   │                                  │ │
│  │  VKN Doğrulama      │   │  Java Applet / Native App       │ │
│  │  e-Fatura Entegr.   │   │  PKCS#11 Interface              │ │
│  │  e-Arşiv Fatura     │   │  Mobil İmza API (Turkcell vb.) │ │
│  └─────────────────────┘   └─────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### İç Sistem Entegrasyonları

```
MuhasebeEImzaModülü
        │
        ├──▶ KullaniciYonetimi      → Yetki kontrolü, role-based access
        ├──▶ BildirimServisi        → Email / SMS / Push (SignalR)
        ├──▶ DosyaYonetimi          → PDF saklama, belge versiyonlama
        ├──▶ DenetimGunlugu         → Her işlem audit log'a düşer
        ├──▶ RaporlamaServisi       → Mali tablolara veri besler
        └──▶ ArsivServisi           → Uzun süreli belge saklama
```

---

## API Referansı

### UAVT Endpoints

```http
# İlleri Listele
GET /api/v1/uavt/iller

# İlçeleri Listele
GET /api/v1/uavt/ilceler?ilKodu={ilKodu}

# Mahalleleri Listele
GET /api/v1/uavt/mahalleler?ilceKodu={ilceKodu}

# Adres Sorgula
GET /api/v1/uavt/adres/{uavtKodu}

# Adres Doğrula
POST /api/v1/uavt/dogrula
Content-Type: application/json
{
  "uavtKodu": "060630010001",
  "adresMetni": "Çankaya Mah. Atatürk Cad. No:5"
}

Response: 200 OK
{
  "gecerli": true,
  "normalizeAdres": "Çankaya Mah. Atatürk Cad. No:5/1, Çankaya/Ankara",
  "koordinatlar": { "lat": 39.9208, "lng": 32.8541 }
}
```

### Muhasebe Endpoints

```http
# Kayıt Oluştur
POST /api/v1/muhasebe/kayitlar
Authorization: Bearer {jwt}

# Kayıt Listele (sayfalı)
GET /api/v1/muhasebe/kayitlar?sayfa=1&boyut=20&durum=Taslak

# Kayıt Detayı
GET /api/v1/muhasebe/kayitlar/{kayitId}

# Taslak Güncelle
PUT /api/v1/muhasebe/kayitlar/{kayitId}

# E-İmzaya Gönder
POST /api/v1/muhasebe/kayitlar/{kayitId}/eimzaya-gonder

# İptal Et
DELETE /api/v1/muhasebe/kayitlar/{kayitId}
```

### E-İmza Endpoints

```http
# İmza Sürecini Başlat
POST /api/v1/eimza/baslat
{
  "kayitId": "uuid",
  "imzacilar": [
    { "kullaniciId": "uuid", "sira": 1, "zorunlu": true }
  ]
}

# İmza Sürecinin Durumu
GET /api/v1/eimza/surec/{surecId}/durum

# İmzacının İmzalaması
POST /api/v1/eimza/surec/{surecId}/imzala
{
  "imzaciId": "uuid",
  "imzaVerisi": "base64-pkcs7-data",
  "sertifikaNo": "string",
  "zamanDamgasi": "RFC3161-base64"
}

# İmzalı Belgeyi İndir
GET /api/v1/eimza/surec/{surecId}/belge
Accept: application/pdf

# İmzayı Doğrula
POST /api/v1/eimza/dogrula
{
  "belgeBase64": "...",
  "imzaBase64": "..."
}
```

---

## Güvenlik

### Yetki Matrisi

```
┌────────────────────────┬───────┬──────────┬─────────┬────────┐
│ İşlem                  │Kullan.│ Muhasebe │ Müdür   │ Admin  │
│                        │       │ Uzmanı   │         │        │
├────────────────────────┼───────┼──────────┼─────────┼────────┤
│ Taslak Oluştur         │  ❌   │    ✅    │   ✅    │   ✅   │
│ Taslak Görüntüle       │  ❌   │    ✅    │   ✅    │   ✅   │
│ UAVT Sorgula           │  ❌   │    ✅    │   ✅    │   ✅   │
│ E-İmzaya Gönder        │  ❌   │    ✅    │   ✅    │   ✅   │
│ İmzala (kendi payı)    │  ❌   │    ✅    │   ✅    │   ✅   │
│ İmza Zinciri Düzenle   │  ❌   │    ❌    │   ✅    │   ✅   │
│ İptal Et               │  ❌   │    ❌    │   ✅    │   ✅   │
│ Tüm Kayıtları Gör      │  ❌   │    ❌    │   ✅    │   ✅   │
│ Sistem Ayarları        │  ❌   │    ❌    │   ❌    │   ✅   │
└────────────────────────┴───────┴──────────┴─────────┴────────┘
```

### Veri Güvenliği

```
🔐 Transit Şifreleme   → TLS 1.3 zorunlu
🔐 Sertifika Pinning   → Certificate pinning aktif
🔐 İmza Bütünlüğü      → PKCS#7 CAdES-BES formatı
🔐 Zaman Damgası       → RFC 3161 uyumlu TSA
🔐 Belge Hash          → SHA-256 (SHA-1 kabul edilmez)
🔐 Oturum Güvenliği    → JWT + Redis sliding window
🔐 Rate Limiting       → UAVT endpoint'e 60 istek/dakika
🔐 Audit Log           → Her işlem değiştirilemez log'a kaydedilir
```

---

## Hata Yönetimi & Edge Case'ler

### UAVT Hata Senaryoları

| Senaryo | Kod | Davranış |
|---------|-----|----------|
| UAVT API erişilemiyor | `UAVT_001` | Cache'den son 24 saatlik veri kullanılır, kullanıcı uyarılır |
| Geçersiz adres kodu | `UAVT_002` | Form engellenIP, kırmızı uyarı gösterilir |
| API rate limit aşıldı | `UAVT_003` | Exponential backoff, 30 sn bekleme |
| Adres bulunamadı | `UAVT_004` | Manuel giriş modu aktive edilir |
| Koordinat eşleşmemesi | `UAVT_005` | Uyarı gösterilir, kullanıcı onaylayarak devam edebilir |

### Muhasebe Hata Senaryoları

| Senaryo | Kod | Davranış |
|---------|-----|----------|
| Borç ≠ Alacak | `MUH_001` | Kayıt engellenip fark tutarı gösterilir |
| Kapalı dönem hatası | `MUH_002` | Dönem bilgisi gösterilir, yönetici onayı istenir |
| Geçersiz hesap kodu | `MUH_003` | Önerilen hesap kodları listelenir |
| Çift kayıt uyarısı | `MUH_004` | Benzer kayıt bulundu uyarısı, kullanıcı devam edebilir |
| VKN/TCKN geçersiz | `MUH_005` | Algoritma hatası detaylı gösterilir |

### E-İmza Hata Senaryoları

| Senaryo | Kod | Davranış |
|---------|-----|----------|
| Sertifika süresi dolmuş | `EIM_001` | İmza reddedilir, kullanıcı bilgilendirilir |
| Akıllı kart takılı değil | `EIM_002` | Middleware rehberlik adımları gösterir |
| OCSP erişilemiyor | `EIM_003` | CRL ile fallback doğrulama, log'a not düşülür |
| PIN yanlış (3 deneme) | `EIM_004` | Kart kilitleniyor uyarısı, süreç durdurulur |
| Belge değiştirilmiş | `EIM_005` | Hash uyuşmazlığı, imza iptal edilir |
| Yanlış imzacı | `EIM_006` | Sertifika sahibi ≠ tanımlı imzacı hatası |
| Zaman dilimi uyuşmazlığı | `EIM_007` | Sunucu saati baz alınır, kullanıcı uyarılır |

### Bağlantı Kesilmesi Senaryoları

```
İmza sırasında bağlantı kesilirse:
  → Partial signature state Redis'e yazılır (TTL: 30 dk)
  → Kullanıcı oturumu yenilediğinde kaldığı yerden devam eder
  → 30 dakika sonra state temizlenir, imza iptal edilir
  → İmzacıya otomatik email gönderilir: "İmza tamamlanamadı"
```

---

## Kurulum & Geliştirme

### Önkoşullar

```bash
# Backend
.NET 8 SDK
MySQL 8.0+
Redis 7.0+
Docker Desktop

# Dış Servis Erişimleri
UAVT API Entegrasyon Anahtarı (İçişleri Bak. başvurusu gerekir)
TÜBİTAK BES Test Ortamı Kredansiyalleri
```

### Ortam Değişkenleri

```env
# UAVT
UAVT_API_BASE_URL=https://adres.nvi.gov.tr/api
UAVT_API_KEY=your_api_key_here
UAVT_CACHE_TTL_MINUTES=1440

# E-İmza
EIMZA_GATEWAY_URL=https://bes.tubitak.gov.tr
EIMZA_OCSP_URL=https://ocsp.tubitak.gov.tr
EIMZA_TSA_URL=https://tsa.tubitak.gov.tr
EIMZA_CLIENT_CERT_PATH=/certs/client.pfx
EIMZA_CLIENT_CERT_PASSWORD=secret

# Muhasebe
MUHASEBE_MAX_TUTAR_MUDUR_ONAY=50000
MUHASEBE_MAX_TUTAR_GM_ONAY=500000
MUHASEBE_DONEM_KAPATMA_GUN=5
```

### Geliştirici Notları

```
💡 UAVT API Test Modu:
   Geliştirme ortamında appsettings.Development.json içinde
   "UavtApiMock": true ayarıyla mock servis aktive olur.
   Mock veri: /TestData/uavt-mock-data.json

💡 E-İmza Test Ortamı:
   TÜBİTAK BES test sertifikaları kullanılabilir.
   Test sertifika bilgileri: /docs/tubitak-test-env.md

💡 Akıllı Kart Middleware (Lokal):
   Windows: akis-middleware kurulu olmalı
   macOS: OpenSC + CACKey
   Linux: OpenSC + pcscd servisi çalışıyor olmalı
```

---

## Ekran Açıklamaları (UI Sections)

### Ana Sayfa Bölümleri

```
┌─────────────────────────────────────────────────────────────────────┐
│  [← Geri]    Yeni Muhasebe Kaydı               [Taslak Kaydet] [?] │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ① ADRES DOĞRULAMA                                          [✅ OK]  │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ İl: [Ankara ▼]  İlçe: [Çankaya ▼]  Mahalle: [Kızılay ▼]      │ │
│  │ Cadde/Sokak: [Atatürk Bulvarı ▼]   No: [45] Daire: [  ]       │ │
│  │                                                                  │ │
│  │ 🏠 UAVT Kodu: 060630010045   [Haritada Göster]                 │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ② KARŞI TARAF BİLGİLERİ                                            │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ Ad/Unvan: [_________________________]  Tip: ● Şirket ○ Şahıs   │ │
│  │ VKN: [__________] ✅                  Vergi D.: [_____________] │ │
│  │ Adres: [Atatürk Bul. No:45, Kızılay/Ankara] (UAVT'dan geldi)  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ③ İŞLEM BİLGİLERİ                                                  │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ Fiş Tipi: [Satış Faturası ▼]   Tarih: [27.04.2025]             │ │
│  │ Açıklama: [________________________________________]            │ │
│  │ Döviz: [TRY ▼]                                                  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ④ KALEM LİSTESİ                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ Hesap Kodu    │ Açıklama    │  Borç      │  Alacak   │ KDV     │ │
│  │ 600.01        │ Hizmet Sat. │ 100.000,00 │           │  %20    │ │
│  │ 391.18        │ Hes. KDV    │  20.000,00 │           │         │ │
│  │ 120.001       │ Alıcılar    │            │120.000,00 │         │ │
│  │ [+ Kalem Ekle]                                                  │ │
│  │                             │ 120.000,00 │120.000,00 │ ✅ Denge│ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                       │
│  ⑤ E-İMZA                                       [E-İmzaya Gönder ▶] │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │ İmza Zinciri (Tutar 120.000₺ → 2 imzacı gerekli):             │ │
│  │  1. Ayşe Kaya (Muhasebe Uzmanı)    ⏳ Bekliyor                 │ │
│  │  2. Mehmet Demir (Mali İşler Müd.) ⏳ Bekliyor                 │ │
│  │                                                                  │ │
│  │ [📄 Belge Önizleme]  [📋 İmza Geçmişi]                        │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📎 İlgili Belgeler

| Belge | Konum |
|-------|-------|
| UAVT API Teknik Kılavuzu | `/docs/uavt-api-guide.md` |
| TÜBİTAK BES Entegrasyon Kılavuzu | `/docs/tubitak-bes-integration.md` |
| Tekdüzen Hesap Planı Referansı | `/docs/tek-duzen-hesap-plani.md` |
| E-İmza Hukuki Çerçeve (5070 Sayılı Kanun) | `/docs/legal/5070-kanun-ozeti.md` |
| Test Senaryoları | `/tests/integration/muhasebe-eimza-tests.md` |

---

## 📞 Destek & İletişim

```
Teknik Sorunlar   → backend-team@sirket.com.tr
UAVT Entegrasyon  → İçişleri Bakanlığı e-Devlet Hizmetleri
TÜBİTAK BES      → https://bes.tubitak.gov.tr/destek
Akıllı Kart       → akiskart.com.tr/destek
```

---

*Son Güncelleme: Nisan 2025 | Versiyon: 1.0.0 | Durum: Aktif Geliştirme*
