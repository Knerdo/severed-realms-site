import React from 'react';

export const TomeBackground = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 pointer-events-none"
    style={{
      backgroundImage: "url('/title-page.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'saturate(0.92) contrast(1.05)',
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/70 to-[#070606]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(234,88,12,0.12)_0%,transparent_55%)]" />
  </div>
);

export const TomeScaffold = ({
  children,
  className = '',
  padY = 'pt-24 pb-24',
  showBackground = true,
}) => (
  <div className={`min-h-screen bg-[#070606] ${padY} ${className}`.trim()}>
    {showBackground ? <TomeBackground /> : null}
    {children}
  </div>
);

export const TomePageHeader = ({ title, description, sectionLabel }) => (
  <header className="relative w-full px-6 sm:px-10 lg:px-16">
    <div className="max-w-7xl mx-auto">
      <div className="border-b border-stone-900/70 pb-10">
        <div className="flex items-center justify-between gap-6 text-stone-500 font-title text-[11px] tracking-[0.28em] uppercase">
          <span>A Dirge to the Falseblood</span>
          <span className="text-stone-600">{sectionLabel}</span>
        </div>

        <h1 className="mt-10 font-title text-4xl sm:text-5xl md:text-6xl text-stone-100 tracking-wide leading-[0.95]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl font-serif-text text-stone-200/90 leading-relaxed text-[1.05rem] md:text-xl">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  </header>
);

export const TomeSection = ({ children, className = '' }) => (
  <div className={`relative w-full px-6 sm:px-10 lg:px-16 ${className}`.trim()}>
    {children}
  </div>
);

export const TomeDivider = ({ className = '' }) => (
  <div className={`tome-divider ${className}`.trim()} />
);

