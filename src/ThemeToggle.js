
import React from 'react';
import { useTheme } from './ThemeContext';

function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;
