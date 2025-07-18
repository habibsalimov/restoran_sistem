# Restoran Sipariş Takip Sistemi

Bu proje, bilgisayarlı görü teknolojileri kullanarak restoran masalarındaki yemek siparişlerini otomatik olarak tanıyan, fiyatlandıran ve garson performansını ölçen web tabanlı demo sistemidir.

## Özellikler

### 🎥 Dual Video Player
- İki masa için eşzamanlı video oynatma
- Masa 1: Normal senaryo
- Masa 2: Gecikme senaryosu
- Gerçek zamanlı video kontrolleri
- **YOLOv8 Object Detection**: Gerçek zamanlı nesne algılama
- **Etiketsiz Bounding Box**: Hızlı görünüp kaybolan yeşil kutular

### 📊 Masa Durumu Dashboard
- 2 masa için anlık durum takibi
- Müşteri gelişi ve garson atama zamanları
- Masa durumu: Boş, Bekliyor, Hizmet Veriliyor
- Gecikme uyarıları (1 dakika kuralı)

### 👨‍💼 Garson Performans Takibi
- Garson A ve Garson B performans skorları
- Yanıt süresi ölçümü
- Gecikme sayacı ve performans derecelendirmesi
- Görsel performans göstergeleri

### 💰 Anlık Fiyatlandırma
- Yemek kategorileri ve fiyatları:
  - 🍽️ Ana Yemek: 200 TL
  - 🍲 Çorba: 90 TL
  - 🥤 İçecek: 20 TL
  - 🥗 Salata: 70 TL
  - 🍰 Tatlı: 100 TL
- Masa bazlı sipariş takibi
- Günlük satış özetleri

### 🎛️ Simülasyon Kontrolleri
- QR kod tanıma simülasyonu
- Mavi mendil algılama (masa sıfırlama)
- Manuel test kontrolleri

### 📈 Rapor Sistemi
- Oturum bazlı detaylı raporlar
- Garson performans analizi
- Gelir ve sipariş istatistikleri
- Günlük özet raporları

## Teknoloji Stack

- **Framework**: Next.js 15 (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (kurulum gerekli)
- **Font**: Geist Sans & Geist Mono

## Kurulum

1. Proje dizinine geçin:
```bash
cd my-app
```

2. Node.js bağımlılıklarını yükleyin:
```bash
npm install
```

3. Python bağımlılıklarını yükleyin:
```bash
pip install -r requirements.txt
```

4. Environment değişkenlerini ayarlayın:
```bash
# .env.local dosyasını düzenleyin
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Supabase database'i kurun:
```bash
# database/schema.sql dosyasını Supabase'de çalıştırın
```

6. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

7. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## Komutlar

```bash
# Geliştirme sunucusu (Turbopack ile)
npm run dev

# Production build
npm run build

# Production sunucusu
npm start

# Kod kalitesi kontrolü
npm run lint
```

## Proje Yapısı

```
src/
├── app/
│   ├── api/
│   │   └── detect/
│   │       └── route.ts    # YOLO detection API
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Ana sayfa
│   └── globals.css         # Global stiller + animations
├── components/
│   ├── DualVideoPlayer.tsx # Dual video player
│   ├── TableDashboard.tsx  # Masa durumu dashboard
│   ├── TableStatus.tsx     # Masa durumu bileşeni
│   ├── WaiterPerformance.tsx # Garson performansı
│   ├── PricingCalculator.tsx # Fiyatlandırma hesaplayıcı
│   ├── ReportGenerator.tsx  # Rapor sistemi
│   ├── VideoPlayer.tsx     # Enhanced video player with YOLO
│   └── DetectionOverlay.tsx # Bounding box overlay
├── lib/
│   ├── supabase.ts         # Supabase client
│   └── detection.ts        # YOLO detection utilities
├── python/
│   └── detect.py           # YOLOv8 detection script
models/
└── best2.pt                # YOLOv8 model file
database/
└── schema.sql              # Database şeması
docs/
└── PRD.md                  # Ürün gereksinim belgesi
requirements.txt            # Python dependencies
```

## Simulasyon Senaryoları

### Masa 1 - Hızlı Senaryo
- 00:10 - 👥 Müşteri gelişi (Sipariş Bekliyor)
- 00:18 - 👨‍🍳 Garson A atanması (Sipariş Alındı)
- 00:33 - 🍽️ Yemek servisi (Ana yemek 45 TL + Yan yemek 15 TL + Çorba 25 TL + Yan ürün 8 TL + Su 5 TL = 98 TL)
- 00:55 - 🧽 Masa sıfırlama (Boş)

### Masa 2 - Gecikme Senaryosu
- 00:08 - Müşteri gelir
- 00:58 - 50 saniye kuralı uyarısı
- 01:15 - Garson QR kodu gösterir (geç)
- 01:20 - Garson masaya gelir
- 01:25 - Müşteri memnuniyetsiz
- 01:30 - Masa sıfırlanır

## Performans Metrikleri

- **Başlangıç puanı**: 100
- **Zamanında hizmet**: +5 puan
- **1 dakika gecikme**: -10 puan
- **2+ dakika gecikme**: -20 puan
- **Müşteri memnuniyetsizliği**: -15 puan

## Gelecek Geliştirmeler

- [ ] Gerçek video dosyaları entegrasyonu
- [ ] WebRTC ile canlı video stream
- [ ] Gerçek bilgisayarlı görü algoritmaları
- [ ] Kullanıcı yetkilendirme sistemi
- [ ] Mobil uygulama desteği
- [ ] Gelişmiş analitik dashboard

## Lisans

Bu proje demo amaçlıdır ve eğitim amaçlı kullanım için tasarlanmıştır.

## Destek

Herhangi bir sorun için lütfen proje dokümantasyonunu inceleyin veya geliştirici ile iletişime geçin.
