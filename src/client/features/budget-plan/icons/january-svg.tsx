import type { SVGProps } from 'react';

export function JanuarySvg({ width = 200, height = 200, viewBox = '0 0 200 200', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...props}
    >
      <defs>
        <clipPath id="ja">
          <rect
            width={width}
            height={height}
            rx="20"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#ja)">
        <rect
          width={width}
          height={height}
          fill="#1e2a44"
        />
        <circle
          cx="40"
          cy="20"
          r="1"
          fill="#fff"
          opacity=".8"
        />
        <circle
          cx="80"
          cy="15"
          r="0.8"
          fill="#fff"
          opacity=".6"
        />
        <circle
          cx="120"
          cy="22"
          r="1.2"
          fill="#fff"
          opacity=".9"
        />
        <circle
          cx="170"
          cy="18"
          r="1"
          fill="#fff"
          opacity=".7"
        />
        <circle
          cx="60"
          cy="40"
          r="0.7"
          fill="#fff"
          opacity=".5"
        />
        <circle
          cx="155"
          cy="45"
          r="1"
          fill="#fff"
          opacity=".7"
        />
        <circle
          cx="100"
          cy="35"
          r="0.6"
          fill="#fff"
          opacity=".5"
        />
        <circle
          cx="160"
          cy="35"
          r="14"
          fill="#e8eef8"
        />
        <circle
          cx="165"
          cy="32"
          r="12"
          fill="#1e2a44"
        />
        <path
          d="M0 150 Q50 140 100 148 T200 152 V200 H0 Z"
          fill="#e8f0fa"
        />
        <path
          d="M0 165 Q60 158 120 162 T200 168 V200 H0 Z"
          fill="#f4f8fc"
        />
        <g transform="translate(45 80)">
          <polygon
            points="0,80 -22,80 -16,55 -20,55 -13,35 -17,35 -10,18 -4,3 0,3"
            fill="#2d4a35"
          />
          <polygon
            points="0,80 22,80 16,55 20,55 13,35 17,35 10,18 4,3 0,3"
            fill="#3a5b42"
          />
          <path
            d="M-22 80 Q-18 75 -10 78 Q-2 72 6 76 Q14 70 22 78 L22 80 Z"
            fill="#fff"
          />
          <path
            d="M-20 55 Q-14 50 -8 53 Q0 48 8 52 Q14 48 20 55 L20 57 L-20 57 Z"
            fill="#fff"
            opacity=".95"
          />
          <path
            d="M-17 35 Q-10 30 -3 33 Q4 28 11 32 Q14 30 17 35 Z"
            fill="#fff"
            opacity=".9"
          />
          <path
            d="M-10 18 Q-3 14 4 17 Q7 15 10 18 Z"
            fill="#fff"
            opacity=".85"
          />
          <path
            d="M-4 3 L4 3 L0 -2 Z"
            fill="#fff"
          />
        </g>
        <g transform="translate(150 100)">
          <polygon
            points="0,60 -16,60 -12,42 -14,42 -9,28 -12,28 -7,15 -3,3 0,3"
            fill="#2d4a35"
          />
          <polygon
            points="0,60 16,60 12,42 14,42 9,28 12,28 7,15 3,3 0,3"
            fill="#3a5b42"
          />
          <path
            d="M-16 60 Q-10 56 -4 58 Q3 54 10 58 Q14 55 16 60 Z"
            fill="#fff"
          />
          <path
            d="M-14 42 Q-8 38 -2 40 Q4 36 10 40 Q12 39 14 42 Z"
            fill="#fff"
            opacity=".95"
          />
          <path
            d="M-12 28 Q-6 25 0 27 Q5 24 12 28 Z"
            fill="#fff"
            opacity=".9"
          />
          <path
            d="M-7 15 Q-2 12 3 14 Q5 13 7 15 Z"
            fill="#fff"
            opacity=".85"
          />
        </g>
        <g transform="translate(105 120)">
          <polygon
            points="0,50 -13,50 -10,35 -11,35 -7,23 -9,23 -5,12 -2,3 0,3"
            fill="#2d4a35"
          />
          <polygon
            points="0,50 13,50 10,35 11,35 7,23 9,23 5,12 2,3 0,3"
            fill="#3a5b42"
          />
          <path
            d="M-13 50 Q-8 47 -3 49 Q3 46 8 49 Q11 47 13 50 Z"
            fill="#fff"
          />
          <path
            d="M-11 35 Q-6 32 -1 34 Q4 32 11 35 Z"
            fill="#fff"
            opacity=".95"
          />
          <path
            d="M-9 23 Q-4 20 1 22 Q5 20 9 23 Z"
            fill="#fff"
            opacity=".9"
          />
        </g>
        <g fill="#fff">
          <circle
            cx="30"
            cy="50"
            r="2"
          />
          <circle
            cx="70"
            cy="65"
            r="1.5"
          />
          <circle
            cx="110"
            cy="80"
            r="2"
          />
          <circle
            cx="50"
            cy="95"
            r="1.8"
          />
          <circle
            cx="180"
            cy="85"
            r="2"
          />
          <circle
            cx="20"
            cy="110"
            r="1.5"
          />
          <circle
            cx="90"
            cy="105"
            r="2.2"
          />
          <circle
            cx="135"
            cy="95"
            r="1.5"
          />
          <circle
            cx="175"
            cy="120"
            r="2"
          />
          <circle
            cx="65"
            cy="125"
            r="1.5"
          />
          <circle
            cx="120"
            cy="130"
            r="2"
          />
        </g>
      </g>
    </svg>
  );
}
