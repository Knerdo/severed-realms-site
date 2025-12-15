import React from 'react';
import { NavLink } from 'react-router-dom';

const navClass = ({ isActive }) =>
  `landing-navbtn${isActive ? ' landing-navbtn--active' : ''}`;

const MarketingShell = ({ title, children }) => {
  return (
    <div className="landing-root">
      <header className="landing-header">
        <div className="landing-shell">
          <nav aria-label="Primary" className="landing-nav">
            <NavLink className={navClass} to="/codex">
              Codex
            </NavLink>
            <NavLink className={navClass} to="/sagas">
              The Sagas
            </NavLink>
            <NavLink className={navClass} to="/reliquary">
              Reliquary
            </NavLink>
            <NavLink className={navClass} to="/architect">
              The Architect
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="landing-main" aria-label={title}>
        {children}
      </main>
    </div>
  );
};

export default MarketingShell;

