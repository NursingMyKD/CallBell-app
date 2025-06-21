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
        {/* Bell Shape */}
        <path d="M14 52 C 14 38, 50 38, 50 52" />
        <rect x="12" y="52" width="40" height="5" rx="2" />
        
        {/* Phone Receiver on top */}
        <g transform="translate(0, -5)">
            <path d="M22 34 C 22 24, 42 24, 42 34" stroke="currentColor" strokeWidth="8" fill="none" />
            <circle cx="22" cy="34" r="8" />
            <circle cx="42" cy="34" r="8" />
        </g>
    </svg>
  </div>
);

export default Logo;
