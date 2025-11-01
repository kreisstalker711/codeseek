import React, { useContext } from 'react';
import { ThemeContext, ThemeContextType } from '../components/ThemeContext.tsx';
import './Settings.css';

const Settings: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext) as ThemeContextType;

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as 'light' | 'dark' | 'system');
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <section className="settings-section">
        <h2>Appearance</h2>
        <div className="setting-item">
          <label htmlFor="theme-select">Theme</label>
          <select id="theme-select" value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>
      </section>

      <section className="settings-section">
        <h2>About</h2>
        <p>CodeSeek.AI Version 1.0.0</p>
      </section>
    </div>
  );
};

export default Settings;