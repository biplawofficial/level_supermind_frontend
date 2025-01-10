import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Sudarsh from '../../data/sud.jpeg';
import Krish from '../../data/kris.jpeg';
import Biplaw from '../../data/bip.jpeg';
import Simran from '../../data/sim.jpg';
import './AboutUs.css'
import { Link } from 'react-router-dom';

const StatCard = ({ number, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="stat-card"
  >
    <h3 className="stat-number">{number}</h3>
    <p className="stat-label">{label}</p>
  </motion.div>
);

const TeamMemberCard = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="team-member-card"
  >
    <img
      src={member.image}
      alt={member.name}
      className="member-image"
      onError={(e) => {
        e.target.onerror = null;
        console.error(`Failed to load image for ${member.name}`);
      }}
    />
    <h3 className="member-name">{member.name}</h3>
    <p className="member-title">{member.title}</p>
    <p className="member-bio">{member.bio}</p>
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
    >
      Connect on LinkedIn
    </a>
    <a
      href={member.github}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
    >
      Connect on GitHub
    </a>
  </motion.div>
);

const teamMembers = [
  {
    name: "SudarshChaturvedi",
    image: Sudarsh,
    linkedin: "https://www.linkedin.com/in/sudarsh-chaturvedi/",
    github: "https://github.com/Hackermans1"
  },
  {
    name: "Krish Sharma",
    image: Krish,
    linkedin: "https://www.linkedin.com/in/krish-sharma-669048241/",
    github: "https://github.com/krishSharma1810"
  },
  {
    name: "Biplaw Debnath",
    image: Biplaw,
    linkedin: "https://www.linkedin.com/in/biplaw-debnath/",
    github: "https://github.com/biplawofficial"
  },
  {
    name: "???????",
    image: "#",
    linkedin: "#",
    github: "#"
  }
];

const TestimonialCard = ({ quote, author, company }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="testimonial-card"
  >
    <p className="testimonial-text">"{quote}"</p>
    <div>
      <p className="testimonial-author">{author}</p>
      <p className="testimonial-company">{company}</p>
    </div>
  </motion.div>
);

const AboutUs = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  return (
    <div className="container" ref={targetRef}>
      <motion.div
        className="hero-section"
        style={{ opacity, scale }}
      >
        <div className="gradient-overlay" />
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="heading neon-text"
          >
            Analytixs
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="subheading"
          >
            Insightful Analytics, Instantly!!
          </motion.p>
        </div>
      </motion.div>

      <section className="section">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            Our Mission
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mission-text"
          >
            <p>
              Making social media analytics simple and actionable. Using AI-powered insights,
              we help creators and marketers track engagement, spot trends, and optimize content—whether it's reels, carousels, or static posts.
              Our mission is to turn data into smarter decisions, so you can grow and connect with your audience effortlessly.
            </p>
            <p style={{ marginTop: '1.5rem' }}>
              We believe great content deserves great insights.
              Let's turn data into impact—one post at a time
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            Our Impact
          </motion.h2>
          <div className="stat-grid">
            <StatCard number="1000+" label="Data Points Tracked" />
            <StatCard number="50000+" label="Engagements Analyzed" />
            <StatCard number="98%" label="Customer Satisfaction" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            What Our Clients Say
          </motion.h2>
          <div className="testimonial-grid">
            <TestimonialCard
              quote="This has completely transformed our social media strategy. The insights we've gained are invaluable."
              author="Gabar Singh"
              company="Tech Innovators Inc."
            />
            <TestimonialCard
              quote="Mai Khush Hu. Highly recommended!"
              author="Mogambo"
              company="Global Marketing Solutions"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="call-to-action">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="section-heading"
          >
            Ready to Elevate Your Social Media Game?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="subheading"
            style={{ marginBottom: '2rem' }}
          >
            Join thousands of businesses that have already revolutionized their social media strategy with Social Pulse.
            Let's connect and explore how we can transform your online presence.
          </motion.p>
          <motion.div className="button-container">
            <Link to="/chatbot">
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="button"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
