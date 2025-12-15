import React from 'react';
import { Link } from 'react-router-dom';
import MarketingShell from './MarketingShell';

const CodexPage = () => {
  return (
    <MarketingShell title="Codex">
      <section className="landing-section" aria-labelledby="codex-title">
        <div className="landing-shell">
          <div className="landing-returnRow">
            <Link to="/" className="landing-returnHome" aria-label="Return to home">
              Return Home
            </Link>
          </div>

          <header className="landing-sectionHeader">
            <h1 id="codex-title" className="landing-h2">
              Codex
            </h1>
            <p className="landing-lede">
              A quick index of what lies within this site. Replace this copy with your real codex
              synopsis when ready.
            </p>
          </header>

          <div className="landing-grid2">
            <div className="landing-panel">
              <h2 className="landing-h3">Where to begin</h2>
              <p className="landing-copy">
                Use the main navigation to move between public pages (Codex, Sagas, Reliquary, The
                Architect), then enter the app routes when you are ready.
              </p>
            </div>

            <div className="landing-panel">
              <h2 className="landing-h3">Quick paths into the app</h2>
              <ul className="landing-list">
                <li>
                  <Link className="landing-inlineLink" to="/grimoire">
                    Grimoire
                  </Link>
                </li>
                <li>
                  <Link className="landing-inlineLink" to="/chronicles">
                    Chronicles
                  </Link>
                </li>
                <li>
                  <Link className="landing-inlineLink" to="/tome">
                    The Tome
                  </Link>
                </li>
                <li>
                  <Link className="landing-inlineLink" to="/overview">
                    Overview
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
};

export default CodexPage;

