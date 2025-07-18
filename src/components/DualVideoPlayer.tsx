'use client';

import { useState, useCallback } from 'react';
import VideoPlayer from './VideoPlayer';

interface DualVideoPlayerProps {
  onTable1TimeUpdate?: (time: number) => void;
  onTable2TimeUpdate?: (time: number) => void;
}

export default function DualVideoPlayer({ 
  onTable1TimeUpdate, 
  onTable2TimeUpdate 
}: DualVideoPlayerProps) {
  const [table1Time, setTable1Time] = useState(0);
  const [table2Time, setTable2Time] = useState(0);

  const handleTable1TimeUpdate = useCallback((time: number) => {
    setTable1Time(time);
    onTable1TimeUpdate?.(time);
  }, [onTable1TimeUpdate]);

  const handleTable2TimeUpdate = useCallback((time: number) => {
    setTable2Time(time);
    onTable2TimeUpdate?.(time);
  }, [onTable2TimeUpdate]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center">
            Masa 1 - Normal Senaryo
          </h3>
          <VideoPlayer 
            tableNumber={1} 
            onTimeUpdate={handleTable1TimeUpdate}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3 text-center">
            Masa 2 - Gecikme Senaryosu
          </h3>
          <VideoPlayer 
            tableNumber={2} 
            onTimeUpdate={handleTable2TimeUpdate}
          />
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Video Durumu</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-black">
          <div>
            <span className="font-medium text-black">Masa 1:</span> {Math.floor(table1Time)}s
          </div>
          <div>
            <span className="font-medium text-black">Masa 2:</span> {Math.floor(table2Time)}s
          </div>
        </div>
      </div>
    </div>
  );
}