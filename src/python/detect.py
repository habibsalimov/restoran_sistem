#!/usr/bin/env python3
import sys
import json
import base64
import cv2
import numpy as np
from ultralytics import YOLO
from PIL import Image
import io
import os

def load_model():
    """Load YOLOv8 model"""
    model_path = os.path.join(os.path.dirname(__file__), '../../models/best2.pt')
    model = YOLO(model_path)
    return model

def decode_image(base64_string):
    """Decode base64 image to numpy array"""
    image_data = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(image_data))
    return np.array(image)

def detect_objects(model, image):
    """Run YOLO detection on image"""
    results = model(image, verbose=False)
    
    detections = []
    for result in results:
        boxes = result.boxes
        if boxes is not None:
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                conf = box.conf[0].cpu().numpy()
                
                # Only include detections with confidence > 0.3
                if conf > 0.3:
                    detections.append({
                        'x1': float(x1),
                        'y1': float(y1),
                        'x2': float(x2),
                        'y2': float(y2),
                        'confidence': float(conf)
                    })
    
    return detections

def main():
    try:
        # Read base64 image data from stdin
        base64_image = sys.stdin.read().strip()
        
        # Load model
        model = load_model()
        
        # Decode image
        image = decode_image(base64_image)
        
        # Run detection
        detections = detect_objects(model, image)
        
        # Return results
        result = {
            'success': True,
            'detections': detections,
            'count': len(detections)
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            'success': False,
            'error': str(e),
            'detections': [],
            'count': 0
        }
        print(json.dumps(error_result))

if __name__ == '__main__':
    main()