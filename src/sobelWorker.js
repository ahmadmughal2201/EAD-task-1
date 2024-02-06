// sobelWorker.js
onmessage = function (e) {
    const imageData = e.data;
    const result = applyBlurFilter(imageData);
    postMessage(result);
};

function applyBlurFilter(imageData) {
    const width = imageData.width;
    const height = imageData.height;
    const data = new Uint8ClampedArray(imageData.data);

    const blurredData = new Uint8ClampedArray(data.length);

   const blurMatrix = [
    [1 / 16, 2 / 16, 1 / 16],
    [2 / 16, 4 / 16, 2 / 16],
    [1 / 16, 2 / 16, 1 / 16],
];
for (let i = 0; i < 10000000000; i++) {
    // Long-running computation
  }
    function applyMatrix(data, matrix, x, y) {
        let resultRed = 0;
        let resultGreen = 0;
        let resultBlue = 0;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const pixel = getPixel(data, width, x + i - 1, y + j - 1);
                resultRed += pixel[0] * matrix[i][j];
                resultGreen += pixel[1] * matrix[i][j];
                resultBlue += pixel[2] * matrix[i][j];
            }
        }

        return [resultRed, resultGreen, resultBlue];
    }

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const [red, green, blue] = applyMatrix(data, blurMatrix, x, y);

            blurredData[(y * width + x) * 4] = red;
            blurredData[(y * width + x) * 4 + 1] = green;
            blurredData[(y * width + x) * 4 + 2] = blue;
            blurredData[(y * width + x) * 4 + 3] = 255; // Alpha channel
        }
    }

    return blurredData;
}

function getPixel(data, width, x, y) {
    const pixelIndex = (y * width + x) * 4;
    return [
        data[pixelIndex],
        data[pixelIndex + 1],
        data[pixelIndex + 2],
        data[pixelIndex + 3],
    ];
}
