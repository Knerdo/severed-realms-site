import React from 'react';
import { Link } from 'react-router-dom';
import MarketingShell from './MarketingShell';

const ReliquaryPage = () => {
  return (
    <MarketingShell title="Reliquary">
      <section className="landing-section" aria-labelledby="reliquary-title">
        <div className="landing-shell">
          <div className="landing-returnRow">
            <Link to="/" className="landing-returnHome" aria-label="Return to home">
              Return Home
            </Link>
          </div>

          <header className="landing-sectionHeader">
            <h1 id="reliquary-title" className="landing-h2">
              Reliquary
            </h1>
            <p className="landing-lede">
              A reserved space for artifacts: maps, sigils, handouts, and downloadable resources.
            </p>
          </header>

          <div className="landing-panel">
            <p className="landing-copy">
              Placeholder content. This page is intentionally minimal; expand it later with a grid of
              artifact cards (images + captions) without changing the overall layout.
            </p>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};

export default ReliquaryPage;

