import React from 'react';
import { Skull } from 'lucide-react';

const Divider = () => (
  <div className="flex items-center justify-center py-8 opacity-50">
    <div className="h-px bg-gradient-to-r from-transparent via-orange-900 to-transparent w-full max-w-xs"></div>
    <div className="mx-4 text-orange-800">
      <Skull size={12} />
    </div>
    <div className="h-px bg-gradient-to-r from-transparent via-orange-900 to-transparent w-full max-w-xs"></div>
  </div>
);

export default Divider;