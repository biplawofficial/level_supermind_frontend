// App.js
import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/NavBar/navigation';
import Chatbot from './components/ChatBot/Chatbot';
import DetailedAnalysis from './components/DetaailAnalysis/detailedanalysis';
import BotAdd from "./Animation - 1736158167474/animations/135d0b69-1487-46fb-93eb-0a75c030874b.json";
import Aboutus from './components/AboutUs/AboutUs';
import './App.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const routeRef = useRef(null);

  useEffect(() => {
    // Fade in animation for main content
    gsap.fromTo(mainRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power2.out"
      }
    );

    // Animate route content on page load
    gsap.fromTo(routeRef.current,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out"
      }
    );

    // Add scroll animations
    const sections = routeRef.current.children;
    Array.from(sections).forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div className='mainn' ref={mainRef}>
      <Router>
        <div className='nav'>
          <Navigation />
        </div>
        <div className='route' ref={routeRef}>
          <Routes>
            <Route path="/" element={<Aboutus />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detailed-analysis" element={<DetailedAnalysis />} />
            <Route path="/chatbot" element={<Chatbot botAnimation={BotAdd}/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;