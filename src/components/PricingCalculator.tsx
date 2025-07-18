'use client';

import { useState, useEffect } from 'react';

interface FoodCategory {
  name: string;
  price: number;
  emoji: string;
}

interface OrderItem {
  id: string;
  category: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  table_number: number;
  timestamp: number;
}

interface PricingCalculatorProps {
  table1Time: number;
  table2Time: number;
}

const FOOD_CATEGORIES: FoodCategory[] = [
  { name: 'Ana Yemek', price: 45, emoji: '🍽️' },
  { name: 'Yan Yemek', price: 15, emoji: '🍲' },
  { name: 'Çorba', price: 25, emoji: '🥣' },
  { name: 'Yan Ürün', price: 8, emoji: '🥗' },
  { name: 'Su', price: 5, emoji: '💧' }
];

export default function PricingCalculator({ table1Time, table2Time }: PricingCalculatorProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [table1Total, setTable1Total] = useState(0);
  const [table2Total, setTable2Total] = useState(0);

  useEffect(() => {
    // Masa 1 siparişleri - Yeni hızlı senaryo
    const table1Orders: OrderItem[] = [];
    
    if (table1Time >= 33) { // 33. saniye - Tüm yemekler birden
      table1Orders.push(
        {
          id: 't1-1',
          category: 'Ana Yemek',
          quantity: 1,
          unit_price: 45,
          total_price: 45,
          table_number: 1,
          timestamp: 33
        },
        {
          id: 't1-2',
          category: 'Yan Yemek',
          quantity: 1,
          unit_price: 15,
          total_price: 15,
          table_number: 1,
          timestamp: 33
        },
        {
          id: 't1-3',
          category: 'Çorba',
          quantity: 1,
          unit_price: 25,
          total_price: 25,
          table_number: 1,
          timestamp: 33
        },
        {
          id: 't1-4',
          category: 'Yan Ürün',
          quantity: 1,
          unit_price: 8,
          total_price: 8,
          table_number: 1,
          timestamp: 33
        },
        {
          id: 't1-5',
          category: 'Su',
          quantity: 1,
          unit_price: 5,
          total_price: 5,
          table_number: 1,
          timestamp: 33
        }
      );
    }

    // Masa 2 siparişleri - Gecikme senaryosu (sadece müşteri kalkmazsa)
    const table2Orders: OrderItem[] = [];
    
    if (table2Time >= 85 && table2Time < 95) { // Müşteri kalkmadan önce minimal sipariş
      table2Orders.push({
        id: 't2-1',
        category: 'İçecek',
        quantity: 1,
        unit_price: 20,
        total_price: 20,
        table_number: 2,
        timestamp: 85
      });
    }

    const allOrders = [...table1Orders, ...table2Orders];
    setOrders(allOrders);

    // Toplam hesaplama
    const t1Total = table1Orders.reduce((sum, order) => sum + order.total_price, 0);
    const t2Total = table2Orders.reduce((sum, order) => sum + order.total_price, 0);
    
    setTable1Total(t1Total);
    setTable2Total(t2Total);
  }, [table1Time, table2Time]);

  const getOrdersByTable = (tableNumber: number) => {
    return orders.filter(order => order.table_number === tableNumber);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Anlık Fiyatlandırma</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Masa 1 */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Masa 1</h3>
            <span className="text-lg font-bold text-black">
              {table1Total.toFixed(2)} TL
            </span>
          </div>
          
          <div className="space-y-2">
            {getOrdersByTable(1).map(order => (
              <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <span>{FOOD_CATEGORIES.find(cat => cat.name === order.category)?.emoji}</span>
                  <span className="text-sm text-black">{order.category}</span>
                  <span className="text-xs text-black">({formatTime(order.timestamp)})</span>
                </div>
                <span className="text-sm font-medium text-black">{order.total_price} TL</span>
              </div>
            ))}
            
            {getOrdersByTable(1).length === 0 && (
              <p className="text-black text-sm">Henüz sipariş yok</p>
            )}
          </div>
        </div>

        {/* Masa 2 */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Masa 2</h3>
            <span className="text-lg font-bold text-black">
              {table2Total.toFixed(2)} TL
            </span>
          </div>
          
          <div className="space-y-2">
            {getOrdersByTable(2).map(order => (
              <div key={order.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <span>{FOOD_CATEGORIES.find(cat => cat.name === order.category)?.emoji}</span>
                  <span className="text-sm text-black">{order.category}</span>
                  <span className="text-xs text-black">({formatTime(order.timestamp)})</span>
                </div>
                <span className="text-sm font-medium text-black">{order.total_price} TL</span>
              </div>
            ))}
            
            {getOrdersByTable(2).length === 0 && (
              <p className="text-black text-sm">Henüz sipariş yok</p>
            )}
            
            {table2Time >= 85 && table2Time < 95 && (
              <div className="bg-red-50 p-2 rounded text-xs text-black">
                ⚠️ Müşteri memnuniyetsiz - Sipariş iptal edilebilir
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Fiyat Listesi */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Fiyat Listesi</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {FOOD_CATEGORIES.map(category => (
            <div key={category.name} className="text-center">
              <div className="text-2xl mb-1">{category.emoji}</div>
              <div className="text-sm font-medium text-black">{category.name}</div>
              <div className="text-sm text-black">{category.price} TL</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Toplam Özet */}
      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Günlük Özet</h3>
        <div className="grid grid-cols-3 gap-4 text-sm text-black">
          <div>
            <span className="font-medium text-black">Toplam Satış:</span>
            <div className="text-lg font-bold text-black">
              {(table1Total + table2Total).toFixed(2)} TL
            </div>
          </div>
          <div>
            <span className="font-medium text-black">Toplam Sipariş:</span>
            <div className="text-lg font-bold">
              {orders.length}
            </div>
          </div>
          <div>
            <span className="font-medium text-black">Ortalama Hesap:</span>
            <div className="text-lg font-bold">
              {orders.length > 0 ? ((table1Total + table2Total) / 2).toFixed(2) : '0.00'} TL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}