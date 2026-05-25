import type { SVGProps } from 'react';

export function FebruarySvg({ width = 200, height = 200, viewBox = '0 0 200 200', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="fb">
          <rect
            width="200"
            height="200"
            rx="20"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#fb)">
        <rect
          width="200"
          height="80"
          fill="#f5d5c8"
        />
        <rect
          y="80"
          width="200"
          height="120"
          fill="#dce8f5"
        />
        <ellipse
          cx="100"
          cy="80"
          rx="120"
          ry="20"
          fill="#f0bca0"
          opacity=".5"
        />
        <circle
          cx="100"
          cy="55"
          r="22"
          fill="#fff2e0"
        />
        <circle
          cx="100"
          cy="55"
          r="16"
          fill="#ffe0c8"
        />
        <path
          d="M0 90 Q60 85 120 88 T200 92 V200 H0 Z"
          fill="#e8eef5"
        />
        <path
          d="M0 100 L200 100 L200 130 L0 130 Z"
          fill="#b8d4ee"
        />
        <path
          d="M0 100 Q40 98 80 100 T160 100 T200 100 L200 130 Q160 132 120 130 T40 130 T0 130 Z"
          fill="#cae0f0"
        />
        <g
          stroke="#7a9fc8"
          strokeWidth="0.5"
          fill="none"
          opacity=".5"
        >
          <path d="M20 110 Q40 108 60 112 T100 110" />
          <path d="M110 115 Q130 113 150 116 T185 114" />
          <path d="M30 122 Q50 120 70 123" />
          <path d="M130 105 Q150 103 170 106" />
        </g>
        <path
          d="M0 130 Q30 125 60 128 T120 132 T200 130 V200 H0 Z"
          fill="#ffffff"
        />
        <path
          d="M0 145 Q40 140 80 144 T160 148 T200 146 V200 H0 Z"
          fill="#f0f6fc"
        />
        <g transform="translate(35 100)">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-50"
            stroke="#5a4030"
            strokeWidth="3"
          />
          <line
            x1="0"
            y1="-15"
            x2="-15"
            y2="-28"
            stroke="#5a4030"
            strokeWidth="1.5"
          />
          <line
            x1="0"
            y1="-20"
            x2="14"
            y2="-30"
            stroke="#5a4030"
            strokeWidth="1.5"
          />
          <line
            x1="0"
            y1="-30"
            x2="-10"
            y2="-42"
            stroke="#5a4030"
            strokeWidth="1.2"
          />
          <line
            x1="0"
            y1="-35"
            x2="10"
            y2="-45"
            stroke="#5a4030"
            strokeWidth="1.2"
          />
          <line
            x1="-15"
            y1="-28"
            x2="-20"
            y2="-35"
            stroke="#5a4030"
            strokeWidth="0.8"
          />
          <line
            x1="14"
            y1="-30"
            x2="20"
            y2="-37"
            stroke="#5a4030"
            strokeWidth="0.8"
          />
          <g
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity=".85"
          >
            <path d="M0 -1 L0 -50" />
            <path d="M-1 -15 L-15 -28" />
            <path d="M1 -20 L14 -30" />
            <path d="M-1 -30 L-10 -42" />
            <path d="M1 -35 L10 -45" />
          </g>
        </g>
        <g transform="translate(170 105)">
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-45"
            stroke="#5a4030"
            strokeWidth="2.5"
          />
          <line
            x1="0"
            y1="-12"
            x2="-12"
            y2="-22"
            stroke="#5a4030"
            strokeWidth="1.3"
          />
          <line
            x1="0"
            y1="-18"
            x2="11"
            y2="-26"
            stroke="#5a4030"
            strokeWidth="1.3"
          />
          <line
            x1="0"
            y1="-28"
            x2="-8"
            y2="-37"
            stroke="#5a4030"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="-32"
            x2="8"
            y2="-40"
            stroke="#5a4030"
            strokeWidth="1"
          />
          <g
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            opacity=".85"
          >
            <path d="M0 -1 L0 -45" />
            <path d="M-1 -12 L-12 -22" />
            <path d="M1 -18 L11 -26" />
            <path d="M-1 -28 L-8 -37" />
          </g>
        </g>
        <g
          stroke="#fff"
          strokeWidth="0.8"
          opacity=".9"
          strokeLinecap="round"
        >
          <line
            x1="60"
            y1="115"
            x2="60"
            y2="108"
          />
          <line
            x1="56"
            y1="111"
            x2="64"
            y2="111"
          />
          <line
            x1="120"
            y1="120"
            x2="120"
            y2="113"
          />
          <line
            x1="116"
            y1="116"
            x2="124"
            y2="116"
          />
          <line
            x1="90"
            y1="125"
            x2="90"
            y2="120"
          />
          <line
            x1="86"
            y1="122"
            x2="94"
            y2="122"
          />
          <line
            x1="150"
            y1="112"
            x2="150"
            y2="107"
          />
          <line
            x1="146"
            y1="109"
            x2="154"
            y2="109"
          />
        </g>
      </g>
    </svg>
  );
}
