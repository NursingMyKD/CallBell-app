import Image from 'next/image';
import * as React from 'react';
import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("relative", className)}>
    <Image
      src="/logo.png"
      alt="iControlBell Logo"
      fill
      style={{ objectFit: 'contain' }}
      priority
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
);

export default Logo;
