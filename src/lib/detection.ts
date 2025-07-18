interface Detection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  confidence: number;
  id: string;
}

interface DetectionResponse {
  success: boolean;
  detections: Array<{
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    confidence: number;
  }>;
  count: number;
  error?: string;
}

export function captureVideoFrame(video: HTMLVideoElement): string | null {
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    return canvas.toDataURL('image/jpeg', 0.8);
  } catch (error) {
    console.error('Failed to capture video frame:', error);
    return null;
  }
}

export async function detectObjects(imageData: string): Promise<Detection[]> {
  try {
    const response = await fetch('/api/detect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({ image: imageData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: DetectionResponse = await response.json();

    if (!result.success) {
      console.error('Detection failed:', result.error);
      return [];
    }

    // Add unique IDs to detections
    return result.detections.map((detection, index) => ({
      ...detection,
      id: `${Date.now()}-${index}`
    }));

  } catch (error) {
    console.error('Detection API error:', error);
    return [];
  }
}

export function scaleDetections(
  detections: Detection[],
  originalWidth: number,
  originalHeight: number,
  displayWidth: number,
  displayHeight: number
): Detection[] {
  const scaleX = displayWidth / originalWidth;
  const scaleY = displayHeight / originalHeight;

  return detections.map(detection => ({
    ...detection,
    x1: detection.x1 * scaleX,
    y1: detection.y1 * scaleY,
    x2: detection.x2 * scaleX,
    y2: detection.y2 * scaleY,
  }));
}