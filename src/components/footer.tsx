import React, { useState, useEffect } from 'react';
import './footer.css';

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });

  return (
    <footer className="footer">
      <p>Current Time in India: {formattedTime}</p>
    </footer>
  );
};

export default Footer;
