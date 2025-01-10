// Dashboard.js
import React, { useState, useEffect } from "react";
import CsvParser from "./CsvParser";
import MetricDropdown from "./MetricDropdown";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import "./Dashboard.css";
import EngagementOverTime from "./EngagementOverTime";

const Dashboard = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Likes");
  const [chartData, setChartData] = useState([]);
  const [postTypes] = useState(["carousel", "reels", "static_image", "video"]);

  useEffect(() => {
    if (csvData.length > 0) {
      const groupedData = postTypes.map((postType) => {
        const postsByType = csvData.filter(
          (post) => post["Post_Type"] === postType
        );
        return postsByType.reduce((acc, post) => {
          const postValue = post[selectedMetric] || 0;
          return acc + postValue;
        }, 0);
      });
      setChartData(groupedData);
    }
  }, [csvData, selectedMetric]);

  const handleTotalEngagement = () => {
    return csvData.reduce((acc, post) => {
      const likes = post["Likes"] || 0;
      const comments = post["Comments"] || 0;
      const shares = post["Shares"] || 0;
      return acc + likes + comments + shares;
    }, 0);
  };

  const handleAvgMetric = (metric) => {
    const total = csvData.reduce((acc, post) => acc + (post[metric] || 0), 0);
    return (total / csvData.length).toFixed(0);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Social Media Analytics Dashboard</h1>
      <h3 className="mini">One place for all your social media analytics</h3>
      
      <div className="metrics-container">
        <div className="metric-card">
          <h3>Total Posts</h3>
          <p>{csvData.length}</p>
        </div>
        <div className="metric-card">
          <h3>Total Engagement</h3>
          <p>{handleTotalEngagement()}</p>
        </div>
        <div className="metric-card">
          <h3>Avg Comments</h3>
          <p>{handleAvgMetric("Comments")}</p>
        </div>
        <div className="metric-card">
          <h3>Avg Views</h3>
          <p>{handleAvgMetric("Views")}</p>
        </div>
      </div>

      <div className="charts-section">
        <h1 className="charts-title">Engagement by Post Type</h1>
        <MetricDropdown
          selectedMetric={selectedMetric}
          onSelectMetric={setSelectedMetric}
        />
        <div className="charts-container">
          <div className="chart-wrapper">
            <BarChart
              chartData={chartData}
              chartLabels={postTypes}
              title={`Average ${selectedMetric} by Post Type`}
            />
          </div>
          <div className="chart-wrapper">
            <PieChart
              chartData={chartData}
              chartLabels={postTypes}
              title={`Average ${selectedMetric} by Post Type`}
            />
          </div>
        </div>
        <div className="engagement-over-time">
          <EngagementOverTime csvData={csvData} />
        </div>
        <CsvParser onDataParsed={setCsvData} csvFilePath="/sme.csv" />
      </div>
    </div>
  );
};

export default Dashboard;