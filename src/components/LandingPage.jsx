import React from 'react';
import MarketingShell from './MarketingShell';

const LandingPage = () => {
  return (
    <MarketingShell title="Severed Realms">
        <section aria-labelledby="sr-landing-title" className="landing-hero">
          <div className="landing-shell">
            <h1 id="sr-landing-title" className="sr-only">
              Severed Realms
            </h1>

            <div className="landing-heroInner">
              <div className="landing-logoWrap">
                <img
                  src="/logo-main.png"
                  alt="Severed Realms logo"
                  className="landing-logo"
                  loading="eager"
                  decoding="async"
                />
              </div>

              <p className="landing-tagline landing-tagline--cinematic">Enter Terevas, scribe your history with blood</p>
            </div>
          </div>
        </section>
    </MarketingShell>
  );
};

export default LandingPage;

