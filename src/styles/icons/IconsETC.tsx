import { SVGProps } from 'react';

const SVGLightPrevButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.4" cx="30" cy="30" r="30" fill="black" />
    <path d="M34 18L22 30L34 42" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const SVGLightNexButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.4" cx="30" cy="30" r="30" fill="black" />
    <path d="M26 42L38 30L26 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const SVGPrevButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.8" cx="30" cy="30" r="30" fill="black" />
    <path d="M34 18L22 30L34 42" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const SVGNextButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.8" cx="30" cy="30" r="30" fill="black" />
    <path d="M26 42L38 30L26 18" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const SVGArrowUpButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_d_1121_48434)">
      <circle cx="36" cy="34" r="24" fill="white" />
    </g>
    <path d="M46 37L36 27L26 37" stroke="#222222" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    <defs>
      <filter
        id="filter0_d_1121_48434"
        x="0"
        y="0"
        width="72"
        height="72"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology radius="2" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_1121_48434" />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1121_48434" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1121_48434" result="shape" />
      </filter>
    </defs>
  </svg>
);

export { SVGLightPrevButton, SVGLightNexButton, SVGPrevButton, SVGNextButton, SVGArrowUpButton };
