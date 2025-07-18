'use client';

import { useState, useCallback } from 'react';
import DualVideoPlayer from '@/components/DualVideoPlayer';
import TableDashboard from '@/components/TableDashboard';
import WaiterPerformance from '@/components/WaiterPerformance';
import PricingCalculator from '@/components/PricingCalculator';
import ReportGenerator from '@/components/ReportGenerator';

export default function Home() {
  const [table1Time, setTable1Time] = useState(0);
  const [table2Time, setTable2Time] = useState(0);

  const handleTable1TimeUpdate = useCallback((time: number) => {
    setTable1Time(time);
  }, []);

  const handleTable2TimeUpdate = useCallback((time: number) => {
    setTable2Time(time);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Restoran Sipariş Takip Sistemi
          </h1>
          <p className="text-black">
            Bilgisayarlı görü ile garson performansı ve yemek fiyatlandırma sistemi
          </p>
        </header>

        <div className="space-y-8">
          {/* Video Players */}
          <section>
            <DualVideoPlayer
              onTable1TimeUpdate={handleTable1TimeUpdate}
              onTable2TimeUpdate={handleTable2TimeUpdate}
            />
          </section>

          {/* Table Status Dashboard */}
          <section>
            <TableDashboard 
              table1Time={table1Time} 
              table2Time={table2Time} 
            />
          </section>

          {/* Waiter Performance */}
          <section>
            <WaiterPerformance 
              table1Time={table1Time} 
              table2Time={table2Time} 
            />
          </section>

          {/* Pricing Calculator */}
          <section>
            <PricingCalculator 
              table1Time={table1Time} 
              table2Time={table2Time} 
            />
          </section>

          {/* Report Generator */}
          <section>
            <ReportGenerator 
              table1Time={table1Time} 
              table2Time={table2Time} 
            />
          </section>
        </div>

        <footer className="mt-12 text-center text-sm text-black">
          <p>Restoran Yönetim Sistemi - Demo Sürümü</p>
        </footer>
      </div>
    </div>
  );
}
