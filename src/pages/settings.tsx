import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext.tsx';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const [apiKey, setApiKey] = useState('');

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const handleSaveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    alert('API Key saved!');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      <div className="space-y-8">
        {/* Dark Mode Toggle */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <span>Dark Mode</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                theme === 'dark' ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`} />
            </button>
          </div>
        </div>

        {/* API Key Input */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">API Configuration</h3>
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Gemini API Key</label>
          <input id="api-key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Enter your API key" className="w-full p-3 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 mb-4" />
          <button onClick={handleSaveApiKey} className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Save Key</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;