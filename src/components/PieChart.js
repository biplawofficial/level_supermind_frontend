import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend, Title);
const PieChart = ({ chartData, chartLabels, title }) => {
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: title,
        data: chartData,
        backgroundColor: [
          '#4FC3F7', // Sky Blue
          '#81C784', // Soft Green
          '#FF8A80', // Soft Red
          '#FFD54F', // Warm Yellow
          '#BA68C8', // Lavender Purple
          '#FFAB91', // Peach
          '#FFF176', // Sunny Yellow
      ],
      
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          weight: 'bold',
          family: 'Arial, sans-serif',
        },
        color: '#333',
        padding: {
          top: 10,
          bottom: 20,
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
    <div style={{ width: '500px', height: '500px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};
export default PieChart;