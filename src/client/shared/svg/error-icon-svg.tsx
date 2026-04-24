import type { SVGProps } from 'react';

export function ErrorIconSvg({
  width = 200,
  height = 200,
  viewBox = '0 0 200 200',
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
      <rect
        opacity="0.08"
        width="200"
        height="200"
        rx="100"
        fill="var(--primary)"
      />
      <rect
        opacity="0.14"
        x="20"
        y="20"
        width="160"
        height="160"
        rx="80"
        fill="var(--primary)"
      />
      <rect
        x="64"
        y="64"
        width="72"
        height="72"
        rx="36"
        fill="var(--primary)"
      />
      <g filter="url(#filter0_dd_665_746)">
        <rect
          x="64"
          y="64"
          width="72"
          height="72"
          rx="36"
          fill="var(--background)"
          fill-opacity="0.01"
          shape-rendering="crispEdges"
        />
      </g>
      <path
        d="M112.973 108L102.307 89.3333C101.833 88.4978 100.947 87.9814 99.9867 87.9814C99.0263 87.9814 98.1402 88.4978 97.6667 89.3333L87 108C86.5214 108.829 86.5237 109.85 87.0059 110.677C87.4881 111.504 88.3764 112.009 89.3333 112H110.667C111.619 111.999 112.498 111.49 112.974 110.665C113.45 109.841 113.449 108.825 112.973 108"
        stroke="var(--background)"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M100 96V101.333"
        stroke="var(--background)"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M100 106.667H100.013"
        stroke="var(--background)"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g clip-path="url(#clip0_665_746)">
        <path
          d="M167.181 20.3449C167.255 19.9505 167.599 19.6646 168 19.6646C168.401 19.6646 168.745 19.9505 168.819 20.3449L169.695 24.9765C169.822 25.6505 170.349 26.1776 171.023 26.3049L175.655 27.1807C176.049 27.2544 176.335 27.5986 176.335 27.9999C176.335 28.4011 176.049 28.7454 175.655 28.819L171.023 29.6949C170.349 29.8222 169.822 30.3493 169.695 31.0232L168.819 35.6549C168.745 36.0493 168.401 36.3352 168 36.3352C167.599 36.3352 167.255 36.0493 167.181 35.6549L166.305 31.0232C166.178 30.3493 165.651 29.8222 164.977 29.6949L160.345 28.819C159.951 28.7454 159.665 28.4011 159.665 27.9999C159.665 27.5986 159.951 27.2544 160.345 27.1807L164.977 26.3049C165.651 26.1776 166.178 25.6505 166.305 24.9765L167.181 20.3449"
          stroke="var(--primary)"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M174.667 19.6665V22.9998"
          stroke="var(--primary)"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M176.333 21.3335H173"
          stroke="var(--primary)"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M159.667 34.6667C159.667 35.5865 160.413 36.3333 161.333 36.3333C162.253 36.3333 163 35.5865 163 34.6667C163 33.7468 162.253 33 161.333 33C160.413 33 159.667 33.7468 159.667 34.6667V34.6667"
          stroke="var(--primary)"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g
        opacity="0.7"
        clip-path="url(#clip1_665_746)"
      >
        <path
          d="M25.3447 157.876C25.4036 157.56 25.679 157.332 26 157.332C26.321 157.332 26.5964 157.56 26.6553 157.876L27.356 161.581C27.4578 162.12 27.8795 162.542 28.4187 162.644L32.124 163.344C32.4395 163.403 32.6683 163.679 32.6683 164C32.6683 164.321 32.4395 164.596 32.124 164.655L28.4187 165.356C27.8795 165.458 27.4578 165.879 27.356 166.418L26.6553 170.124C26.5964 170.439 26.321 170.668 26 170.668C25.679 170.668 25.4036 170.439 25.3447 170.124L24.644 166.418C24.5421 165.879 24.1204 165.458 23.5813 165.356L19.876 164.655C19.5605 164.596 19.3317 164.321 19.3317 164C19.3317 163.679 19.5605 163.403 19.876 163.344L23.5813 162.644C24.1204 162.542 24.5421 162.12 24.644 161.581L25.3447 157.876"
          stroke="var(--primary)"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M31.3333 157.333V160"
          stroke="var(--primary)"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32.6667 158.667H30"
          stroke="var(--primary)"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.3333 169.333C19.3333 170.069 19.9308 170.667 20.6666 170.667C21.4025 170.667 22 170.069 22 169.333C22 168.597 21.4025 168 20.6666 168C19.9308 168 19.3333 168.597 19.3333 169.333V169.333"
          stroke="var(--primary)"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g
        opacity="0.6"
        clip-path="url(#clip2_665_746)"
      >
        <path
          d="M13.5085 43.4072C13.5527 43.1706 13.7592 42.999 14 42.999C14.2407 42.999 14.4473 43.1706 14.4915 43.4072L15.017 46.1862C15.0934 46.5906 15.4096 46.9068 15.814 46.9832L18.593 47.5087C18.8296 47.5529 19.0012 47.7595 19.0012 48.0002C19.0012 48.241 18.8296 48.4475 18.593 48.4917L15.814 49.0172C15.4096 49.0936 15.0934 49.4099 15.017 49.8142L14.4915 52.5932C14.4473 52.8299 14.2407 53.0014 14 53.0014C13.7592 53.0014 13.5527 52.8299 13.5085 52.5932L12.983 49.8142C12.9066 49.4099 12.5903 49.0936 12.186 49.0172L9.40698 48.4917C9.17033 48.4475 8.99878 48.241 8.99878 48.0002C8.99878 47.7595 9.17033 47.5529 9.40698 47.5087L12.186 46.9832C12.5903 46.9068 12.9066 46.5906 12.983 46.1862L13.5085 43.4072"
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 43V45"
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 44H17"
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 52C9 52.5519 9.44808 53 10 53C10.5519 53 11 52.5519 11 52C11 51.4481 10.5519 51 10 51C9.44808 51 9 51.4481 9 52V52"
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_dd_665_746"
          x="52"
          y="62"
          width="96"
          height="96"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood
            flood-opacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="4"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_665_746"
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
            in2="BackgroundImageFix"
            result="effect1_dropShadow_665_746"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_665_746"
          />
          <feOffset dy="10" />
          <feGaussianBlur stdDeviation="7.5" />
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
            in2="effect1_dropShadow_665_746"
            result="effect2_dropShadow_665_746"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_665_746"
            result="shape"
          />
        </filter>
        <clipPath id="clip0_665_746">
          <rect
            width="20"
            height="20"
            fill="var(--background)"
            transform="translate(158 18)"
          />
        </clipPath>
        <clipPath id="clip1_665_746">
          <rect
            width="16"
            height="16"
            fill="var(--background)"
            transform="translate(18 156)"
          />
        </clipPath>
        <clipPath id="clip2_665_746">
          <rect
            width="12"
            height="12"
            fill="var(--background)"
            transform="translate(8 42)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
