// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/items-list">Items list</Link></li>
        <li><Link to="/stock-in">Stock In</Link></li>
        <li><Link to="/stock-out">stock Out</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
