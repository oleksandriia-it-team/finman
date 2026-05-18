import type { SVGProps } from 'react';

export function MaySvg({ width = 200, height = 200, viewBox = '0 0 200 200', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
      {...props}
    >
      <defs>
        <clipPath id="my">
          <rect
            width={width}
            height={height}
            rx="20"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#my)">
        <rect
          width={width}
          height={height}
          fill="#6ab8e8"
        />
        <rect
          width={width}
          height="110"
          fill="#7ac4f0"
        />
        <circle
          cx="155"
          cy="40"
          r="20"
          fill="#fff080"
        />
        <circle
          cx="155"
          cy="40"
          r="14"
          fill="#ffe040"
        />
        <g
          stroke="#ffc820"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line
            x1="155"
            y1="12"
            x2="155"
            y2="6"
          />
          <line
            x1="155"
            y1="74"
            x2="155"
            y2="68"
          />
          <line
            x1="127"
            y1="40"
            x2="121"
            y2="40"
          />
          <line
            x1="189"
            y1="40"
            x2="183"
            y2="40"
          />
          <line
            x1="135"
            y1="20"
            x2="131"
            y2="16"
          />
          <line
            x1="175"
            y1="20"
            x2="179"
            y2="16"
          />
          <line
            x1="135"
            y1="60"
            x2="131"
            y2="64"
          />
          <line
            x1="175"
            y1="60"
            x2="179"
            y2="64"
          />
        </g>
        <ellipse
          cx="40"
          cy="35"
          rx="22"
          ry="11"
          fill="#ffffff"
        />
        <ellipse
          cx="22"
          cy="38"
          rx="14"
          ry="10"
          fill="#ffffff"
        />
        <ellipse
          cx="55"
          cy="40"
          rx="16"
          ry="9"
          fill="#ffffff"
        />
        <ellipse
          cx="90"
          cy="55"
          rx="18"
          ry="9"
          fill="#ffffff"
          opacity=".9"
        />
        <path
          d="M0 110 Q50 100 100 108 T200 112 V200 H0 Z"
          fill="#5ac030"
        />
        <path
          d="M0 130 Q40 125 80 130 T200 132 V200 H0 Z"
          fill="#48a828"
        />
        <g
          stroke="#2d6818"
          strokeWidth="1"
          fill="none"
        >
          <path d="M10 115 Q11 108 12 115" />
          <path d="M20 117 Q21 110 22 117" />
          <path d="M35 116 Q36 109 37 116" />
          <path d="M50 118 Q51 111 52 118" />
          <path d="M70 116 Q71 109 72 116" />
          <path d="M85 118 Q86 111 87 118" />
          <path d="M105 116 Q106 109 107 116" />
          <path d="M125 118 Q126 111 127 118" />
          <path d="M145 116 Q146 109 147 116" />
          <path d="M165 118 Q166 111 167 118" />
          <path d="M185 116 Q186 109 187 116" />
        </g>
        <g transform="translate(35 145)">
          <path
            d="M0 0 L0 25"
            stroke="#3a7818"
            strokeWidth="2"
          />
          <path
            d="M-3 14 Q-8 17 -2 20"
            stroke="#3a7818"
            strokeWidth="1.3"
            fill="none"
          />
          <circle
            cx="0"
            cy="-3"
            r="6"
            fill="#ffe040"
          />
          <g
            stroke="#ffc820"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <line
              x1="0"
              y1="-12"
              x2="0"
              y2="-9"
            />
            <line
              x1="-6"
              y1="-9"
              x2="-9"
              y2="-6"
            />
            <line
              x1="6"
              y1="-9"
              x2="9"
              y2="-6"
            />
            <line
              x1="-9"
              y1="-3"
              x2="-6"
              y2="-3"
            />
            <line
              x1="6"
              y1="-3"
              x2="9"
              y2="-3"
            />
          </g>
          <circle
            cx="0"
            cy="-3"
            r="3"
            fill="#ffd020"
          />
        </g>
        <g transform="translate(75 155)">
          <path
            d="M0 0 L0 22"
            stroke="#3a7818"
            strokeWidth="2"
          />
          <path
            d="M0 -3 Q-4 -8 -2 -12 Q0 -10 2 -12 Q4 -8 0 -3 Z"
            fill="#e84050"
          />
          <path
            d="M0 -3 Q-4 -6 -1 -10 Q0 -8 1 -10 Q4 -6 0 -3 Z"
            fill="#f06070"
            opacity=".7"
          />
        </g>
        <g transform="translate(115 150)">
          <path
            d="M0 0 L0 25"
            stroke="#3a7818"
            strokeWidth="2"
          />
          <path
            d="M0 -2 Q-5 -8 -3 -13 Q0 -11 3 -13 Q5 -8 0 -2 Z"
            fill="#f060a0"
          />
          <path
            d="M0 -2 Q-4 -6 -2 -10 Q0 -8 2 -10 Q4 -6 0 -2 Z"
            fill="#f490c0"
            opacity=".7"
          />
        </g>
        <g transform="translate(150 158)">
          <path
            d="M0 0 L0 20"
            stroke="#3a7818"
            strokeWidth="2"
          />
          <circle
            cx="0"
            cy="-3"
            r="5"
            fill="#ffe040"
          />
          <g
            stroke="#ffc820"
            strokeWidth="0.8"
            strokeLinecap="round"
          >
            <line
              x1="0"
              y1="-10"
              x2="0"
              y2="-8"
            />
            <line
              x1="-5"
              y1="-7"
              x2="-7"
              y2="-5"
            />
            <line
              x1="5"
              y1="-7"
              x2="7"
              y2="-5"
            />
          </g>
        </g>
        <g transform="translate(175 165)">
          <path
            d="M0 0 L0 17"
            stroke="#3a7818"
            strokeWidth="1.8"
          />
          <path
            d="M0 -1 Q-3 -5 -2 -9 Q0 -7 2 -9 Q3 -5 0 -1 Z"
            fill="#e84050"
          />
        </g>
        <g transform="translate(15 165)">
          <path
            d="M0 0 L0 17"
            stroke="#3a7818"
            strokeWidth="1.8"
          />
          <circle
            cx="0"
            cy="-3"
            r="4"
            fill="#ffe040"
          />
        </g>
        <path
          d="M55 100 Q60 95 50 92 Q55 97 50 100 Q53 98 55 100"
          fill="#f08030"
          opacity=".9"
        />
        <path
          d="M55 100 Q60 105 50 108 Q55 103 50 100"
          fill="#f08030"
          opacity=".7"
        />
        <circle
          cx="53"
          cy="100"
          r="1.5"
          fill="#2d2020"
        />
        <path
          d="M130 80 Q135 76 128 73 Q132 78 128 80 Q131 78 130 80"
          fill="#f4b840"
          opacity=".9"
        />
        <path
          d="M130 80 Q135 84 128 87 Q132 82 128 80"
          fill="#f4b840"
          opacity=".7"
        />
      </g>
    </svg>
  );
}
