import type { SVGProps } from 'react';

export function CheckWithCircleSvg({
  width = 84,
  height = 84,
  viewBox = '0 0 84 84',
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      {...props}
    >
      <path
        d="M0 42C0 18.804 18.804 0 42 0C65.196 0 84 18.804 84 42C84 65.196 65.196 84 42 84C18.804 84 0 65.196 0 42Z"
        fill="var(--primary-muted)"
      />
      <path
        d="M14 42C14 26.536 26.536 14 42 14C57.464 14 70 26.536 70 42C70 57.464 57.464 70 42 70C26.536 70 14 57.464 14 42Z"
        fill="var(--primary)"
      />
      <path
        d="M33.8335 42L39.6668 47.8333L51.3335 36.1666"
        stroke="var(--background)"
        strokeWidth="2.91667"
      />
    </svg>
  );
}
