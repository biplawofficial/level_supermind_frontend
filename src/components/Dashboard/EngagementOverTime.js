// EngagementOverTime.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import './EngagementOverTime.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const EngagementOverTime = ({ csvData = [] }) => {
  const [selectedMetrics, setSelectedMetrics] = useState(['Likes']);
  const [chartData, setChartData] = useState({});
  const availableMetrics = ['Likes', 'Comments', 'Shares', 'Views'];

  useEffect(() => {
    if (Array.isArray(csvData) && csvData.length > 0 && selectedMetrics.length > 0) {
      const groupedData = selectedMetrics.map((metric) => {
        const dates = [...new Set(csvData.map((post) => post['Post_Date'] || ''))];
        const data = dates.map((date) => {
          const total = csvData
            .filter((post) => post['Post_Date'] === date)
            .reduce((sum, post) => sum + (post[metric] || 0), 0);
          return total;
        });
        return { metric, dates, data };
      });

      const chartDataset = groupedData.map(({ metric, data }) => ({
        label: metric,
        data: data,
        fill: false,
        borderColor: getRandomColor(),
        tension: 0.4,
      }));

      setChartData({
        labels: reduceLabels(groupedData[0]?.dates || []),
        datasets: chartDataset,
      });
    } else {
      setChartData({ labels: [], datasets: [] });
    }
  }, [csvData, selectedMetrics]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const reduceLabels = (labels) => {
    const step = Math.ceil(labels.length / 10);
    return labels.filter((_, index) => index % step === 0);
  };

  const handleMetricToggle = (metric) => {
    setSelectedMetrics((prev) => {
      if (prev.includes(metric)) {
        return prev.filter((m) => m !== metric);
      }
      return [...prev, metric];
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Engagement Metrics Over Time',
        font: {
          size: window.innerWidth < 768 ? 20 : 30,
          weight: 'bold'
        },
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        position: window.innerWidth < 768 ? 'bottom' : 'top',
        labels: {
          boxWidth: window.innerWidth < 768 ? 10 : 40,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#333',
        titleFont: { 
          size: window.innerWidth < 768 ? 12 : 14,
          weight: 'bold'
        },
        bodyFont: {
          size: window.innerWidth < 768 ? 10 : 12
        },
        borderColor: '#fff',
        borderWidth: 1,
        padding: window.innerWidth < 768 ? 5 : 10,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          },
          maxRotation: 45,
          minRotation: 45
        },
        title: {
          display: true,
          text: 'Post Date',
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
            weight: 'bold'
          },
          color: '#333'
        }
      },
      y: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        },
        title: {
          display: true,
          text: 'Count',
          font: {
            size: window.innerWidth < 768 ? 12 : 14,
            weight: 'bold'
          },
          color: '#333'
        }
      }
    }
  };

  return (
    <div className="engagement-container">
      <h2 className="engagement-title">Engagement Metrics Over Time</h2>
      
      <div className="metric-selection">
        {availableMetrics.map((metric) => (
          <button
            key={metric}
            className={`metric-button ${selectedMetrics.includes(metric) ? 'selected' : ''}`}
            onClick={() => handleMetricToggle(metric)}
          >
            {metric}
          </button>
        ))}
      </div>

      <div className="graph-container">
        {chartData.datasets?.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>No data to display.</p>
        )}
      </div>
    </div>
  );
};

export default EngagementOverTime;