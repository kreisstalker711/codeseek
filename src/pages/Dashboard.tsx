import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';

/**
 * The Dashboard component renders a layout with a sidebar and a main content area.
 * The sidebar is collapsible and can be toggled by clicking the button in the header.
 * The main content area renders the outlet of the router, which displays the current route.
 * The component uses the `useState` hook to store the state of the sidebar's collapsed status.
 * The component uses the `useDarkMode` hook from `react-use-dark-mode` to toggle the dark mode.
 */
const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center">
          <button onClick={() => setSidebarCollapsed(!isSidebarCollapsed)} className="mr-4 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaBars />
          </button>
          <h1 className="text-xl font-semibold">Dev Tools</h1>
        </header>
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;