'use client';

import { useEffect, useState } from 'react';

interface Detection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
  id: string;
}

interface DetectionOverlayProps {
  detections: Detection[];
  videoWidth: number;
  videoHeight: number;
}

export default function DetectionOverlay({ detections, videoWidth, videoHeight }: DetectionOverlayProps) {
  const [visibleDetections, setVisibleDetections] = useState<Detection[]>([]);

  useEffect(() => {
    if (detections.length > 0) {
      // Add new detections
      setVisibleDetections(detections);

      // Auto-hide after 300ms
      const timer = setTimeout(() => {
        setVisibleDetections([]);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [detections]);

  if (visibleDetections.length === 0) {
    return null;
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox={`0 0 ${videoWidth} ${videoHeight}`}
      style={{ width: '100%', height: '100%' }}
    >
      {visibleDetections.map((detection) => {
        const width = detection.x2 - detection.x1;
        const height = detection.y2 - detection.y1;

        return (
          <g key={detection.id}>
            {/* Main bounding box */}
            <rect
              x={detection.x1}
              y={detection.y1}
              width={width}
              height={height}
              fill="none"
              stroke="#00ff00"
              strokeWidth="2"
              className="detection-box detection-pulse"
            />
            
            {/* Corner indicators */}
            <rect
              x={detection.x1 - 2}
              y={detection.y1 - 2}
              width="8"
              height="8"
              fill="#00ff00"
              className="detection-box"
            />
            <rect
              x={detection.x2 - 6}
              y={detection.y1 - 2}
              width="8"
              height="8"
              fill="#00ff00"
              className="detection-box"
            />
            <rect
              x={detection.x1 - 2}
              y={detection.y2 - 6}
              width="8"
              height="8"
              fill="#00ff00"
              className="detection-box"
            />
            <rect
              x={detection.x2 - 6}
              y={detection.y2 - 6}
              width="8"
              height="8"
              fill="#00ff00"
              className="detection-box"
            />
          </g>
        );
      })}
    </svg>
  );
}