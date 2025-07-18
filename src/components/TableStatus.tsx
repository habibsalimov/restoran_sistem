'use client';

import { useState, useEffect } from 'react';

interface TableData {
  id: number;
  table_number: number;
  status: 'empty' | 'occupied' | 'waiting' | 'served';
  current_waiter_id: number | null;
  customer_arrival_time: string | null;
  waiter_arrival_time: string | null;
  total_amount: number;
}

interface WaiterData {
  id: number;
  name: string;
  performance_score: number;
}

interface TableStatusProps {
  tableNumber: 1 | 2;
  videoTime: number;
}

export default function TableStatus({ tableNumber, videoTime }: TableStatusProps) {
  const [tableData, setTableData] = useState<TableData>({
    id: tableNumber,
    table_number: tableNumber,
    status: 'empty',
    current_waiter_id: null,
    customer_arrival_time: null,
    waiter_arrival_time: null,
    total_amount: 0
  });

  const [waiterData, setWaiterData] = useState<WaiterData | null>(null);
  const [isLate, setIsLate] = useState(false);

  useEffect(() => {
    // Simulate timeline events based on video time
    const simulateEvents = () => {
      if (tableNumber === 1) {
        // Masa 1 - Yeni hızlı senaryo
        if (videoTime >= 10 && videoTime < 18) {
          setTableData(prev => ({
            ...prev,
            status: 'waiting',
            customer_arrival_time: new Date().toISOString()
          }));
        } else if (videoTime >= 18 && videoTime < 33) {
          setWaiterData({
            id: 1,
            name: 'Garson A',
            performance_score: 0
          });
          setTableData(prev => ({
            ...prev,
            status: 'occupied',
            current_waiter_id: 1,
            waiter_arrival_time: new Date().toISOString()
          }));
        } else if (videoTime >= 33 && videoTime < 55) {
          setTableData(prev => ({
            ...prev,
            status: 'served',
            total_amount: 98
          }));
        } else if (videoTime >= 55) {
          setTableData({
            id: tableNumber,
            table_number: tableNumber,
            status: 'empty',
            current_waiter_id: null,
            customer_arrival_time: null,
            waiter_arrival_time: null,
            total_amount: 0
          });
          setWaiterData(null);
        }
      } else {
        // Masa 2 - Gecikme senaryosu (Video 53 saniyede bitiyor)
        if (videoTime >= 8 && videoTime < 50) {
          setTableData(prev => ({
            ...prev,
            status: 'waiting',
            customer_arrival_time: new Date().toISOString()
          }));
          setIsLate(false);
        } else if (videoTime >= 50 && videoTime < 53) {
          setTableData(prev => ({
            ...prev,
            status: 'waiting',
            customer_arrival_time: new Date().toISOString()
          }));
          setIsLate(true); // Gecikme başladı
        } else if (videoTime >= 53) {
          // Video bitti, garson hiç gelmedi - masa boş duruma geçiyor
          setTableData({
            id: tableNumber,
            table_number: tableNumber,
            status: 'empty',
            current_waiter_id: null,
            customer_arrival_time: null,
            waiter_arrival_time: null,
            total_amount: 0
          });
          setWaiterData(null);
          setIsLate(false);
        }
      }
    };

    simulateEvents();
  }, [videoTime, tableNumber]);

  const getStatusColor = () => {
    switch (tableData.status) {
      case 'empty':
        return 'bg-gray-200 text-black';
      case 'waiting':
        return isLate ? 'bg-red-100 text-black' : 'bg-yellow-100 text-black';
      case 'occupied':
        return 'bg-blue-100 text-black';
      case 'served':
        return 'bg-green-100 text-black';
      default:
        return 'bg-gray-200 text-black';
    }
  };

  const getStatusText = () => {
    if (tableNumber === 1) {
      if (videoTime >= 10 && videoTime < 18) return 'Sipariş Bekliyor';
      if (videoTime >= 18 && videoTime < 33) return 'Sipariş Alındı';
      if (videoTime >= 33 && videoTime < 55) return 'Yemek Yeniliyor';
      if (videoTime >= 55) return 'Boş';
      return 'Boş';
    } else {
      // Masa 2 için özel durum kontrolü
      if (videoTime >= 8 && videoTime < 50) return 'Bekliyor';
      if (videoTime >= 50 && videoTime < 53) return 'Bekliyor (GEÇİKME!)';
      if (videoTime >= 53) return 'Boş'; // Video bitti, garson gelmedi
      return 'Boş';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Masa {tableNumber}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="space-y-3">
        {tableData.customer_arrival_time && (
          <div className="text-sm text-black">
            <span className="font-medium">Müşteri Gelişi:</span>
            <span className="ml-2">{Math.floor(videoTime)}s</span>
          </div>
        )}

        {waiterData && (
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-sm font-medium text-black">
              {waiterData.name}
            </div>
            <div className="text-xs text-black">
              Performans: {waiterData.performance_score}/100
            </div>
          </div>
        )}

        {tableData.waiter_arrival_time && (
          <div className="text-sm text-black">
            <span className="font-medium">Garson Gelişi:</span>
            <span className="ml-2">{Math.floor(videoTime)}s</span>
          </div>
        )}

        <div className="text-sm">
          <span className="font-medium">Toplam Tutar:</span>
          <span className="ml-2">{tableData.total_amount.toFixed(2)} TL</span>
        </div>

        {isLate && (
          <div className="bg-red-50 border border-red-200 rounded p-2">
            <div className="text-black text-sm font-medium">
              ⚠️ Garson 1 dakikayı geçti!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}