import type { SVGProps } from 'react';

export function SidebarCurrenciesSvg({
  width = 14,
  height = 14,
  viewBox = '0 0 14 14',
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
      <path
        d="M11.0833 3.21939C10.2186 2.4848 9.09854 2.04163 7.875 2.04163C5.13659 2.04163 2.91667 4.26155 2.91667 6.99996C2.91667 9.73836 5.13659 11.9583 7.875 11.9583C9.09854 11.9583 10.2186 11.5151 11.0833 10.7805M1.75 8.16663H7.58333M1.75 5.83329H7.58333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
