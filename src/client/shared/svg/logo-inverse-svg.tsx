import type { SVGProps } from 'react';

export function LogoInverseSvg({ width = 40, height = 40, viewBox = '0 0 40 40', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M27 15V12C27 11.4 26.6 11 26 11H13C11.9 11 11 11.9 11 13C11 14.1 11.9 15 13 15H28C28.6 15 29 15.4 29 16V20H26C24.9 20 24 20.9 24 22C24 23.1 24.9 24 26 24H29C29.6 24 30 23.6 30 23V21C30 20.4 29.6 20 29 20"
        stroke="var(--primary)"
        strokeWidth="2"
      />
      <path
        d="M11 13V27C11 28.1 11.9 29 13 29H28C28.6 29 29 28.6 29 28V24"
        stroke="var(--primary)"
        strokeWidth="2"
      />
    </svg>
  );
}
