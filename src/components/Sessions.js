import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { sessionsData } from '../data';
import { TomePageHeader, TomeDivider, TomeScaffold, TomeSection } from './common/TomePrimitives';
import MarkdownReader from './MarkdownReader';

// --- YOUR CODE STARTS HERE ---
const SessionCard = ({ id, title }) => (
  <Link to={`/chronicles/${id}`} className="tome-card group w-full text-left focus:outline-none">
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="font-title text-[11px] tracking-[0.22em] uppercase text-stone-500 group-hover:text-stone-400">
          Session {id}
        </div>
        <div className="mt-1 font-serif-text text-stone-200 truncate">
          {title}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="tome-navlink inline-flex items-center gap-1">
          Read Log <ChevronRight size={14} />
        </span>
      </div>
    </div>

    <p className="mt-3 text-sm text-stone-500 font-body leading-relaxed">
      Campaign session log
    </p>
  </Link>
);

SessionCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

const Sessions = () => {
  const { sessionId } = useParams();

  const activeSessions = sessionsData ?? [];

  const selectedIndex = useMemo(() => {
    if (!sessionId) return -1;
    const id = Number(String(sessionId).trim());
    if (!Number.isFinite(id)) return -1;
    return activeSessions.findIndex((s) => Number(s?.id) === id);
  }, [sessionId, activeSessions]);

  const selectedSession = selectedIndex >= 0 ? activeSessions[selectedIndex] : null;
  const prevId = selectedIndex > 0 ? activeSessions[selectedIndex - 1]?.id : null;
  const nextId = selectedIndex + 1 < activeSessions.length ? activeSessions[selectedIndex + 1]?.id : null;

  if (sessionId && !selectedSession) {
    return <Navigate to="/chronicles" replace />;
  }

  return (
    <TomeScaffold padY={selectedSession ? 'pt-28 pb-24' : 'pt-24 pb-24'}>
      {selectedSession ? (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <header className="relative w-full px-6 sm:px-10 lg:px-16">
            <div className="max-w-4xl mx-auto border-b border-stone-900/70 pb-10">
              <div className="flex items-center justify-between gap-6">
                <Link to="/chronicles" className="tome-navlink">
                  ← Back to Chronicles
                </Link>
                <div className="font-title text-[11px] tracking-[0.28em] uppercase text-stone-600">Reading</div>
              </div>

              <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
                <div className="font-title text-xs tracking-[0.28em] uppercase text-stone-500">
                  Session {selectedSession.id}
                </div>
                <span className="tome-pill tome-pill--muted">Chronicle</span>
              </div>

              <h1 className="mt-6 font-title text-4xl md:text-5xl text-stone-100 tracking-wide">
                {selectedSession.title}
              </h1>
            </div>
          </header>

          <TomeSection>
            <div className="max-w-4xl mx-auto mt-12 font-serif-text">
              <MarkdownReader
                path={selectedSession.path}
                enableLoreTooltips
                stripFirstHeading
              />

              <TomeDivider />

              <nav aria-label="Session navigation" className="flex items-center justify-between gap-4">
                {prevId ? (
                  <Link to={`/chronicles/${prevId}`} className="tome-navlink">
                    ← Previous
                  </Link>
                ) : (
                  <span className="text-stone-800 font-title text-xs tracking-[0.28em] uppercase">
                    ← Previous
                  </span>
                )}

                {nextId ? (
                  <Link to={`/chronicles/${nextId}`} className="tome-navlink">
                    Next →
                  </Link>
                ) : (
                  <span className="text-stone-800 font-title text-xs tracking-[0.28em] uppercase">
                    Next →
                  </span>
                )}
              </nav>
            </div>
          </TomeSection>
        </div>
      ) : (
        <>
          <TomePageHeader
            sectionLabel="Chronicles"
            title="Chronicles"
            description="Campaign logs and session reports."
          />

          <TomeSection>
            <div className="max-w-7xl mx-auto mt-12 animate-[fadeIn_0.5s_ease-out]">
              <ol className="grid gap-3 max-w-4xl">
                {activeSessions.map((s) => (
                  <li key={s.id}>
                    <SessionCard {...s} />
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
