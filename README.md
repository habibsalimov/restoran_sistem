# RestaurantIQ - AI-Powered Restaurant Management Platform

**🌐 Language / Dil Seçimi**

[![English](https://img.shields.io/badge/Language-English-blue.svg)](#english) [![Türkçe](https://img.shields.io/badge/Dil-Türkçe-red.svg)](#türkçe)

---

## English

**Revolutionizing Restaurant Operations Through Computer Vision and Real-Time Analytics**

[![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)](https://github.com/restaurantiq/platform)
[![License](https://img.shields.io/badge/license-Enterprise-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

### 🚀 Overview

RestaurantIQ is an enterprise-grade restaurant management platform that leverages cutting-edge computer vision technology and AI-powered analytics to optimize restaurant operations, enhance customer satisfaction, and maximize revenue potential.

Our platform provides real-time monitoring of table activities, automated order tracking, staff performance analytics, and intelligent pricing optimization - all through a sophisticated web-based dashboard.

### ✨ Core Features

#### 🎯 AI-Powered Table Monitoring
- **Multi-Table Surveillance**: Simultaneous monitoring of multiple dining areas
- **YOLOv8 Object Detection**: Advanced real-time food and object recognition
- **Smart Event Detection**: Automated customer arrival and departure tracking
- **Intelligent Status Updates**: Real-time table status management

#### 👥 Staff Performance Analytics
- **Performance Scoring**: Advanced algorithms tracking service efficiency
- **Response Time Analytics**: Precise measurement of staff response times
- **Performance Alerts**: Instant notifications for service delays
- **Comprehensive Reporting**: Detailed staff performance insights

#### 💰 Dynamic Pricing & Revenue Optimization
- **Intelligent Menu Pricing**: AI-driven pricing recommendations
- **Real-Time Revenue Tracking**: Live financial analytics per table
- **Category-Based Pricing**: Sophisticated pricing models by food categories
- **Revenue Optimization**: Data-driven insights for profit maximization

#### 📊 Advanced Dashboard & Analytics
- **Executive Dashboard**: Comprehensive overview of restaurant operations
- **Real-Time Metrics**: Live performance indicators and KPIs
- **Custom Reporting**: Tailored reports for different stakeholder needs
- **Data Visualization**: Interactive charts and performance graphs

#### 🔄 Automated Workflow Management
- **QR Code Integration**: Seamless staff identification and assignment
- **Table Reset Automation**: Intelligent table turnover optimization
- **Service Flow Optimization**: Streamlined operational workflows
- **Alert Management**: Proactive notification system

### 🏗️ Architecture & Technology Stack

#### Frontend Technologies
- **Framework**: Next.js 15 with App Router architecture
- **Language**: TypeScript for type-safe development
- **Styling**: Tailwind CSS v4 with custom design system
- **State Management**: React Server Components with optimized state handling
- **Fonts**: Geist Sans & Geist Mono for optimal readability

#### Backend Infrastructure
- **Database**: Supabase with PostgreSQL for scalable data management
- **API**: RESTful APIs with Next.js API routes
- **Authentication**: Supabase Auth with role-based access control
- **Real-Time**: WebSocket connections for live updates

#### AI & Computer Vision
- **Object Detection**: YOLOv8 for accurate food and object recognition
- **Image Processing**: Advanced computer vision algorithms
- **Machine Learning**: Custom models for restaurant-specific scenarios
- **Performance Optimization**: Edge computing for low-latency processing

### 🚀 Quick Start Guide

#### Prerequisites
- Node.js 18.0.0 or higher
- Python 3.8+ for AI components
- PostgreSQL database access
- Supabase account for backend services

#### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/restaurantiq/platform.git
cd restaurantiq-platform
```

2. **Install Dependencies**
```bash
# Install Node.js dependencies
npm install

# Install Python AI dependencies
pip install -r requirements.txt
```

3. **Environment Configuration**
```bash
# Create environment configuration
cp .env.example .env.local

# Configure your environment variables
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

4. **Database Setup**
```bash
# Initialize database schema
psql -h your_host -U your_user -d your_db -f database/schema.sql
```

5. **Launch Application**
```bash
# Start development server
npm run dev

# Access dashboard at http://localhost:3000
```

### 📄 Licensing & Enterprise Support

RestaurantIQ is available under enterprise licensing with flexible pricing models. For detailed information, contact our sales team at sales@restaurantiq.com

---

## Türkçe

**Bilgisayarlı Görü ve Gerçek Zamanlı Analitik ile Restoran Operasyonlarında Devrim**

[![Versiyon](https://img.shields.io/badge/versiyon-2.1.0-blue.svg)](https://github.com/restaurantiq/platform)
[![Lisans](https://img.shields.io/badge/lisans-Kurumsal-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

### 🚀 Genel Bakış

RestaurantIQ, restoran operasyonlarını optimize etmek, müşteri memnuniyetini artırmak ve gelir potansiyelini maksimize etmek için en son bilgisayarlı görü teknolojileri ve yapay zeka destekli analitiği kullanan kurumsal düzeyde bir restoran yönetim platformudur.

Platformumuz, sofistike web tabanlı dashboard aracılığıyla masa aktivitelerinin gerçek zamanlı izlenmesi, otomatik sipariş takibi, personel performans analitiği ve akıllı fiyatlandırma optimizasyonu sağlar.

### ✨ Temel Özellikler

#### 🎯 Yapay Zeka Destekli Masa İzleme
- **Çoklu Masa Gözetimi**: Birden fazla yemek alanının eşzamanlı izlenmesi
- **YOLOv8 Nesne Algılama**: Gelişmiş gerçek zamanlı yemek ve nesne tanıma
- **Akıllı Olay Algılama**: Otomatik müşteri varış ve ayrılış takibi
- **Zeki Durum Güncellemeleri**: Gerçek zamanlı masa durumu yönetimi

#### 👥 Personel Performans Analitiği
- **Performans Puanlama**: Hizmet verimliliğini izleyen gelişmiş algoritmalar
- **Yanıt Süresi Analitiği**: Personel yanıt sürelerinin hassas ölçümü
- **Performans Uyarıları**: Hizmet gecikmeleri için anlık bildirimler
- **Kapsamlı Raporlama**: Detaylı personel performans içgörüleri

#### 💰 Dinamik Fiyatlandırma ve Gelir Optimizasyonu
- **Akıllı Menü Fiyatlandırması**: Yapay zeka destekli fiyat önerileri
- **Gerçek Zamanlı Gelir Takibi**: Masa bazlı canlı finansal analitik
- **Kategori Bazlı Fiyatlandırma**: Yemek kategorilerine göre sofistike fiyatlandırma modelleri
- **Gelir Optimizasyonu**: Kar maksimizasyonu için veri odaklı içgörüler

#### 📊 Gelişmiş Dashboard ve Analitik
- **Yönetici Dashboard'u**: Restoran operasyonlarının kapsamlı görünümü
- **Gerçek Zamanlı Metrikler**: Canlı performans göstergeleri ve KPI'lar
- **Özel Raporlama**: Farklı paydaş ihtiyaçlarına özel raporlar
- **Veri Görselleştirme**: Etkileşimli grafikler ve performans çizelgeleri

#### 🔄 Otomatik İş Akışı Yönetimi
- **QR Kod Entegrasyonu**: Sorunsuz personel kimlik doğrulama ve atama
- **Masa Sıfırlama Otomasyonu**: Akıllı masa devir optimizasyonu
- **Hizmet Akışı Optimizasyonu**: Kolaylaştırılmış operasyonel iş akışları
- **Uyarı Yönetimi**: Proaktif bildirim sistemi

### 🏗️ Mimari ve Teknoloji Yığını

#### Frontend Teknolojileri
- **Framework**: App Router mimarisi ile Next.js 15
- **Dil**: Tip güvenli geliştirme için TypeScript
- **Stil**: Özel tasarım sistemi ile Tailwind CSS v4
- **Durum Yönetimi**: Optimize edilmiş durum işleme ile React Server Components
- **Fontlar**: Optimal okunabilirlik için Geist Sans & Geist Mono

#### Backend Altyapısı
- **Veritabanı**: Ölçeklenebilir veri yönetimi için PostgreSQL ile Supabase
- **API**: Next.js API rotaları ile RESTful API'lar
- **Kimlik Doğrulama**: Rol tabanlı erişim kontrolü ile Supabase Auth
- **Gerçek Zamanlı**: Canlı güncellemeler için WebSocket bağlantıları

#### Yapay Zeka ve Bilgisayarlı Görü
- **Nesne Algılama**: Doğru yemek ve nesne tanıma için YOLOv8
- **Görüntü İşleme**: Gelişmiş bilgisayarlı görü algoritmaları
- **Makine Öğrenmesi**: Restoran özel senaryoları için özel modeller
- **Performans Optimizasyonu**: Düşük gecikme için edge computing

### 🚀 Hızlı Başlangıç Kılavuzu

#### Ön Gereksinimler
- Node.js 18.0.0 veya üstü
- AI bileşenleri için Python 3.8+
- PostgreSQL veritabanı erişimi
- Backend hizmetleri için Supabase hesabı

#### Kurulum

1. **Repository'yi Klonlayın**
```bash
git clone https://github.com/restaurantiq/platform.git
cd restaurantiq-platform
```

2. **Bağımlılıkları Yükleyin**
```bash
# Node.js bağımlılıklarını yükle
npm install

# Python AI bağımlılıklarını yükle
pip install -r requirements.txt
```

3. **Ortam Yapılandırması**
```bash
# Ortam yapılandırması oluştur
cp .env.example .env.local

# Ortam değişkenlerinizi yapılandırın
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

4. **Veritabanı Kurulumu**
```bash
# Veritabanı şemasını başlat
psql -h your_host -U your_user -d your_db -f database/schema.sql
```

5. **Uygulamayı Başlatın**
```bash
# Geliştirme sunucusunu başlat
npm run dev

# Dashboard'a http://localhost:3000 adresinden erişin
```

### 🎯 İş Zekası Özellikleri

#### Performans Metrikleri
- **Hizmet Verimlilik Puanı**: Kapsamlı personel performans değerlendirmesi (0-100)
- **Müşteri Memnuniyet Endeksi**: Yapay zeka türevi memnuniyet metrikleri
- **Masa Başına Gelir**: Gerçek zamanlı finansal performans takibi
- **Masa Devir Oranı**: Oturma verimliliği için optimizasyon metrikleri

#### Fiyatlandırma Zekası
| Kategori | Temel Fiyat | Dinamik Aralık | Optimizasyon |
|----------|-------------|----------------|--------------|
| 🍽️ Ana Yemek | 200 TL | 180-220 TL | Yoğun saat ayarlamaları |
| 🍲 Çorba | 90 TL | 80-100 TL | Mevsimsel optimizasyon |
| 🥤 İçecekler | 20 TL | 18-25 TL | Hacim bazlı fiyatlandırma |
| 🥗 Salatalar | 70 TL | 65-80 TL | Tazelik bazlı fiyatlandırma |
| 🍰 Tatlılar | 100 TL | 90-115 TL | Özel durum fiyatlandırması |

#### Hizmet Seviyesi Anlaşmaları (SLA'lar)
- **Yanıt Süresi Standardı**: Müşteri varışından maksimum 60 saniye
- **Hizmet Kalitesi Eşiği**: %95 müşteri memnuniyeti hedefi
- **Masa Devir Hedefi**: Ortalama 90 dakika yemek süresi
- **Sipariş Doğruluk Oranı**: Sipariş algılamada %99.5 hassasiyet

### 🔧 Yapılandırma ve Özelleştirme

#### AI Model Yapılandırması
```typescript
// Algılama parametrelerini yapılandır
export const detectionConfig = {
  confidence: 0.75,
  maxDetections: 10,
  modelPath: './models/best2.pt',
  classes: ['food', 'plate', 'cup', 'napkin'],
  realTimeProcessing: true
};
```

#### Performans Eşikleri
```typescript
// Performans metriklerini özelleştir
export const performanceSettings = {
  baseScore: 100,
  timelyServiceBonus: 5,
  oneMinuteDelayPenalty: -10,
  twoMinuteDelayPenalty: -20,
  customerDissatisfactionPenalty: -15
};
```

### 🛡️ Güvenlik ve Uyumluluk

#### Veri Korunması
- **Uçtan Uca Şifreleme**: TLS 1.3 ile güvenli tüm veri aktarımları
- **GDPR Uyumluluğu**: Avrupa veri koruma düzenlemelerine tam uyumluluk
- **PCI DSS**: Güvenli ödeme verisi işleme standartları
- **Rol Tabanlı Erişim**: Granüler izin yönetimi

#### Gizlilik Özellikleri
- **Anonimleştirilmiş Analitik**: Veri anonimleştirme yoluyla müşteri gizliliği koruması
- **Denetim İzleri**: Tüm sistem aktivitelerinin kapsamlı kayıt tutması
- **Veri Saklama**: Yapılandırılabilir veri saklama politikaları
- **Güvenli Yedeklemeler**: Felaket kurtarma ile şifreli yedekleme sistemleri

### 📈 Analitik ve Raporlama

#### Yönetici Dashboard'u
- **Gerçek Zamanlı KPI'lar**: Canlı performans göstergeleri
- **Gelir Analitiği**: Kapsamlı finansal içgörüler
- **Operasyonel Metrikler**: Hizmet verimlilik ölçümleri
- **Tahmine Dayalı Analitik**: Yapay zeka destekli tahminleme

#### Özel Raporlar
- **Günlük Operasyon Özeti**: Tam operasyonel genel bakış
- **Personel Performans Raporları**: Bireysel ve takım analitiği
- **Gelir Optimizasyon Raporları**: Kar maksimizasyon içgörüleri
- **Müşteri Memnuniyet Analizi**: Detaylı memnuniyet metrikleri

### 🌐 Kurumsal Özellikler

#### Çoklu Lokasyon Desteği
- **Merkezi Yönetim**: Birden fazla restoran lokasyonunu yönetme
- **Çapraz Lokasyon Analitiği**: Karşılaştırmalı performans analizi
- **Birleşik Raporlama**: Tüm lokasyonlar genelinde konsolide içgörüler
- **Franchise Yönetimi**: Franchise operasyonları için araçlar

#### Entegrasyon Yetenekleri
- **POS Sistem Entegrasyonu**: Mevcut POS sistemleri ile sorunsuz entegrasyon
- **Envanter Yönetimi**: Envanter yönetim çözümleri ile bağlantı
- **CRM Entegrasyonu**: Müşteri ilişkileri yönetimi bağlantısı
- **Üçüncü Taraf API'lar**: Kapsamlı API ekosistem desteği

### 🚀 Ölçeklenebilirlik ve Performans

#### Yüksek Erişilebilirlik
- **%99.9 Çalışma Süresi SLA**: Kurumsal düzeyde güvenilirlik
- **Otomatik Ölçeklendirme**: Talebe dayalı otomatik kaynak ölçeklendirme
- **Yük Dengeleme**: Dağıtılmış trafik yönetimi
- **Felaket Kurtarma**: Kapsamlı yedekleme ve kurtarma sistemleri

#### Performans Optimizasyonu
- **Edge Computing**: Edge işleme yoluyla azaltılmış gecikme
- **CDN Entegrasyonu**: Küresel içerik dağıtım ağı
- **Veritabanı Optimizasyonu**: Gelişmiş sorgu optimizasyonu ve indeksleme
- **Önbellekleme Stratejileri**: Optimal performans için çok katmanlı önbellekleme

### 📞 Kurumsal Destek

#### Destek Seviyeleri
- **7/24 Premium Destek**: Gece gündüz teknik yardım
- **Özel Hesap Yöneticisi**: Kişisel destek temsilcisi
- **Özel Eğitim Programları**: Kapsamlı personel eğitimi
- **Uygulama Hizmetleri**: Profesyonel kurulum ve yapılandırma

#### Profesyonel Hizmetler
- **Özel Geliştirme**: Özel özellik geliştirme
- **Sistem Entegrasyonu**: Profesyonel entegrasyon hizmetleri
- **Veri Taşıma**: Mevcut sistemlerden sorunsuz veri taşıma
- **Performans Optimizasyonu**: Gelişmiş performans ayarlama

### 📄 Lisanslama ve Fiyatlandırma

RestaurantIQ, esnek fiyatlandırma modelleri ile kurumsal lisanslama altında mevcuttur:

- **Başlangıç Sürümü**: Tek lokasyonlu restoranlar için mükemmel
- **Profesyonel Sürüm**: Büyüyen zincirler için gelişmiş özellikler
- **Kurumsal Sürüm**: Büyük organizasyonlar için tam özellikli çözüm
- **Özel Çözümler**: Spesifik gereksinimler için özel paketler

Detaylı fiyatlandırma bilgileri ve kurumsal lisanslama için satış ekibimizle iletişime geçin.

### 🤝 Katkıda Bulunma ve Topluluk

Geliştirici topluluğundan katkıları memnuniyetle karşılıyoruz. Projeye nasıl katılacağınız hakkında detaylı bilgi için [Katkıda Bulunma Kılavuzumuza](CONTRIBUTING.md) bakın.

#### Geliştirici Kaynakları
- **API Dokümantasyonu**: Kapsamlı API referansı
- **SDK Kütüphaneleri**: Popüler diller için geliştirme kitleri
- **Kod Örnekleri**: Örnek uygulamalar ve kullanım durumları
- **Geliştirici Forumları**: Topluluk desteği ve tartışmalar

---

**© 2025 RestaurantIQ Technologies. Tüm hakları saklıdır.**

Daha fazla bilgi için [www.restaurantiq.com](https://www.restaurantiq.com) adresini ziyaret edin veya kurumsal satış ekibimizle sales@restaurantiq.com adresinden iletişime geçin.

**Build Durumu**: [![Build](https://img.shields.io/badge/build-passing-green.svg)](https://github.com/restaurantiq/platform/actions)
**Güvenlik**: [![Security](https://img.shields.io/badge/security-verified-green.svg)](https://github.com/restaurantiq/platform/security)
**Dokümantasyon**: [![Docs](https://img.shields.io/badge/docs-complete-blue.svg)](https://docs.restaurantiq.com)
