import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCogs, FaRegFileCode, FaSpellCheck, FaVial } from 'react-icons/fa';

interface SidebarProps {
  isCollapsed: boolean;
}

const navItems = [
  { to: '/dashboard/formatter', icon: <FaRegFileCode />, label: 'Formatter' },
  { to: '/dashboard/regex-tester', icon: <FaVial />, label: 'Regex Tester' },
  { to: '/dashboard/json-validator', icon: <FaSpellCheck />, label: 'JSON Validator' },
  { to: '/dashboard/settings', icon: <FaCogs />, label: 'Settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const linkClasses = "flex items-center p-3 my-1 rounded-lg text-gray-300 hover:bg-teal-700 transition-colors";
  const activeLinkClasses = "bg-teal-800 font-semibold";

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="p-4 font-bold text-2xl text-center border-b border-gray-700">
        {isCollapsed ? 'DT' : 'DevTools'}
      </div>
      <nav className="p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ''}`
            }
            title={isCollapsed ? item.label : undefined}
          >
            <span className="text-xl">{item.icon}</span>
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;