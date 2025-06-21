import Image from 'next/image';
import * as React from 'react';
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <Image
      src="/Logo.jpg"
      alt="iControlBell Logo"
      fill
      style={{ objectFit: 'contain' }}
      priority
    />
  </div>
);

export default Logo;
