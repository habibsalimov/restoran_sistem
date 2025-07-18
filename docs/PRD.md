# Restoran Yemek Fiyatı ve Garson Performansı Ölçme Sistemi
## Product Requirements Document (PRD)

### 1. Proje Özeti
Bilgisayarlı görü teknolojileri kullanarak restoran masalarındaki yemek siparişlerini otomatik olarak tanıyan, fiyatlandıran ve garson performansını ölçen web tabanlı demo sistemi.

### 2. Sistem Mimarisi

#### 2.1 Genel Yapı
- **2 masa sistemi** (Masa 1 ve Masa 2)
- **2 video stream** (her masa için 1 video)
- **Web tabanlı interface**
- **Supabase backend**
- **Otomatik timeline işleyişi**

#### 2.2 Garson Atama Sistemi
- **Masa 1**: Garson A
- **Masa 2**: Garson B

### 3. Fonksiyonel Gereksinimler

#### 3.1 Video İşleme ve Timeline
- **Masa 1 Video Senaryosu**: Müşteri gelir, normal sürede sipariş verir
- **Masa 2 Video Senaryosu**: Garson gecikir, müşteri sipariş veremez
- **Otomatik timeline**: Videolar belirli zaman damgalarında otomatik event'leri tetikler
- **QR kod tanıma**: Belirlenen saniyede garson QR kodu görünür ve sistem otomatik atama yapar

#### 3.2 Yemek Kategorileri ve Fiyatlandırma
| Kategori | Fiyat |
|----------|--------|
| Ana Yemek | 200 TL |
| Çorba | 90 TL |
| İçecek | 20 TL |
| Salata | 70 TL |
| Tatlı | 100 TL |

#### 3.3 Performans Ölçümü
- **1 dakika kuralı**: Müşteri geldikten 1 dakika sonra garson gelmezse uyarı
- **Negatif performans**: Gecikme durumunda garson puanı düşer
- **Pozitif performans**: Zamanında hizmet ile garson puanı artar

#### 3.4 Masa Sıfırlama Sistemi
- **Mavi mendil algılaması**: Garson masa temizliği için açık mavi mendil yerleştirir
- **Otomatik sıfırlama**: Mendil algılandığında masa hesabı sıfırlanır
- **Rapor tetikleme**: Sıfırlama anında o masa için rapor oluşturulur

### 4. Teknik Gereksinimler

#### 4.1 Frontend
- **Framework**: React/Vue.js veya vanilla JavaScript
- **Video Player**: HTML5 video
- **UI Bileşenleri**: 
  - 2 video player (eşzamanlı oynatma)
  - Real-time masa durumu paneli
  - Garson performans göstergeleri
  - Anlık fiyat hesaplayıcısı

#### 4.2 Backend
- **Database**: Supabase
- **Authentication**: Demo için gerekli değil
- **API Endpoints**:
  - Sipariş ekleme/güncelleme
  - Garson performans güncelleme
  - Masa sıfırlama
  - Rapor oluşturma

#### 4.3 Database Schema

```sql
-- Masalar tablosu
CREATE TABLE tables (
  id SERIAL PRIMARY KEY,
  table_number INTEGER NOT NULL,
  status VARCHAR(20) DEFAULT 'empty',
  current_waiter_id INTEGER,
  customer_arrival_time TIMESTAMP,
  waiter_arrival_time TIMESTAMP,
  total_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Garsonlar tablosu
CREATE TABLE waiters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  qr_code VARCHAR(50) UNIQUE,
  performance_score INTEGER DEFAULT 100,
  total_served_tables INTEGER DEFAULT 0,
  late_arrivals INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Siparişler tablosu
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  table_id INTEGER REFERENCES tables(id),
  waiter_id INTEGER REFERENCES waiters(id),
  food_category VARCHAR(50) NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  order_time TIMESTAMP DEFAULT NOW()
);

-- Raporlar tablosu
CREATE TABLE reports (
  id SERIAL PRIMARY KEY,
  table_id INTEGER REFERENCES tables(id),
  waiter_id INTEGER REFERENCES waiters(id),
  session_start TIMESTAMP,
  session_end TIMESTAMP,
  total_amount DECIMAL(10,2),
  items_served INTEGER,
  performance_rating INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Simulasyon Timeline

#### 5.1 Masa 1 Başarılı Senaryo
```
00:00 - Video başlar
00:05 - Müşteri gelir (customer_arrival_time)
00:30 - Garson QR kod gösterir (waiter assignment)
00:35 - Garson masaya gelir (waiter_arrival_time)
01:00 - İlk yemek gelir (Ana yemek)
01:30 - İkinci yemek gelir (Çorba)
02:00 - İçecek gelir
02:30 - Müşteri kalkar
02:35 - Garson mavi mendil yerleştirir
02:40 - Masa sıfırlanır, rapor oluşur
```

#### 5.2 Masa 2 Gecikme Senaryosu
```
00:00 - Video başlar
00:08 - Müşteri gelir (customer_arrival_time)
01:10 - UYARI: Garson 1 dakikada gelmedi
01:15 - Garson QR kod gösterir (geç atama)
01:20 - Garson masaya gelir (waiter_arrival_time)
01:25 - Müşteri memnuniyetsiz, kalkar
01:30 - Garson mavi mendil yerleştirir
01:35 - Masa sıfırlanır, negatif rapor oluşur
```

### 6. Kullanıcı Arayüzü

#### 6.1 Ana Dashboard
- **Üst Panel**: İki video player yan yana
- **Orta Panel**: 
  - Masa durumları (boş/dolu/hesap açık)
  - Güncel siparişler ve fiyatlar
  - Garson performans skorları
- **Alt Panel**: 
  - Anlık uyarılar
  - Son raporlar listesi

#### 6.2 Rapor Ekranı
- **Masa bazlı rapor**: Hangi yemekler, ne kadar miktar
- **Garson performansı**: Hizmet süresi, müşteri memnuniyeti
- **Günlük özet**: Toplam satış, ortalama hizmet süresi
- **Filtreleme**: Tarih, masa, garson bazlı filtreleme

### 7. Performans Metrikleri

#### 7.1 Garson Değerlendirme
- **Başlangıç puanı**: 100
- **Zamanında hizmet**: +5 puan
- **1 dakika gecikme**: -10 puan
- **2+ dakika gecikme**: -20 puan
- **Müşteri memnuniyetsizliği**: -15 puan

#### 7.2 Sistem Metrikleri
- **Doğru sipariş tanıma oranı**: %95+ hedef
- **Ortalama hizmet süresi**: <60 saniye hedef
- **Masa devir hızı**: Günlük rapor

### 8. Güvenlik ve Kısıtlamalar

#### 8.1 Demo Kısıtlamaları
- **Güvenlik**: Şu aşamada güvenlik sistemi yok
- **Kullanıcı yönetimi**: Herkese açık sistem
- **Veri korunması**: Demo verileri, gerçek müşteri bilgisi yok

#### 8.2 Gelecek Sürümler İçin
- **Kullanıcı authentication**
- **Role-based access control**
- **Veri şifreleme**
- **GDPR compliance**

### 9. Test Senaryoları

#### 9.1 Pozitif Test Durumları
- ✅ Normal sipariş akışı
- ✅ Doğru fiyat hesaplama
- ✅ Garson performans artışı
- ✅ Başarılı masa sıfırlama

#### 9.2 Negatif Test Durumları
- ❌ Garson gecikme uyarısı
- ❌ Yanlış QR kod tanıma
- ❌ Mendil algılama hatası
- ❌ Database bağlantı sorunu

### 10. Teslim Programı

#### 10.1 Milestone'lar
- **17 Temmuz**: Backend API ve database kurulumu
- **18 Temmuz Sabah**: Frontend geliştirme tamamlama
- **18 Temmuz Öğle**: Test ve debug
- **18 Temmuz Akşam**: Final teslim

#### 10.2 Deliverable'lar
- ✅ Çalışan web uygulaması
- ✅ Supabase database kurulumu
- ✅ Demo videoları ile entegrasyon
- ✅ Rapor sistemi
- ✅ Kullanım kılavuzu

---

**Son Güncelleme**: 17 Temmuz 2025  
**Proje Durumu**: Geliştirme aşamasında  
**Teslim Tarihi**: 18 Temmuz 2025