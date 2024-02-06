// src/components/ImageDisplay.js
import React from 'react';

const ImageDisplay = ({ originalImage, modifiedImage }) => {
    return (
        <div className="flex justify-around mt-8">
            <div className="text-center">
                <h3 className="text-lg font-semibold">Original Image</h3>
                <img src={originalImage} alt="Original" className="max-w-full max-h-300 mt-2" />
            </div>
            <div className="text-center">
                <h3 className="text-lg font-semibold">Modified Image</h3>
                <img src={modifiedImage} alt="Modified" className="max-w-full max-h-300 mt-2" />
            </div>
        </div>
    );
};

export default ImageDisplay;
