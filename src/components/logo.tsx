import * as React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <div className={className}>
    <svg
      role="img"
      aria-label="iControlBell Logo"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g>
        {/* Bell Cloche */}
        <path d="M14 44 C 14 33 22 24 32 24 S 50 33 50 44" />
        <rect x="12" y="44" width="40" height="5" rx="2" />
        <path d="M32 20 a3 3 0 0 1 0 -6 a3 3 0 0 1 0 6" />
        
        {/* Phone Receiver */}
        {/* Cord */}
        <path d="M43 51 A 16 16 0 0 1 20 42" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        {/* Mouthpiece */}
        <path transform="translate(5, 5)" d="M42 42 C 52 42 52 56 42 56 L 38 56 L 38 42 Z" />
        {/* Earpiece */}
        <path transform="translate(-4, -4)" d="M22 28 C 12 28 12 42 22 42 L 26 42 L 26 28 Z" />
      </g>
    </svg>
  </div>
);

export default Logo;
