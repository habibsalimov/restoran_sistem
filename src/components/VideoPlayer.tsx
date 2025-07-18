'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import DetectionOverlay from './DetectionOverlay';
import { captureVideoFrame, detectObjects, scaleDetections } from '@/lib/detection';

interface VideoPlayerProps {
  tableNumber: 1 | 2;
  onTimeUpdate?: (currentTime: number) => void;
}

interface Detection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
  id: string;
}

export default function VideoPlayer({ tableNumber, onTimeUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setVideoSize({
        width: video.videoWidth || 640,
        height: video.videoHeight || 480
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onTimeUpdate]);

  const runDetection = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !isPlaying || isDetecting) return;

    setIsDetecting(true);

    try {
      const frameData = captureVideoFrame(video);
      if (frameData) {
        const rawDetections = await detectObjects(frameData);
        
        // Scale detections to video display size
        const scaledDetections = scaleDetections(
          rawDetections,
          videoSize.width,
          videoSize.height,
          video.clientWidth,
          video.clientHeight
        );

        setDetections(scaledDetections);
      }
    } catch (error) {
      console.error('Detection error:', error);
    } finally {
      setIsDetecting(false);
    }
  }, [isPlaying, isDetecting, videoSize]);

  // Run detection periodically when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(runDetection, 500); // Every 500ms

    return () => clearInterval(interval);
  }, [isPlaying, runDetection]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg border">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-64 object-cover"
          poster="/placeholder-video.jpg"
          muted
        >
          <source src={`/videos/table-${tableNumber}.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* YOLO Detection Overlay */}
        <DetectionOverlay
          detections={detections}
          videoWidth={videoSize.width}
          videoHeight={videoSize.height}
        />
        
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-black px-2 py-1 rounded text-sm border">
          Masa {tableNumber}
          {isDetecting && (
            <span className="ml-2 text-green-600">🔍</span>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-gray-100 text-black">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={togglePlayPause}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium text-black"
          >
            {isPlaying ? 'Duraklat' : 'Oynat'}
          </button>
          
          <div className="text-sm text-black">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}