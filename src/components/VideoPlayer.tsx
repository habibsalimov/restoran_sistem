'use client';

import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  tableNumber: 1 | 2;
  onTimeUpdate?: (currentTime: number) => void;
}

export default function VideoPlayer({ tableNumber, onTimeUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onTimeUpdate]);

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
        
        <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-black px-2 py-1 rounded text-sm border">
          Masa {tableNumber}
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