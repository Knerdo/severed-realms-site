import React from 'react';
import { Link } from 'react-router-dom';
import MarketingShell from './MarketingShell';

const SagasPage = () => {
  return (
    <MarketingShell title="The Sagas">
      <section className="landing-section" aria-labelledby="sagas-title">
        <div className="landing-shell">
          <div className="landing-returnRow">
            <Link to="/" className="landing-returnHome" aria-label="Return to home">
              Return Home
            </Link>
          </div>

          <header className="landing-sectionHeader">
            <h1 id="sagas-title" className="landing-h2">
              The Sagas
            </h1>
            <p className="landing-lede">
              Campaign spotlights. Add another campaign later by duplicating a single
              <code className="landing-code">.saga-card</code> block.
            </p>
          </header>

          <div className="sagas-grid" role="list">
            {/* Campaign Card (copy/paste this single block to add another campaign) */}
            <article className="saga-card" role="listitem" aria-labelledby="saga-falseblood">
              <div className="saga-cardBody">
                <h2 id="saga-falseblood" className="saga-title">
                  A Dirge to the Falseblood
                </h2>
                <p className="saga-copy">
                  Campaign blurb placeholder: a short, neutral summary will live here. Replace with
                  your official synopsis when available.
                </p>
              </div>

              <div className="saga-cardActions">
                <Link to="/overview" className="cta-blood">
                  Join the Campaign
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};

export default SagasPage;

