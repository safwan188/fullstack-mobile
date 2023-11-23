import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/Picture1.png`} alt="Logo" className="login-logo" />
      </div>
      <nav>
        <ul className="sidebar-nav">
         
          <li className="nav-item">
            <Link to="/reports">דוחות</Link>
          </li>
          <li className="nav-item">
            <Link to="/experts">קבלנים</Link>
          </li>
          <li className="nav-item">
            <Link to="/customers">לקוחות</Link>
          </li>
          <li className="nav-item">
            <Link to="/property">נכסי לקוחות</Link>
          </li>
        
          <li className="nav-item">
            <Link to="/expert-requests">בקשות קבלנים</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
