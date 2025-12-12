import React from 'react';

const LoreEntry = ({ data, category }) => {
  // Check if this is a bestiary entry
  const isBestiary = category === 'bestiary';

  return (
    <div className={`animate-[fadeIn_0.5s_ease-out] tome-content ${isBestiary ? 'max-w-6xl' : 'max-w-4xl'} mx-auto`}>
      {data.content}
    </div>
  );
};

export default LoreEntry;
