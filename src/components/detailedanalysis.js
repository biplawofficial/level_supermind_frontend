import React, { useState, useEffect } from 'react';
import './da.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Scatter } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const SocialMediaAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sme.csv');
        const text = await response.text();
        
        // Parse CSV manually to ensure proper handling
        const rows = text.split('\n').filter(row => row.trim());
        const headers = rows[0].split(',');
        
        const parsedData = rows.slice(1).map(row => {
          const values = row.split(',');
          return headers.reduce((obj, header, index) => {
            // Convert numeric values
            const value = values[index];
            obj[header.trim()] = isNaN(value) ? value : Number(value);
            return obj;
          }, {});
        }).filter(item => item.Post_ID); // Filter out any invalid rows

        setData(parsedData);
      } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate engagement metrics by post type
  const engagementByType = React.useMemo(() => {
    if (!data.length) return [];
    
    const typeStats = {};
    data.forEach(post => {
      if (!typeStats[post.Post_Type]) {
        typeStats[post.Post_Type] = {
          totalLikes: 0,
          totalShares: 0,
          totalComments: 0,
          count: 0
        };
      }
      typeStats[post.Post_Type].totalLikes += post.Likes;
      typeStats[post.Post_Type].totalShares += post.Shares;
      typeStats[post.Post_Type].totalComments += post.Comments;
      typeStats[post.Post_Type].count++;
    });

    return Object.entries(typeStats).map(([type, stats]) => ({
      type,
      avgLikes: Math.round(stats.totalLikes / stats.count),
      avgShares: Math.round(stats.totalShares / stats.count),
      avgComments: Math.round(stats.totalComments / stats.count),
      totalEngagement: stats.totalLikes + stats.totalShares + stats.totalComments
    }));
  }, [data]);

  // Calculate engagement vs views scatter plot data
  const scatterData = React.useMemo(() => {
    if (!data.length) return [];
    
    return data.map(post => ({
      x: post.Likes + post.Comments + post.Shares,
      y: post.Views,
      label: post.Post_Type
    }));
  }, [data]);

  // Get top posts by engagement
  const topPosts = React.useMemo(() => {
    if (!data.length) return [];
    
    return [...data]
      .sort((a, b) => (b.Likes + b.Comments + b.Shares) - (a.Likes + a.Comments + a.Shares))
      .slice(0, 5);
  }, [data]);

  // Prepare chart data
  const engagementBarData = {
    labels: engagementByType.map(item => item.type),
    datasets: [
      {
        label: 'Average Likes',
        data: engagementByType.map(item => item.avgLikes),
        backgroundColor: '#FF6384',
      },
      {
        label: 'Average Shares',
        data: engagementByType.map(item => item.avgShares),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Average Comments',
        data: engagementByType.map(item => item.avgComments),
        backgroundColor: '#FFCE56',
      }
    ]
  };

  const scatterChartData = {
    datasets: [{
      label: 'Engagement vs Views',
      data: scatterData,
      backgroundColor: scatterData.map(item => {
        switch(item.label) {
          case 'video': return '#FF6384';
          case 'carousel': return '#36A2EB';
          case 'static_image': return '#FFCE56';
          default: return '#4BC0C0';
        }
      })
    }]
  };

  if (loading) {
    return <div className="analysis-container">Loading data...</div>;
  }

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Social Media Content Analysis</h1>
      
      <div className="charts-grid">
        {/* Engagement by Post Type */}
        <div className="chart-container1">
          <h2 className="chart-title1">Average Engagement by Post Type</h2>
          <div className="chart-wrapper1">
            <Bar
              data={engagementBarData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Engagement vs Views Scatter Plot */}
        <div className="chart-container1">
          <h2 className="chart-title1">Engagement vs Views</h2>
          <div className="chart-wrapper1">
            <Scatter 
              data={scatterChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Total Engagement'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Views'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Top Posts Table */}
        <div className="chart-container full-width">
          <h2 className="chart-title1">Top Performing Posts</h2>
          <div className="table-wrapper1">
            <table className="performance-table">
              <thead>
                <tr>
                  <th>Post ID</th>
                  <th>Type</th>
                  <th>Likes</th>
                  <th>Comments</th>
                  <th>Shares</th>
                  <th>Total Engagement</th>
                  <th>Posted On</th>
                </tr>
              </thead>
              <tbody>
                {topPosts.map(post => (
                  <tr key={post.Post_ID}>
                    <td>{post.Post_ID}</td>
                    <td>{post.Post_Type}</td>
                    <td>{post.Likes.toLocaleString()}</td>
                    <td>{post.Comments.toLocaleString()}</td>
                    <td>{post.Shares.toLocaleString()}</td>
                    <td>{(post.Likes + post.Comments + post.Shares).toLocaleString()}</td>
                    <td>{new Date(post.Post_DateTime).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaAnalysis;