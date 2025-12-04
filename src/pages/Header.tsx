import React from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold">Dev Tools Dashboard</h1>
    </header>
  );
};

export default Header;