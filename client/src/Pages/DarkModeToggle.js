import React from 'react';

function DarkModeToggle(props) {
    const { darkMode, toggleMode } = props;
  
    return (
      <button onClick={toggleMode}>
        {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
      </button>
    );
  }
  
  export default DarkModeToggle;