// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData, chartLabels, title }) => {
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, '#806ebe'); // Light color at the top
    gradient.addColorStop(1, '#272264'); // Dark color at the bottom
    return gradient;
  };

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: title,
        data: chartData,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // Wait until chartArea is initialized
            return;
          }

          return createGradient(ctx, chartArea);
        },
        hoverBackgroundColor: '#333', // Hover effect color
        hoverBorderColor: '#333', // Hover effect border
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom sizing of the chart
    aspectRatio: 1, // Keep the chart with equal width and height (200x200)
    animation: {
      duration: 800, // Smooth animation duration
      easing: 'easeOutQuad', // Smooth easing function
    },
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: 'bold',
          family: 'Arial, sans-serif',
        },
        color: '#444', // Slightly lighter color for the title
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: '#333', // Dark tooltip background
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        borderColor: '#fff',
        borderWidth: 1,
        padding: 10,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Post Type',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#444', // Slightly lighter color for x-axis labels
        },
      },
      y: {
        title: {
          display: true,
          text: 'Engagement Metric',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#444', // Slightly lighter color for y-axis labels
        },
      },
    },
  };

  return (
    <div style={{ width: '700px', height: '500px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
