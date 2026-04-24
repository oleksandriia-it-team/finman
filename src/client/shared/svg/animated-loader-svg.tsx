import React from 'react';

export default function AnimatedWalletLogo() {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 240 256"
        fill="none"
      >
        <style>{`
          /* Центр всієї композиції: 120px 125px */
          .orbit-outer { transform-origin: 120px 125px; animation: spin 24s linear infinite; }
          .orbit-middle { transform-origin: 120px 125px; animation: spin-reverse 18s linear infinite; }
          .orbit-inner { transform-origin: 120px 125px; animation: spin 12s linear infinite; }

          /* Зворотне обертання, щоб іконки залишалися вертикальними */
          .keep-upright-outer { animation: spin-reverse 24s linear infinite; }
          .keep-upright-middle { animation: spin 18s linear infinite; }
          .keep-upright-inner { animation: spin-reverse 12s linear infinite; }

          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        `}</style>

        <g className="orbit-outer">
          <rect
            x="0.5"
            y="5.5"
            width="239"
            height="239"
            rx="119.5"
            stroke="var(--primary)"
            strokeOpacity="0.25"
            strokeDasharray="3 2"
          />

          <g
            className="keep-upright-outer"
            style={{ transformOrigin: '120px 17px' }}
          >
            <rect
              x="104"
              y="1"
              width="32"
              height="32"
              rx="16"
              fill="var(--primary)"
            />
            <g filter="url(#filter0_dd_670_811)">
              <rect
                x="104"
                y="1"
                width="32"
                height="32"
                rx="16"
                fill="var(--background)"
                fillOpacity="0.01"
                shapeRendering="crispEdges"
              />
            </g>
            <g clipPath="url(#clip0_670_811)">
              <path
                d="M121.163 20.8241C120.61 22.6515 118.843 23.8336 116.943 23.647C115.043 23.4604 113.54 21.9571 113.353 20.0571C113.166 18.1571 114.349 16.3901 116.176 15.8374"
                stroke="var(--background)"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M122 13H122.667V15.6667"
                stroke="var(--background)"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M116.089 18.8455L116.667 18.5122L118 20.8215"
                stroke="var(--background)"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M118.667 14.3335C118.667 16.5412 120.459 18.3335 122.667 18.3335C124.874 18.3335 126.667 16.5412 126.667 14.3335C126.667 12.1258 124.874 10.3335 122.667 10.3335C120.459 10.3335 118.667 12.1258 118.667 14.3335V14.3335"
                stroke="var(--background)"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          <g
            className="keep-upright-outer"
            style={{ transformOrigin: '120px 233px' }}
          >
            <rect
              x="106"
              y="219"
              width="28"
              height="28"
              rx="14"
              fill="var(--background)"
            />
            <g filter="url(#filter1_dd_670_811)">
              <rect
                x="106"
                y="219"
                width="28"
                height="28"
                rx="14"
                fill="var(--background)"
                fillOpacity="0.01"
                shapeRendering="crispEdges"
              />
            </g>
            <path
              d="M120 227.167V238.833"
              stroke="var(--primary)"
              strokeWidth="1.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M122.917 228.917H118.542C117.415 228.917 116.5 229.831 116.5 230.958C116.5 232.085 117.415 233 118.542 233H121.458C122.585 233 123.5 233.915 123.5 235.042C123.5 236.168 122.585 237.083 121.458 237.083H116.5"
              stroke="var(--primary)"
              strokeWidth="1.16667"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          <g
            className="keep-upright-outer"
            style={{ transformOrigin: '36px 203px' }}
          >
            <rect
              x="32"
              y="199"
              width="8"
              height="8"
              rx="4"
              fill="var(--primary)"
              fillOpacity="0.35"
            />
          </g>
          <g
            className="keep-upright-outer"
            style={{ transformOrigin: '201px 208px' }}
          >
            <rect
              x="196"
              y="203"
              width="10"
              height="10"
              rx="5"
              fill="var(--primary)"
              fillOpacity="0.5"
            />
          </g>
        </g>

        <g className="orbit-middle">
          <rect
            x="28.5"
            y="33.5"
            width="183"
            height="183"
            rx="91.5"
            stroke="var(--primary)"
            strokeOpacity="0.18"
            strokeDasharray="3 2"
          />

          <g
            className="keep-upright-middle"
            style={{ transformOrigin: '120px 33px' }}
          >
            <rect
              x="113"
              y="26"
              width="14"
              height="14"
              rx="7"
              fill="var(--primary)"
            />
            <g filter="url(#filter2_dd_670_811)">
              <rect
                x="113"
                y="26"
                width="14"
                height="14"
                rx="7"
                fill="var(--background)"
                fillOpacity="0.01"
                shapeRendering="crispEdges"
              />
            </g>
          </g>
        </g>

        <g className="orbit-inner">
          <rect
            x="56.5"
            y="61.5"
            width="127"
            height="127"
            rx="63.5"
            stroke="var(--primary)"
            strokeOpacity="0.12"
            strokeDasharray="3 2"
          />

          <g
            className="keep-upright-inner"
            style={{ transformOrigin: '167px 62px' }}
          >
            <g clipPath="url(#clip1_670_811)">
              <path
                d="M166.427 56.6413C166.478 56.3652 166.719 56.165 167 56.165C167.281 56.165 167.522 56.3652 167.573 56.6413L168.186 59.8834C168.276 60.3552 168.645 60.7242 169.116 60.8133L172.358 61.4264C172.635 61.4779 172.835 61.7189 172.835 61.9998C172.835 62.2806 172.635 62.5216 172.358 62.5732L169.116 63.1863C168.645 63.2754 168.276 63.6444 168.186 64.1161L167.573 67.3583C167.522 67.6344 167.281 67.8345 167 67.8345C166.719 67.8345 166.478 67.6344 166.427 67.3583L165.813 64.1161C165.724 63.6444 165.355 63.2754 164.884 63.1863L161.641 62.5732C161.365 62.5216 161.165 62.2806 161.165 61.9998C161.165 61.7189 161.365 61.4779 161.641 61.4264L164.884 60.8133C165.355 60.7242 165.724 60.3552 165.813 59.8834L166.427 56.6413"
                stroke="var(--primary)"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M171.667 56.1665V58.4998"
                stroke="var(--primary)"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M172.833 57.3335H170.5"
                stroke="var(--primary)"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M161.167 66.6667C161.167 67.3106 161.689 67.8333 162.333 67.8333C162.977 67.8333 163.5 67.3106 163.5 66.6667C163.5 66.0228 162.977 65.5 162.333 65.5C161.689 65.5 161.167 66.0228 161.167 66.6667V66.6667"
                stroke="var(--primary)"
                strokeWidth="1.16667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>

          <g
            className="keep-upright-inner"
            style={{ transformOrigin: '64px 183px' }}
          >
            <g clipPath="url(#clip2_670_811)">
              <path
                d="M63.5085 178.407C63.5527 178.171 63.7593 177.999 64 177.999C64.2407 177.999 64.4473 178.171 64.4915 178.407L65.017 181.186C65.0934 181.591 65.4097 181.907 65.814 181.983L68.593 182.509C68.8296 182.553 69.0012 182.759 69.0012 183C69.0012 183.241 68.8296 183.448 68.593 183.492L65.814 184.017C65.4097 184.094 65.0934 184.41 65.017 184.814L64.4915 187.593C64.4473 187.83 64.2407 188.001 64 188.001C63.7593 188.001 63.5527 187.83 63.5085 187.593L62.983 184.814C62.9066 184.41 62.5903 184.094 62.186 184.017L59.407 183.492C59.1704 183.448 58.9988 183.241 58.9988 183C58.9988 182.759 59.1704 182.553 59.407 182.509L62.186 181.983C62.5903 181.907 62.9066 181.591 62.983 181.186L63.5085 178.407"
                stroke="var(--primary)"
                strokeOpacity="0.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>

        <g>
          <rect
            x="76"
            y="81"
            width="88"
            height="88"
            rx="16"
            fill="var(--primary)"
          />
          <path
            d="M131.667 116.667V111.667C131.667 110.746 130.92 110 130 110H108.333C106.494 110 105 111.494 105 113.333C105 115.173 106.494 116.667 108.333 116.667H133.333C134.254 116.667 135 117.413 135 118.333V125H130C128.16 125 126.667 126.494 126.667 128.333C126.667 130.173 128.16 131.667 130 131.667H135C135.92 131.667 136.667 130.92 136.667 130V126.667C136.667 125.746 135.92 125 135 125"
            stroke="var(--background)"
            strokeWidth="3.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M105 113.333V136.667C105 138.508 106.492 140 108.333 140H133.333C134.254 140 135 139.254 135 138.333V131.667"
            stroke="var(--background)"
            strokeWidth="3.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="148"
            y="77"
            width="20"
            height="20"
            rx="10"
            fill="var(--background)"
          />
          <g filter="url(#filter3_dd_670_811)">
            <rect
              x="148"
              y="77"
              width="20"
              height="20"
              rx="10"
              fill="var(--background)"
              fillOpacity="0.01"
              shapeRendering="crispEdges"
            />
          </g>
          <rect
            x="154"
            y="83"
            width="8"
            height="8"
            rx="4"
            fill="var(--primary)"
          />
        </g>

        <defs>
          <filter
            id="filter0_dd_670_811"
            x="99"
            y="0"
            width="42"
            height="42"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="2"
              operator="erode"
              in="SourceAlpha"
              result="effect1_dropShadow_670_811"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_670_811"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="erode"
              in="SourceAlpha"
              result="effect2_dropShadow_670_811"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_670_811"
              result="effect2_dropShadow_670_811"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_670_811"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_dd_670_811"
            x="101"
            y="218"
            width="38"
            height="38"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="2"
              operator="erode"
              in="SourceAlpha"
              result="effect1_dropShadow_670_811"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_670_811"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="erode"
              in="SourceAlpha"
              result="effect2_dropShadow_670_811"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="3" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_670_811"
              result="effect2_dropShadow_670_811"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_670_811"
              result="shape"
            />
          </filter>
          <filter
            id="filter2_dd_670_811"
            x="110"
            y="24"
            width="20"
            height="20"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="erode"
              in="SourceAlpha"
              result="effect1_dropShadow_670_811"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_670_811"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_670_811"
              result="effect2_dropShadow_670_811"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_670_811"
              result="shape"
            />
          </filter>
          <filter
            id="filter3_dd_670_811"
            x="145"
            y="75"
            width="26"
            height="26"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood
              floodOpacity="0"
              result="BackgroundImageFix"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              operator="erode"
              in="SourceAlpha"
              result="effect1_dropShadow_670_811"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_670_811"
            />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="1" />
            <feGaussianBlur stdDeviation="1.5" />
            <feComposite
              in2="hardAlpha"
              operator="out"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_670_811"
              result="effect2_dropShadow_670_811"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_670_811"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_670_811">
            <rect
              width="16"
              height="16"
              fill="var(--background)"
              transform="translate(112 9)"
            />
          </clipPath>
          <clipPath id="clip1_670_811">
            <rect
              width="14"
              height="14"
              fill="var(--background)"
              transform="translate(160 55)"
            />
          </clipPath>
          <clipPath id="clip2_670_811">
            <rect
              width="12"
              height="12"
              fill="var(--background)"
              transform="translate(58 177)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
