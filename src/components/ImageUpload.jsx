// src/components/ImageUpload.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageUpload = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageType = getImageType(e.target.result);

        if (imageType) {
          onImageUpload(URL.createObjectURL(file));
        } else {
          console.error('Invalid file extension. Please upload a valid image.');
        }
      };

      reader.readAsArrayBuffer(file);
    }
  }, [onImageUpload]);

  const getImageType = (buffer) => {
    const uint = new Uint8Array(buffer);
    const bytes = [];

    uint.forEach((byte) => {
      bytes.push(byte.toString(16));
    });

    const hex = bytes.join('').toUpperCase();

    // Add more file type signatures as needed
    const imageTypes = {
      JPEG: 'FFD8',
      PNG: '89504E47',
      GIF: '474946',
    };

    for (const type in imageTypes) {
      if (hex.startsWith(imageTypes[type])) {
        return type.toLowerCase();
      }
    }

    return null;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <div {...getRootProps()} className="border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer">
      <input {...getInputProps()} />
      <p className="text-gray-500">Drag & drop an image here, or click to select one</p>
    </div>
  );
};

export default ImageUpload;
