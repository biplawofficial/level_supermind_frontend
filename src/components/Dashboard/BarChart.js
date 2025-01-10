// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData, chartLabels, title }) => {
  const createGradient = (ctx, chartArea) => {
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, '#806ebe');
    gradient.addColorStop(1, '#272264');
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
            return;
          }
          return createGradient(ctx, chartArea);
        },
        hoverBackgroundColor: '#333',
        hoverBorderColor: '#333',
        hoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuad',
    },
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
          family: 'Arial, sans-serif',
        },
        color: '#444',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#333',
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
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;