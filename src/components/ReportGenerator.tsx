'use client';

import { useState, useEffect } from 'react';

interface Report {
  id: string;
  table_number: number;
  waiter_name: string;
  session_start: string;
  session_end: string;
  total_amount: number;
  items_served: number;
  performance_rating: number;
  created_at: string;
}

interface ReportGeneratorProps {
  table1Time: number;
  table2Time: number;
}

export default function ReportGenerator({ table1Time, table2Time }: ReportGeneratorProps) {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const mockReports: Report[] = [];
    
    // Masa 1 raporu - hızlı başarılı senaryo
    if (table1Time >= 55) { // 55. saniye - masa sıfırlandı
      mockReports.push({
        id: 'report-1',
        table_number: 1,
        waiter_name: 'Garson A',
        session_start: '2025-07-17T10:00:10',
        session_end: '2025-07-17T10:00:55',
        total_amount: 98, // 45+15+25+8+5 = 98 TL
        items_served: 5,
        performance_rating: 100,
        created_at: '2025-07-17T10:00:55'
      });
    }
    
    // Masa 2 raporu - gecikme senaryosu
    if (table2Time >= 95) { // 1:35 - masa sıfırlandı
      mockReports.push({
        id: 'report-2',
        table_number: 2,
        waiter_name: 'Garson B',
        session_start: '2025-07-17T10:00:08',
        session_end: '2025-07-17T10:01:35',
        total_amount: 20, // Sadece içecek
        items_served: 1,
        performance_rating: 80,
        created_at: '2025-07-17T10:01:35'
      });
    }
    
    setReports(mockReports);
  }, [table1Time, table2Time]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const formatDuration = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceColor = (rating: number) => {
    if (rating >= 100) return 'text-black';
    if (rating >= 80) return 'text-black';
    return 'text-black';
  };

  const getPerformanceText = (rating: number) => {
    if (rating >= 100) return 'Mükemmel';
    if (rating >= 80) return 'İyi';
    return 'Geliştirilmeli';
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Rapor Sistemi</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Raporlar Listesi */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <h3 className="text-lg font-semibold mb-4">Oturum Raporları</h3>
          
          {reports.length === 0 ? (
            <p className="text-black text-center py-8">
              Henüz rapor oluşturulmadı. Videoları izleyerek raporları oluşturun.
            </p>
          ) : (
            <div className="space-y-3">
              {reports.map(report => (
                <div
                  key={report.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedReport?.id === report.id
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        Masa {report.table_number} - {report.waiter_name}
                      </h4>
                      <p className="text-sm text-black">
                        {formatDate(report.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{report.total_amount} TL</p>
                      <p className={`text-sm ${getPerformanceColor(report.performance_rating)}`}>
                        {getPerformanceText(report.performance_rating)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Rapor Detayı */}
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <h3 className="text-lg font-semibold mb-4">Rapor Detayı</h3>
          
          {selectedReport ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-black">Masa Bilgileri</h4>
                  <p className="text-sm text-black">Masa {selectedReport.table_number}</p>
                  <p className="text-sm text-black">{selectedReport.waiter_name}</p>
                </div>
                <div>
                  <h4 className="font-medium text-black">Oturum Süresi</h4>
                  <p className="text-sm text-black">
                    {formatDuration(selectedReport.session_start, selectedReport.session_end)}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-black">Toplam Tutar</h4>
                  <p className="text-lg font-bold text-black">
                    {selectedReport.total_amount} TL
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-black">Sipariş Sayısı</h4>
                  <p className="text-lg font-bold">
                    {selectedReport.items_served}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-black">Performans</h4>
                <div className="flex items-center justify-between">
                  <span className={`font-bold ${getPerformanceColor(selectedReport.performance_rating)}`}>
                    {selectedReport.performance_rating}/100
                  </span>
                  <span className={`text-sm ${getPerformanceColor(selectedReport.performance_rating)}`}>
                    {getPerformanceText(selectedReport.performance_rating)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      selectedReport.performance_rating >= 100 ? 'bg-green-500' :
                      selectedReport.performance_rating >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${selectedReport.performance_rating}%` }}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-black mb-2">Oturum Zamanları</h4>
                <div className="text-sm text-black">
                  <p>Başlama: {formatDate(selectedReport.session_start)}</p>
                  <p>Bitiş: {formatDate(selectedReport.session_end)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-black text-center py-8">
              Detayları görmek için bir rapor seçin.
            </p>
          )}
        </div>
      </div>
      
      {/* Günlük Özet */}
      {reports.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Günlük Özet</h3>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-black">Toplam Oturum:</span>
              <div className="text-lg font-bold">{reports.length}</div>
            </div>
            <div>
              <span className="font-medium text-black">Toplam Gelir:</span>
              <div className="text-lg font-bold text-black">
                {reports.reduce((sum, report) => sum + report.total_amount, 0)} TL
              </div>
            </div>
            <div>
              <span className="font-medium text-black">Ortalama Performans:</span>
              <div className="text-lg font-bold">
                {Math.round(reports.reduce((sum, report) => sum + report.performance_rating, 0) / reports.length)}/100
              </div>
            </div>
            <div>
              <span className="font-medium text-black">Toplam Sipariş:</span>
              <div className="text-lg font-bold">
                {reports.reduce((sum, report) => sum + report.items_served, 0)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}