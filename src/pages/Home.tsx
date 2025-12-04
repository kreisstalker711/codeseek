import React, { useState, useEffect, CSSProperties } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const linkStyle: CSSProperties = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <div className="home-container">
      <div className="greeting">
        <h2>{username}, how can I help you today?</h2>
      </div>
      <div className="cards-container">
        <Link to="/explain-code" style={linkStyle}>
          <div className="card">
            <h3>Explain a Code Snippet</h3>
            <p>Paste your code and get a detailed explanation of what it does.</p>
          </div>
        </Link>
        <div className="card">
          <h3>Debug an Error</h3>
          <p>Describe your error message and I'll help you find the cause.</p>
        </div>
        <div className="card">
          <h3>Write a Function</h3>
          <p>Tell me what you need a function to do, and I'll generate the code.</p>
        </div>
        <div className="card">
          <h3>Suggest an Algorithm</h3>
          <p>Describe your problem and I'll suggest a suitable algorithm.</p>
        </div>
        <div className="card">
          <h3>Learn a New Language</h3>
          <p>Get a roadmap and resources for learning languages like Python or Rust.</p>
        </div>
        <div className="card">
          <h3>Master a Framework</h3>
          <p>Explore tutorials and best practices for frameworks like React or Django.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;