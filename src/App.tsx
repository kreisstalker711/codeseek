import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar.tsx';
import Footer from './components/footer.tsx';
import About from './pages/about.tsx';
import Settings from './pages/settings.tsx';
import Login from './pages/Login.tsx';
import { ThemeContext, Theme } from './components/ThemeContext.tsx';
import './App.css';

// A simple placeholder for your home page content
const Home = () => <h2>Welcome to CodeSeek.AI</h2>;

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    // Get theme from local storage or default to 'system'
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const effectiveTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    // Save theme choice to local storage
    localStorage.setItem('theme', theme);

    // Apply theme class to the body
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${effectiveTheme}-theme`);
  }, [theme, effectiveTheme]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

    return (
    <Router>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {isAuthenticated ? (
          <div className="App">
            <Navbar />
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        ) : (
          <Routes>
            <Route path="*" element={<Login onLogin={handleLogin} />} />
          </Routes>
        )}
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;