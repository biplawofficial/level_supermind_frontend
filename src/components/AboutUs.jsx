import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Sudarsh from '../data/sud.jpeg';
import Krish from '../data/kris.jpeg';
import Biplaw from '../data/bip.jpeg';
import Simran from '../data/sim.jpg';

const colors = { 
  background: '#FFFFFF',    // Pure white background
  card: '#EDE7F6',          // Soft lavender for cards
  accent1: '#6A1B9A',       // Deep purple for primary accents
  accent2: '#9C27B0',       // Bright purple for secondary accents
  text: '#200D1F',          // Deep purple for primary text
  textSecondary: '#6E5484', // Muted purple for secondary text
  border: '#D1C4E9',        // Subtle lavender border
  hover: '#F3E5F5',         // Very light purple for hover state
  overlay: 'rgba(237, 231, 246, 0.05)', // Very subtle purple overlay
};


const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    color: colors.text,
    overflowX: 'hidden',
  },
  heroSection: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: colors.background,
  },
  gradientOverlay: {
    position: 'absolute',
    inset: 0,
    background: `radial-gradient(circle at 50% 50%, ${colors.overlay}, transparent 70%)`,
    zIndex: 0,
  },
  heroContent: {
    position: 'relative',
    zIndex: 9,
    textAlign: 'center',
    padding: '0 1rem',
  },
  neonText: {
    color: colors.accent1,
    textShadow: `0 0 10px ${colors.accent1}40`,
  },
  heading: {
    fontSize: '10rem',
    marginBottom: '1.5rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    '@media (min-width: 768px)': {
      fontSize: '6rem',
    },
  },
  subheading: {
    fontSize: '2rem',
    color: colors.textSecondary,
    maxWidth: '48rem',
    margin: '0 auto',
    lineHeight: 1.6,
    '@media (min-width: 768px)': {
      fontSize: '1.5rem',
    },
  },
  section: {
    padding: '5rem 1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  sectionContainer: {
    maxWidth: '80rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 9,
  },
  sectionHeading: {
    fontSize: '3rem',
    textAlign: 'center',
    marginBottom: '4rem',
    color: colors.accent1,
    fontWeight: '700',
    letterSpacing: '-0.02em',
    '@media (min-width: 768px)': {
      fontSize: '3rem',
    },
  },
  grid: {
    display: 'flex',
    gap: '2rem',
    overflowX: 'auto',
    padding: '1rem',
    scrollSnapType: 'x mandatory',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  
  teamMemberCard: {
    flex: '0 0 300px',
    scrollSnapAlign: 'start',
    backgroundColor: colors.card,
    borderRadius: '16px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: `1px solid ${colors.border}`,
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: `0 20px 40px -20px ${colors.accent1}30`,
      backgroundColor: colors.hover,
    },
  },
  
  testimonialGrid: {
    display: 'flex',
    gap: '2rem',
    overflowX: 'auto',
    padding: '1rem',
    scrollSnapType: 'x mandatory',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  
  testimonialCard: {
    flex: '0 0 400px',
    scrollSnapAlign: 'start',
    padding: '2rem',
    backgroundColor: colors.card,
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 20px 40px -20px ${colors.accent1}30`,
      backgroundColor: colors.hover,
    },
  },
  memberImage: {
    width: '150px',
    height: '150px',
    borderRadius: '16px',
    marginBottom: '1.5rem',
    border: `2px solid ${colors.accent1}`,
    objectFit: 'cover',
  },
  memberName: {
    color: colors.text,
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  memberTitle: {
    color: colors.accent1,
    fontSize: '1.125rem',
    marginBottom: '1rem',
    fontWeight: '500',
  },
  memberBio: {
    color: colors.textSecondary,
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  socialLink: {
    backgroundColor: 'transparent',
    color: colors.accent1,
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    border: `1px solid ${colors.accent1}`,
    '&:hover': {
      backgroundColor: colors.accent1,
      color: colors.background,
    },
  },
  statGrid: {
    display: 'flex',
    gap: '2rem',
    overflowX: 'auto',
    padding: '1rem',
    scrollSnapType: 'x mandatory',
    '-webkit-overflow-scrolling': 'touch',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },

  statCard: {
    flex: '0 0 300px',
    scrollSnapAlign: 'start',
    padding: '2rem',
    textAlign: 'center',
    backgroundColor: colors.card,
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 20px 40px -20px ${colors.accent1}30`,
      backgroundColor: colors.hover,
    },
  },

  statNumber: {
    fontSize: '3rem',
    fontWeight: '700',
    color: colors.accent1,
    marginBottom: '0.5rem',
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: '1.125rem',
  },
  
  testimonialText: {
    fontSize: '1.125rem',
    color: colors.text,
    marginBottom: '1.5rem',
    lineHeight: 1.7,
  },
  testimonialAuthor: {
    color: colors.accent1,
    fontWeight: '600',
  },
  testimonialCompany: {
    color: colors.textSecondary,
  },
  callToAction: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '2rem',
  },

  button: {
    background: 'linear-gradient(to right, #23074d, #cc5333)',
    color: '#fff',
    fontWeight: 'bold',
    padding: '0.75rem 2rem',
    borderRadius: '9999px',
    fontSize: '1.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      background: colors.background,
    },
  },

  footer: {
    backgroundColor: colors.background,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: '2rem',
    borderTop: `1px solid ${colors.border}`,
  },

  missionText: {
    fontSize: '1.25rem',
    color: colors.textSecondary,
    maxWidth: '48rem',
    margin: '2rem auto',
    textAlign: 'center',
    lineHeight: 1.7,
  },
};

const FloatingShape = ({ color, top, left, right, bottom, size }) => {
  const shapeStyle = {
    ...styles.floatingShape,
    backgroundColor: color,
    width: size,
    height: size,
    top: top || 'auto',
    left: left || 'auto',
    right: right || 'auto',
    bottom: bottom || 'auto',
  };

  return <div style={shapeStyle} />;
};

const StatCard = ({ number, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={styles.statCard}
  >
    <h3 style={styles.statNumber}>{number}</h3>
    <p style={styles.statLabel}>{label}</p>
  </motion.div>
);

const TeamMemberCard = ({ member }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={styles.teamMemberCard}
  >
    <img
      src={member.image}
      alt={member.name}
      style={styles.memberImage}
      onError={(e) => {
        e.target.onerror = null; // Prevent infinite loop
        console.error(`Failed to load image for ${member.name}`);
      }}
    />
    <h3 style={styles.memberName}>{member.name}</h3>
    <p style={styles.memberTitle}>{member.title}</p>
    <p style={styles.memberBio}>{member.bio}</p>
    <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      style={styles.socialLink}
    >
      Connect on LinkedIn
    </a>
  </motion.div>
);



// Team members data
const teamMembers = [
  {
    name: "Sudarsh Chaturvedi",
    title: "Chief Technology Officer",
    bio: "AI researcher turned entrepreneur with 10+ years experience in machine learning and data analytics.",
    image: Sudarsh,
    linkedin: "https://www.linkedin.com/in/sudarsh-chaturvedi/"
  },
  {
    name: "Krish Shrama",
    title: "Full Stack Developer",
    bio: "Product visionary with a track record of launching successful SaaS platforms in the analytics space.",
    image: Krish,
    linkedin: "https://www.linkedin.com/in/krish-sharma-669048241/"
  },
  {
    name: "Biplaw Debnath",
    title: "Data Scientist",
    bio: "AI researcher currently working in the computer vision domain, I am also rated 3 Star (1757) on Codechef",
    image: Biplaw,
    linkedin: "https://www.linkedin.com/in/biplaw-debnath/"
  },
  {
    name: "Simran Sharma",
    title: "quidditch player",
    bio: "PhD specializing in natural language processing and social media trend analysis",
    image: Simran,
    linkedin: "https://www.linkedin.com/in/simran-sharma-0121s"
  }
];

const TestimonialCard = ({ quote, author, company }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={styles.testimonialCard}
  >
    <p style={styles.testimonialText}>"{quote}"</p>
    <div>
      <p style={styles.testimonialAuthor}>{author}</p>
      <p style={styles.testimonialCompany}>{company}</p>
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
    <div style={styles.container} ref={targetRef}>
      <motion.div style={{ ...styles.heroSection, opacity, scale }}>
        <div style={styles.gradientOverlay} />
        <div style={styles.heroContent}>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ ...styles.heading, ...styles.neonText }}
          >
            Analytixs
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={styles.subheading}
          >
            Insightful Analytics, Instantly!!
          </motion.p>
        </div>
      </motion.div>

      <section style={{ ...styles.section, background: colors.background }}>
        <div style={styles.sectionContainer}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ ...styles.gradientText, ...styles.sectionHeading }}
          >
            Our Mission
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={styles.missionText}
          >
            <p>
            Making social media analytics simple and actionable. Using AI-powered insights
            , we help creators and marketers track engagement, spot trends, and optimize content—whether it’s reels, carousels, or static posts. 
            Our mission is to turn data into smarter decisions, so you can grow and connect with your audience effortlessly.







            </p>
            <p style={{ marginTop: '1.5rem' }}>
              We believe great content deserves great insights.
Let’s turn data into impact—one post at a time
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ ...styles.section, background: colors.background }}>
        <div style={styles.sectionContainer}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ ...styles.gradientText, ...styles.sectionHeading }}
          >
            Our Impact
          </motion.h2>
          <div style={styles.statGrid}>
            <StatCard number="1000+" label="Data Points Tracked " />
            <StatCard number="50000+" label="Engagements Analyzed" />
            <StatCard number="98%" label="Customer Satisfaction" />
          </div>
        </div>
      </section>

      <section style={{ ...styles.section, background: colors.background }}>
        <div style={styles.sectionContainer}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ ...styles.gradientText, ...styles.sectionHeading }}
          >
            Meet Our Team
          </motion.h2>
          <div style={styles.grid}>
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...styles.section, background: colors.background }}>
        <div style={styles.sectionContainer}>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ ...styles.gradientText, ...styles.sectionHeading }}
          >
            What Our Clients Say
          </motion.h2>
          <div style={styles.testimonialGrid}>
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

      <section style={{ ...styles.section, background: colors.background }}>
        <div style={styles.callToAction}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ ...styles.gradientText, ...styles.sectionHeading }}
          >
            Ready to Elevate Your Social Media Game?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ ...styles.subheading, marginBottom: '2rem' }}
          >
            Join thousands of businesses that have already revolutionized their social media strategy with Social Pulse. 
            Let's connect and explore how we can transform your online presence.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={styles.button}
          >
            Get Started
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
