import React from 'react';

const shortcuts = [
  {
    name: 'VS Code',
    items: [
      { key: 'Ctrl + P', desc: 'Go to File' },
      { key: 'Ctrl + Shift + P', desc: 'Show Command Palette' },
      { key: 'Ctrl + D', desc: 'Add selection to next find match' },
    ],
  },
  {
    name: 'React DevTools',
    items: [
      { key: 'Alt + Cmd + I', desc: 'Open DevTools' },
      { key: 'Select element', desc: 'Inspect in React DevTools' },
      { key: 'Profiler', desc: 'Record component render performance' },
    ],
  },
];

const FrameworkShortcuts = () => {
  return (
    <div className="shortcuts-container">
      <h2>Framework & Editor Shortcuts</h2>
      {shortcuts.map((shortcut, index) => (
        <div key={index} className="card shortcut-card">
          <h3>{shortcut.name}</h3>
          <ul>{shortcut.items.map((item, i) => <li key={i}><strong>{item.key}:</strong> {item.desc}</li>)}</ul>
        </div>
      ))}
    </div>
  );
};

export default FrameworkShortcuts;