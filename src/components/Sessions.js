import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import SessionData from '../data/sessionData'; // This connects to the data file we made earlier

// --- HELPER COMPONENT (Needed because SessionDetail uses it) ---
const Divider = () => <div className="h-px bg-orange-900/30 my-8" />;

// --- YOUR CODE STARTS HERE ---
const SessionCard = ({ num, title, date, summary, onClick }) => (
  <div
    onClick={onClick}
    className="flex flex-col md:flex-row gap-8 items-start group cursor-pointer"
  >
    {/* Date Column */}
    <div className="md:w-32 flex-shrink-0 pt-2">
      <span className="block font-title text-orange-700 text-xl font-bold">
        Session {num}
      </span>
      <span className="block font-body text-xs text-stone-600 mt-1 uppercase tracking-wide">
        {date}
      </span>
    </div>

    {/* Content Column */}
    <div className="flex-grow glass-panel p-6 md:p-8 hover:bg-stone-900/80 transition-colors border-l-4 border-l-orange-900 group-hover:border-l-orange-600 group-hover:shadow-[0_0_20px_rgba(194,65,12,0.1)]">
      <h3 className="text-2xl font-title text-stone-200 mb-3 group-hover:text-orange-500 transition-colors">
        {title}
      </h3>
      <p className="text-stone-400 font-body leading-relaxed mb-6">{summary}</p>
      <button className="flex items-center gap-2 text-xs font-title tracking-widest text-stone-500 group-hover:text-orange-400 uppercase transition-colors">
        Read Log <ChevronRight size={12} />
      </button>
    </div>
  </div>
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
    <div className="max-w-4xl mx-auto">
      {/* Navigation Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-stone-500 hover:text-orange-500 transition-colors mb-8 font-title tracking-widest text-sm uppercase group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Back to Chronicles
      </button>

      {/* Content Container */}
      <div className="bg-[#0f172a] border border-orange-900/50 shadow-2xl relative p-8 md:p-16">
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 h-1 bg-orange-900 w-full"></div>

        <div className="flex justify-between items-end mb-8 border-b border-stone-800 pb-6">
          <div>
            <span className="font-title text-orange-700 text-lg block mb-2">
              Session {session.num}
            </span>
            <h2 className="font-title text-3xl md:text-5xl text-stone-200">
              {session.title}
            </h2>
          </div>
          <span className="font-body text-stone-500 text-sm hidden md:block">
            {session.date}
          </span>
        </div>

        <div className="prose prose-invert prose-stone max-w-none font-serif-text leading-loose text-lg text-stone-300">
          {session.content}
        </div>

        <Divider />

        <div className="text-center">
          <span className="font-title text-stone-600 text-xs tracking-[0.3em] uppercase">
            End of Session Log
          </span>
        </div>
      </div>
    </div>
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
    <div className="min-h-screen bg-[#0c0a09] pt-32 pb-20 px-4">
      {selectedSession ? (
        <SessionDetail
          session={selectedSession}
          onBack={() => setSelectedSessionId(null)}
        />
      ) : (
        <div className="max-w-4xl mx-auto animate-[fadeIn_0.5s_ease-out]">
          <div className="flex items-end justify-between mb-16 border-b border-stone-800 pb-6">
            <h2 className="text-4xl font-title text-stone-200">Chronicles</h2>
            <span className="font-body text-stone-600 text-sm">
              Campaign Status: <span className="text-orange-700">Active</span>
            </span>
          </div>

          <div className="space-y-8">
            {activeSessions.map((s) => (
              <SessionCard
                key={s.id}
                {...s}
                onClick={() => setSelectedSessionId(s.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- EXPORT AT THE BOTTOM ---
export default Sessions;