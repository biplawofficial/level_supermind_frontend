// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData, chartLabels, title }) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: title,
        data: chartData,
        backgroundColor: [
          '#4FC3F7',
          '#81C784',
          '#FF8A80',
          '#FFD54F',
          '#BA68C8',
          '#FFAB91',
          '#FFF176',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
        position: 'bottom',
        labels: {
          font: {
            size: 11,
          },
          padding: 15,
        },
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
  };

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;