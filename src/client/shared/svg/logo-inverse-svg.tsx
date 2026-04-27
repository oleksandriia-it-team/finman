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
      <rect
        width="40"
        height="40"
        rx="8"
        fill="var(--background)"
      />
      <path
        d="M27 15V12C27 11.4481 26.5519 11 26 11H13C11.8962 11 11 11.8962 11 13C11 14.1038 11.8962 15 13 15H28C28.5519 15 29 15.4481 29 16V20H26C24.8962 20 24 20.8962 24 22C24 23.1038 24.8962 24 26 24H29C29.5519 24 30 23.5519 30 23V21C30 20.4481 29.5519 20 29 20"
        stroke="var(--primary) !important"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 13V27C11 28.1038 11.8962 29 13 29H28C28.5519 29 29 28.5519 29 28V24"
        stroke="var(--primary) !important"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
