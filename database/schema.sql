-- Restaurant Order Tracking System Database Schema
-- Based on PRD.md requirements

-- Masalar tablosu (Tables)
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

-- Garsonlar tablosu (Waiters)
CREATE TABLE waiters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  qr_code VARCHAR(50) UNIQUE,
  performance_score INTEGER DEFAULT 100,
  total_served_tables INTEGER DEFAULT 0,
  late_arrivals INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Siparişler tablosu (Orders)
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

-- Raporlar tablosu (Reports)
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

-- Initial data - Garsonlar (Waiters)
INSERT INTO waiters (name, qr_code, performance_score) VALUES
('Garson A', 'QR_WAITER_A', 100),
('Garson B', 'QR_WAITER_B', 100);

-- Initial data - Masalar (Tables)
INSERT INTO tables (table_number, status) VALUES
(1, 'empty'),
(2, 'empty');

-- Food categories and prices (from PRD):
-- Ana Yemek: 200 TL
-- Çorba: 90 TL
-- İçecek: 20 TL
-- Salata: 70 TL
-- Tatlı: 100 TL