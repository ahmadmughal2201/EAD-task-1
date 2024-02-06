// src/App.js
import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';
import ImageDisplay from './components/ImageDisplay';
import './components/AnimatedDiv.css';


const App = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [applyingFilter, setApplyingFilter] = useState(false);
  const [processingTimeLocal, setProcessingTimeLocal] = useState(null);
  const [processingTimeWorker, setProcessingTimeWorker] = useState(null);
  const [mainThreadTaskCount, setMainThreadTaskCount] = useState(0);


  const applyFilterLocally = async (imageUrl) => {
    try {
      setApplyingFilter(true);
      const startTime = performance.now();

      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const modifiedData = await applySobelFilter(imageData);
        setModifiedImage(createImageFromData(modifiedData, canvas.width, canvas.height));

        const endTime = performance.now();
        setProcessingTimeLocal(endTime - startTime);
        setApplyingFilter(false);
        // for (let i = 0; i < 1000000000; i++) {
        // }
      };

      img.src = imageUrl;
    } catch (error) {
      console.error(error);
      setApplyingFilter(false);
    }
  };

  const applyFilterWithWorker = async (imageUrl) => {
    try {
      setApplyingFilter(true);
      const startTime = performance.now();

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Create a Web Worker
        const sobelWorker = new Worker(new URL('./sobelWorker.js', import.meta.url));
        sobelWorker.onmessage = (e) => {
          const modifiedData = e.data;
          setModifiedImage(createImageFromData(modifiedData, canvas.width, canvas.height));

          const endTime = performance.now();
          setProcessingTimeWorker(endTime - startTime);
          setApplyingFilter(false);
        };
        // for (let i = 0; i < 1000000000; i++) {
        // }
        // Send the image data to the Web Worker for processing
        sobelWorker.postMessage(imageData);
      };

      img.src = imageUrl;
    } catch (error) {
      console.error(error);
      setApplyingFilter(false);
    }
  };

  const applySobelFilter = async (imageData) => {
    return new Promise((resolve, reject) => {
      const sobelWorker = new Worker(new URL('./sobelWorker.js', import.meta.url));
      sobelWorker.onmessage = (e) => {
        const modifiedData = e.data;
        resolve(modifiedData);
      };
      sobelWorker.postMessage(imageData);
    });
  };


  const createImageFromData = (data, width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
    ctx.putImageData(imageData, 0, 0);

    // Make sure to return the data URL of the canvas, not the canvas itself
    return canvas.toDataURL();
  };

  const runMainThreadTask = () => {
    const startTime = performance.now();

    // Simulate a long-running computation
    for (let i = 0; i < 10000000000; i++) {
      setMainThreadTaskCount((prevCount) => prevCount + 1);
    }

    const endTime = performance.now();

    alert(`Main thread task completed in ${(endTime - startTime).toFixed(2)} milliseconds.`);
  };


  return (
    <div className="container mx-auto my-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Image Filter App</h1>
      <div className="animated-div"></div>
      <ImageUpload onImageUpload={(url) => setOriginalImage(url)} />
      <hr className="my-8" />
      <h2 className="text-xl font-semibold mb-2">Apply Filters</h2>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => applyFilterLocally(originalImage)}
          className="btn-filter bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-500"
          disabled={applyingFilter}
        >
          Apply Blur Locally
        </button>
        <button
          onClick={() => applyFilterWithWorker(originalImage)}
          className="btn-filter bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-500"
          disabled={applyingFilter}
        >
          Apply Blur with Web Worker
        </button>
        <button
          onClick={runMainThreadTask}
          className="btn-filter bg-red-500 text-white px-4 py-2 rounded disabled:bg-gray-500"
        >
          Run a Main Thread Task ({mainThreadTaskCount})
        </button>
      </div>
      <hr className="my-8" />
      {applyingFilter && <p className="text-xl font-semibold">Applying filter...</p>}
      {processingTimeLocal && processingTimeWorker && (
        <div>
          <p className="text-lg">
            Time taken to apply filter locally: {processingTimeLocal.toFixed(2)} milliseconds
          </p>
          <p className="text-lg">
            Time taken to apply filter with Web Worker: {processingTimeWorker.toFixed(2)} milliseconds
          </p>
        </div>
      )}
      {originalImage && modifiedImage && (
        <ImageDisplay originalImage={originalImage} modifiedImage={modifiedImage} />
      )}
    </div>
  );
};

export default App;
