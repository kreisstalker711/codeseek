import React from 'react';

const tutorials = [
  { name: 'JavaScript', description: 'The language of the web. Learn from the ground up.' },
  { name: 'Python', description: 'Versatile and beginner-friendly. Great for data science and backend.' },
  { name: 'React', description: 'A JavaScript library for building user interfaces.' },
  { name: 'Node.js', description: 'Run JavaScript on the server-side. Perfect for building fast APIs.' },
];

const LanguageTutorials = () => {
  return (
    <div className="tutorials-container">
      <h2>Language & Framework Tutorials</h2>
      <div className="tutorials-grid">
        {tutorials.map((tutorial, index) => (
          <div key={index} className="card tutorial-card">
            <h3>{tutorial.name}</h3>
            <p>{tutorial.description}</p>
            <button>Start Learning</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageTutorials;