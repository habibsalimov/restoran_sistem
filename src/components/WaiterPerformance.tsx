'use client';

import { useState, useEffect } from 'react';

interface WaiterStats {
  id: number;
  name: string;
  performance_score: number;
  total_served_tables: number;
  late_arrivals: number;
  current_table: number | null;
  response_time: number | null;
}

interface WaiterPerformanceProps {
  table1Time: number;
  table2Time: number;
}

export default function WaiterPerformance({ table1Time, table2Time }: WaiterPerformanceProps) {
  const [waiters, setWaiters] = useState<WaiterStats[]>([
    {
      id: 1,
      name: 'Garson A',
      performance_score: 0,
      total_served_tables: 0,
      late_arrivals: 0,
      current_table: null,
      response_time: null
    },
    {
      id: 2,
      name: 'Garson B',
      performance_score: 0,
      total_served_tables: 0,
      late_arrivals: 0,
      current_table: null,
      response_time: null
    }
  ]);

  useEffect(() => {
    setWaiters(prev => prev.map(waiter => {
      if (waiter.id === 1) {
        // Garson A - Masa 1 (Yeni hızlı senaryo)
        if (table1Time >= 10 && table1Time < 18) {
          return {
            ...waiter,
            name: 'Garson A',
            current_table: 1,
            response_time: Math.max(0, 18 - table1Time),
            performance_score: 0 // Henüz puan yok
          };
        } else if (table1Time >= 18 && table1Time < 55) {
          return {
            ...waiter,
            name: 'Garson A',
            current_table: 1,
            response_time: 8, // 8 saniye içinde geldi (mükemmel)
            performance_score: 50, // İlk puan: hızlı yanıt
            total_served_tables: 0 // Henüz tamamlanmadı
          };
        } else if (table1Time >= 55) {
          return {
            ...waiter,
            name: 'Garson A',
            current_table: null,
            response_time: null,
            performance_score: 100, // Final puan: hızlı + başarılı hizmet
            total_served_tables: 1
          };
        }
      } else if (waiter.id === 2) {
        // Garson B - Masa 2 (Müşteri bekliyor, garson gelmiyor)
        if (table2Time >= 8 && table2Time < 50) {
          const responseTime = Math.max(0, 50 - table2Time);
          
          return {
            ...waiter,
            current_table: 2,
            response_time: responseTime,
            performance_score: 0, // Henüz puan yok
            late_arrivals: 0
          };
        } else if (table2Time >= 50 && table2Time < 53) {
          // Kritik gecikme - müşteri hala bekliyor
          return {
            ...waiter,
            current_table: 2,
            response_time: null,
            performance_score: -30, // Gecikme cezası
            late_arrivals: 1
          };
        } else if (table2Time >= 53) {
          // Video bitti, garson hiç gelmedi - çok kötü performans
          return {
            ...waiter,
            current_table: null,
            response_time: null,
            performance_score: -100, // Maksimum ceza - müşteri terk edildi
            late_arrivals: 1,
            total_served_tables: 0 // Hizmet verilmedi
          };
        }
      }
      return waiter;
    }));
  }, [table1Time, table2Time]);

  const getPerformanceColor = () => {
    return 'text-black'; // Tüm yazılar siyah
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 80) return '✅';
    if (score >= 40) return '⚠️';
    if (score > 0) return '📊';
    if (score === 0) return '⏳';
    if (score <= -50) return '🚫'; // Müşteri terk edildi
    return '❌';
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Garson Performansı</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {waiters.map(waiter => (
          <div key={waiter.id} className="bg-white rounded-lg shadow-md p-4 border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{waiter.name}</h3>
              <span className="text-2xl">{getPerformanceIcon(waiter.performance_score)}</span>
            </div>
            
            <div className="space-y-3 text-black">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-black">Performans Puanı:</span>
                <span className={`text-sm font-bold ${getPerformanceColor()}`}>
                  {waiter.performance_score}/100
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-black">Hizmet Verilen Masalar:</span>
                <span className="text-sm text-black">{waiter.total_served_tables}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm font-medium text-black">Gecikmeler:</span>
                <span className="text-sm text-black">{waiter.late_arrivals}</span>
              </div>
              
              {waiter.current_table && (
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-sm font-medium text-black">
                    Şu an: Masa {waiter.current_table}
                  </div>
                  {waiter.response_time !== null && (
                    <div className="text-xs text-black">
                      Yanıt süresi: {Math.ceil(waiter.response_time)}s
                    </div>
                  )}
                </div>
              )}
              
              {waiter.performance_score <= -50 && (
                <div className="bg-red-100 border border-red-400 p-3 rounded">
                  <div className="text-sm font-bold text-red-800">
                    🚨 KRİTİK UYARI
                  </div>
                  <div className="text-xs text-red-700">
                    Müşteri terk edildi - Garson hiç gelmedi
                  </div>
                </div>
              )}
              
              {waiter.performance_score < 0 && waiter.performance_score > -50 && (
                <div className="bg-yellow-100 border border-yellow-400 p-3 rounded">
                  <div className="text-sm font-bold text-yellow-800">
                    ⚠️ PERFORMANS UYARISI
                  </div>
                  <div className="text-xs text-yellow-700">
                    Müşteri bekliyor - Acil müdahale gerekli
                  </div>
                </div>
              )}
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    waiter.performance_score >= 100 ? 'bg-green-500' :
                    waiter.performance_score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.max(0, Math.min(100, waiter.performance_score))}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Performans Metrikleri</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-black">
          <div>
            <span className="font-medium text-black">Hedef Yanıt Süresi:</span> {'<60s'}
          </div>
          <div>
            <span className="font-medium text-black">Gecikme Toleransı:</span> {'<1dk'}
          </div>
        </div>
      </div>
    </div>
  );
}