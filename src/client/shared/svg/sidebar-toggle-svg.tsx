import type { SVGProps } from 'react';

export function SidebarToggleSvg({
  width = 28,
  height = 28,
  viewBox = '0 0 28 28',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#sidebarToggleClip)">
        <path
          d="M22.4 0H5.6C2.50721 0 0 2.50721 0 5.6V22.4C0 25.4928 2.50721 28 5.6 28H22.4C25.4928 28 28 25.4928 28 22.4V5.6C28 2.50721 25.4928 0 22.4 0Z"
          fill="white"
        />
        <path
          d="M18.9 10.5V8.40001C18.9 8.01368 18.5863 7.70001 18.2 7.70001H9.1C8.32734 7.70001 7.7 8.32735 7.7 9.10001C7.7 9.87267 8.32734 10.5 9.1 10.5H19.6C19.9863 10.5 20.3 10.8137 20.3 11.2V14M20.3 14H18.2C17.4273 14 16.8 14.6274 16.8 15.4C16.8 16.1727 17.4273 16.8 18.2 16.8H20.3C20.6863 16.8 21 16.4863 21 16.1V14.7C21 14.3137 20.6863 14 20.3 14Z"
          stroke="#3080FF"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.7 9.09998V18.9C7.7 19.6726 8.32734 20.3 9.1 20.3H19.6C19.9863 20.3 20.3 19.9863 20.3 19.6V16.8"
          stroke="#3080FF"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="sidebarToggleClip">
          <rect
            width="28"
            height="28"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
