// components/Navbar.jsx
import React from 'react';

const Header = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <div className="flex items-center space-x-2">
        <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
        <span className="font-bold text-xl">Logoipsum</span>
      </div>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        <li><a href="/dashboard" className="hover:text-blue-600">Dashboard</a></li>
        <li><a href="/questions" className="hover:text-blue-600">Questions</a></li>
        <li><a href="/upgrade" className="hover:text-blue-600">Upgrade</a></li>
        <li><a href="/how-it-works" className="hover:text-blue-600">How it Works?</a></li>
      </ul>
      
    </nav>
  );
};

export default Header;
