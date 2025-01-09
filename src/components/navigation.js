import React from 'react';
import './navigation.css';
import { Link } from 'react-router-dom';

<style>
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');
</style>


const Navigation = () => {
  return (
    <div className='c1'>
      <div className='analyti'>Analytixs</div>
      <div className='nav-buttons'>
        <Link to="/" className="nav-btn">Dashboard</Link>
        <Link to="aboutus" className="nav-btn">About Us</Link>
        <Link to="/detailed-analysis" className="nav-btn">Detailed Analysis</Link>
        <Link to="/chatbot" className="nav-btn">Chatbot</Link>

      </div>
    </div>
  );
};
export default Navigation;
