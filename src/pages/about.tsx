import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About CodeSeek.AI</h1>
      <p className="about-intro">
        CodeSeek.AI is an intelligent search engine designed to help developers and tech enthusiasts find accurate, code-aware answers to their most challenging questions.
      </p>

      <div className="mission-vision">
        <h2>Our Mission</h2>
        <p>To empower developers by providing a fast, intuitive, and precise search experience that understands the context of code and technical documentation, accelerating learning and problem-solving.</p>

        <h2>Our Vision</h2>
        <p>To become the essential tool for every developer, fostering a world where technical knowledge is instantly accessible and easy to comprehend, breaking down barriers to innovation.</p>
      </div>
      <div className="team-section">
        <h2>Meet the Team</h2>
        <p>CodeSeek.AI is developed by a passionate team of software engineers, AI researchers, and UX designers dedicated to enhancing the developer experience through cutting-edge technology.</p>
        <div className="team-members">
            <div className="team-member">
                <h3>Kreis Stalker</h3>
                <p>Lead Developer</p>
            </div>
            <div className="team-member">
                <h3>Hawk Ballastic</h3>
                <p>AI Researcher</p>
            </div>
            <label><span>UI/UX by</span></label>
            <div className="team-member">
                <h3>Peirston Scott Ethan</h3>
                <p>UI/UX Designer</p>
            </div>
            <div className="team-member">
                <h3>Arc Johnson</h3>
                <p>UI/UX Designer</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;