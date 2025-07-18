import { NextRequest, NextResponse } from 'next/server';
import { PythonShell } from 'python-shell';
import path from 'path';

interface DetectionResult {
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

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { success: false, error: 'No image provided', detections: [], count: 0 },
        { status: 400 }
      );
    }

    // Remove data:image/jpeg;base64, prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '');

    const scriptPath = path.join(process.cwd(), 'src/python/detect.py');
    
    return new Promise<NextResponse>((resolve) => {
      const options = {
        mode: 'text' as const,
        pythonPath: 'python3',
        scriptPath: path.dirname(scriptPath),
        args: []
      };

      let outputData = '';
      
      const pyshell = new PythonShell('detect.py', options);
      
      // Send input as stdin
      pyshell.stdin?.write(base64Image);
      pyshell.stdin?.end();

      pyshell.on('message', (message: string) => {
        outputData += message;
      });

      pyshell.end((err) => {
        let result: DetectionResult;

        if (err) {
          result = {
            success: false,
            detections: [],
            count: 0,
            error: err.message
          };
        } else {
          try {
            result = JSON.parse(outputData);
          } catch {
            result = {
              success: false,
              detections: [],
              count: 0,
              error: 'Failed to parse Python output: ' + outputData
            };
          }
        }

        // Add cache headers to prevent caching
        const response = NextResponse.json(result);
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        
        resolve(response);
      });
    });

  } catch (error) {
    console.error('Detection API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        detections: [],
        count: 0
      },
      { status: 500 }
    );
  }
}