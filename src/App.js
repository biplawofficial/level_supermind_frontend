// App.js
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Navigation from './components/navigation';
import Chatbot from './components/Chatbot';
import DetailedAnalysis from './components/detailedanalysis';
import BotAdd from "./Animation - 1736158167474/animations/135d0b69-1487-46fb-93eb-0a75c030874b.json"
import Aboutus from './components/AboutUs';

<style>
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&display=swap');
</style>

function App() {
  return (
    <div className='mainn'>
        <Router>
      <div className='nav'>
      <Navigation />
      </div>
      <div className='route'>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/detailed-analysis" element={<DetailedAnalysis />} />
        <Route path="/chatbot" element={<Chatbot botAnimation={BotAdd}/>} />
      </Routes>
      </div>
    </Router>
    </div>
    
  );
};

export default App;
