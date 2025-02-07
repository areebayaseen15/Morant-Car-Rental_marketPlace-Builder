'use client';
import React, { useState, useEffect } from 'react';

const DarkModePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      // Update the class on the document body
      if (newMode) {
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`max-w-4xl mx-auto p-8 rounded-xl shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dark Mode Page</h1>
        <p className={`mt-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          This is a dedicated page to demonstrate dark mode functionality. Toggle the button below to switch themes.
        </p>
        <button
          onClick={toggleDarkMode}
          className={`mt-6 p-2 rounded-lg ${isDarkMode ? 'bg-yellow-400 text-gray-800' : 'bg-gray-800 text-white'}`}
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default DarkModePage;