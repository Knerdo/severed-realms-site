import React from 'react';
import { Link } from 'react-router-dom';
import MarketingShell from './MarketingShell';

const ArchitectPage = () => {
  return (
    <MarketingShell title="The Architect">
      <section className="landing-section" aria-labelledby="architect-title">
        <div className="landing-shell">
          <div className="landing-returnRow">
            <Link to="/" className="landing-returnHome" aria-label="Return to home">
              Return Home
            </Link>
          </div>

          <header className="landing-sectionHeader">
            <h1 id="architect-title" className="landing-h2">
              The Architect
            </h1>
            <p className="landing-lede">Notes, intent, and structure behind Severed Realms.</p>
          </header>

          <div className="landing-panel">
            <p className="landing-copy">
              Placeholder content. Use this area for project intent, design goals, and non-spoiler
              principles.
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};

export default ArchitectPage;

