import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => (
  <div className={cn(className)}>
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <rect width="100" height="100" fill="white" />
      <g transform="translate(15, 15) scale(0.7)">
        <path
          fill="currentColor"
          d="M80.9,42.1C79.3,28.2,67.8,17,53.5,17S27.7,28.2,26.1,42.1H10v11h5.1c2.1,15.7,15.7,28,31.4,28s29.3-12.3,31.4-28H83V42.1H80.9z M53.5,77.1c-13.5,0-24.8-10-26.7-23h53.4C78.3,67.1,67,77.1,53.5,77.1z M29.1,42.1c1.5-12.2,12-21.6,24.4-21.6s22.9,9.4,24.4,21.6H29.1z"
        />
        <path
          fill="currentColor"
          d="M53.5,88.1c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S56.3,88.1,53.5,88.1z"
        />
      </g>
    </svg>
  </div>
);

export default Logo;