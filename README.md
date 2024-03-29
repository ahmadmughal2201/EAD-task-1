# Image Processing Project with Web Workers

## Project Description

This project demonstrates the use of Web Workers in JavaScript for image processing. It includes an implementation of a blur filter using Web Workers to offload the computationally intensive task from the main thread, preventing UI freezes during image-related interactions.

## Findings

### Improved Responsiveness

The application demonstrates significantly improved responsiveness during image processing tasks. Users can smoothly interact with the application while image blur operations are being performed in the background.

### Reduced Processing Time

Utilizing Web Workers leads to a noticeable reduction in processing time for image blur operations. The parallel execution of tasks enhances the overall performance of the image processing feature.

## Challenges Faced and Solutions

### Challenge 1: Setting Up Web Workers

Setting up Web Workers and communicating between the main thread and workers required careful consideration.

**Solution:** Thoroughly understand the communication mechanism between the main thread and Web Workers, ensuring proper data transfer and synchronization.

### Challenge 2:  Performance Testing

Measuring the actual performance improvements and ensuring that Web Workers positively impact user experience required performance testing.

**Solution:** Implement performance measurements, comparing the time taken for image processing with and without Web Workers. Analyze the results to validate the benefits.

## Conclusion

This project serves as a practical example of integrating Web Workers in JavaScript for image processing, highlighting the improved performance and user experience achieved by offloading tasks to background threads. It also addresses challenges encountered during the development process, providing insights into effective solutions.

Feel free to explore the code and experiment with different images to observe the impact of Web Workers on image processing tasks.

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmadmughal2201/EAD-task-1
2. **navigate to the folder**
3. **Open index.html in your preferred web browser.**