import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { SessionData } from '../data';
import { TomePageHeader, TomeDivider, TomeScaffold, TomeSection } from './common/TomePrimitives';

// --- YOUR CODE STARTS HERE ---
const SessionCard = ({ num, title, date, summary, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="tome-card group w-full text-left focus:outline-none"
  >
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="font-title text-[11px] tracking-[0.22em] uppercase text-stone-500 group-hover:text-stone-400">
          Session {num}
        </div>
        <div className="mt-1 font-serif-text text-stone-200 truncate">
          {title}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-[10px] font-body text-stone-600">{date}</span>
        <span className="tome-navlink inline-flex items-center gap-1">
          Read Log <ChevronRight size={14} />
        </span>
      </div>
    </div>

    <p className="mt-3 text-sm text-stone-400 font-body leading-relaxed line-clamp-3">
      {summary}
    </p>
  </button>
);

SessionCard.propTypes = {
 num: PropTypes.number.isRequired,
 title: PropTypes.string.isRequired,
 date: PropTypes.string.isRequired,
 summary: PropTypes.string.isRequired,
 onClick: PropTypes.func.isRequired,
};

const SessionDetail = ({ session, onBack }) => (
  <div className="animate-[fadeIn_0.5s_ease-out]">
    <header className="relative w-full px-6 sm:px-10 lg:px-16">
      <div className="max-w-4xl mx-auto border-b border-stone-900/70 pb-10">
        <div className="flex items-center justify-between gap-6">
          <button
            type="button"
            onClick={onBack}
            className="tome-navlink group inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Chronicles
          </button>
          <div className="font-title text-[11px] tracking-[0.28em] uppercase text-stone-600">
            {session.date}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
          <div className="font-title text-xs tracking-[0.28em] uppercase text-stone-500">
            Session {session.num}
          </div>
          <span className="tome-pill tome-pill--muted">Chronicle</span>
        </div>

        <h1 className="mt-6 font-title text-4xl md:text-5xl text-stone-100 tracking-wide">
          {session.title}
        </h1>
      </div>
    </header>

    <TomeSection>
      <div className="max-w-4xl mx-auto mt-12 tome-content">
        {session.content}

        <TomeDivider />

        <div className="text-center">
          <span className="font-title text-stone-600 text-xs tracking-[0.3em] uppercase">
            End of Session Log
          </span>
        </div>
      </div>
    </TomeSection>
  </div>
);

SessionDetail.propTypes = {
 session: PropTypes.object.isRequired,
 onBack: PropTypes.func.isRequired,
};

const Sessions = () => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Filter existing data to only show the two requested sessions
  const activeSessions = SessionData;
  const selectedSession = activeSessions.find(
    (s) => s.id === selectedSessionId
  );

  return (
    <TomeScaffold padY={selectedSession ? 'pt-28 pb-24' : 'pt-24 pb-24'}>
      {selectedSession ? (
        <SessionDetail session={selectedSession} onBack={() => setSelectedSessionId(null)} />
      ) : (
        <>
          <TomePageHeader
            sectionLabel="Chronicles"
            title="Chronicles"
            description="Campaign logs and session reports—direct links are stable for sharing and bookmarking."
          />

          <TomeSection>
            <div className="max-w-7xl mx-auto mt-12 animate-[fadeIn_0.5s_ease-out]">
              <ol className="grid gap-3 max-w-4xl">
                {activeSessions.map((s) => (
                  <li key={s.id}>
                    <SessionCard {...s} onClick={() => setSelectedSessionId(s.id)} />
                  </li>
                ))}
              </ol>
            </div>
          </TomeSection>
        </>
      )}
    </TomeScaffold>
  );
};

// --- EXPORT AT THE BOTTOM ---
export default Sessions;
