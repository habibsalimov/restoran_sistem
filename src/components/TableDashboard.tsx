'use client';

import TableStatus from './TableStatus';

interface TableDashboardProps {
  table1Time: number;
  table2Time: number;
}

export default function TableDashboard({ table1Time, table2Time }: TableDashboardProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Masa Durumu</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TableStatus tableNumber={1} videoTime={table1Time} />
        <TableStatus tableNumber={2} videoTime={table2Time} />
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Sistem Durumu</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-black">
          <div>
            <span className="font-medium">Toplam Masalar:</span> 2
          </div>
          <div>
            <span className="font-medium">Aktif Garsonlar:</span> 2
          </div>
        </div>
      </div>
    </div>
  );
}