// faceservice.js

import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

class FaceService {
    constructor() {
        this.model = null;
    }

    async loadModel() {
        this.model = await cocoSsd.load();
        console.log('Model loaded');
    }

    async detectFaces(imageElement) {
        if (!this.model) {
            throw new Error('Model not loaded. Call loadModel() first.');
        }

        const predictions = await this.model.detect(imageElement);
        return predictions;
    }

    drawPredictions(predictions, ctx) {
        predictions.forEach(prediction => {
            // Draw bounding box
            ctx.beginPath();
            ctx.rect(...prediction.bbox);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'green';
            ctx.fillStyle = 'green';
            ctx.stroke();
            ctx.fillText(
                `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
                prediction.bbox[0],
                prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10
            );
        });
    }
}

export default FaceService;

