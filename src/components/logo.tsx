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
      {/* 
        This is a new, detailed SVG logo created to match the provided image.
        It consists of a service bell, a phone receiver, and a cord.
      */}
      <g>
        {/* Phone receiver handle and bell base */}
        <path d="M11.6,41.4c-3.1-3.2-5.1-7.5-5-12c0.1-4,1.8-7.7,4.6-10.4c0.5-0.5,1.4-0.4,1.8,0.2c0.4,0.5,0.4,1.4-0.2,1.8
	c-2.4,2.3-3.8,5.4-3.9,8.8c-0.1,4,1.7,7.8,4.5,10.6c0.5,0.5,0.5,1.3,0,1.8C12.5,42.1,12,41.9,11.6,41.4z"/>
        <path d="M52.4,41.4c-0.5-0.5-0.5-1.3,0-1.8c2.8-2.8,4.6-6.6,4.5-10.6c-0.1-3.4-1.5-6.5-3.9-8.8c-0.5-0.4-0.7-1.3-0.2-1.8
	c0.4-0.5,1.3-0.7,1.8-0.2c2.8,2.7,4.5,6.4,4.6,10.4c0.1,4.5-1.9,8.8-5,12C53.7,41.9,52.9,42.1,52.4,41.4z"/>
        <path d="M49.6,39.8H14.4c-1,0-1.8-0.8-1.8-1.8v-2.1c0-1,0.8-1.8,1.8-1.8h35.2c1,0,1.8,0.8,1.8,1.8v2.1
	C51.4,39,50.6,39.8,49.6,39.8z"/>
        <path d="M45,34.1H19c-1,0-1.8-0.8-1.8-1.8v-1c0-1,0.8-1.8,1.8-1.8h26.1c1,0,1.8,0.8,1.8,1.8v1C46.8,33.3,46,34.1,45,34.1z"
	/>
        {/* Bell Dome */}
        <path d="M44.4,29.5c-0.2-2.8-0.8-5.5-1.9-8.1c-1.3-3-3.3-5.5-6-7.3C35,13,33.5,12.5,32,12.5s-3,0.5-4.5,1.6
	c-2.7,1.8-4.7,4.3-6,7.3c-1.1,2.6-1.7,5.3-1.9,8.1H44.4z"/>
        {/* Bell Finial */}
        <path d="M32,12.9c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S33.1,12.9,32,12.9z"/>
        {/* Cord */}
        <path d="M42.4,47.4c-2.8,4.8-9.4,6.4-14.2,3.6s-6.4-9.4-3.6-14.2" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeMiterlimit="10" />
      </g>
    </svg>
  </div>
);

export default Logo;
