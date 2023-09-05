import { SVGProps } from 'react';

const SVGLightPrevButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.4" cx="30" cy="30" r="30" fill="black" />
    <path d="M34 18L22 30L34 42" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SVGLightNextButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.4" cx="30" cy="30" r="30" fill="black" />
    <path d="M26 42L38 30L26 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SVGPrevButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.8" cx="30" cy="30" r="30" fill="black" />
    <path d="M34 18L22 30L34 42" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SVGNextButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle opacity="0.8" cx="30" cy="30" r="30" fill="black" />
    <path d="M26 42L38 30L26 18" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SVGArrowUpButton = (props: SVGProps<SVGSVGElement>) => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g filter="url(#filter0_d_1121_48434)">
      <circle cx="36" cy="34" r="24" fill="white" />
    </g>
    <path d="M46 37L36 27L26 37" stroke="#222222" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <filter
        id="filter0_d_1121_48434"
        x="0"
        y="0"
        width="72"
        height="72"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
const SVGTalkStartPoint = (props: SVGProps<SVGSVGElement>) => (
  <svg width="45" height="29" viewBox="0 0 45 29" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.6465 0C0.646968 4.5 -0.328088 15.5 0.0719123 19.5C0.0960432 19.7413 0.14483 19.9687 0.215979 20.1828C0.80111 25.1482 5.02412 29 10.1468 29C15.6696 29 20.1468 24.5228 20.1468 19C20.1468 13.4772 15.6696 9 10.1468 9C9.43214 9 8.73503 9.07496 8.06287 9.21744C6.79338 7.17353 7.89716 3.53533 10.6465 0Z"
      fill="#4F4F4F"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.7178 0C24.7183 4.5 23.7432 15.5 24.1432 19.5C24.1673 19.7413 24.2161 19.9687 24.2873 20.1828C24.8724 25.1482 29.0954 29 34.218 29C39.7409 29 44.218 24.5228 44.218 19C44.218 13.4772 39.7409 9 34.218 9C33.5034 9 32.8063 9.07496 32.1342 9.21744C30.8647 7.17353 31.9685 3.53533 34.7178 0Z"
      fill="#4F4F4F"
    />
  </svg>
);

const SVGTalkEndPoint = (props: SVGProps<SVGSVGElement>) => (
  <svg width="45" height="29" viewBox="0 0 45 29" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.3535 29C44.353 24.5 45.3281 13.5 44.9281 9.5C44.904 9.25869 44.8552 9.03133 44.784 8.81716C44.1989 3.8518 39.9759 4.39222e-07 34.8532 8.87058e-07C29.3304 1.36988e-06 24.8532 4.47715 24.8532 10C24.8532 15.5228 29.3304 20 34.8532 20C35.5679 20 36.265 19.925 36.9371 19.7826C38.2066 21.8265 37.1028 25.4647 34.3535 29Z"
      fill="#4F4F4F"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.2822 29C20.2817 24.5 21.2568 13.5 20.8568 9.5C20.8327 9.25869 20.7839 9.03133 20.7127 8.81716C20.1276 3.8518 15.9046 4.39222e-07 10.782 8.87058e-07C5.2591 1.36988e-06 0.781952 4.47715 0.781952 10C0.781953 15.5228 5.25911 20 10.782 20C11.4966 20 12.1937 19.925 12.8658 19.7826C14.1353 21.8265 13.0315 25.4647 10.2822 29Z"
      fill="#4F4F4F"
    />
  </svg>
);

export {
  SVGLightPrevButton,
  SVGLightNextButton,
  SVGPrevButton,
  SVGNextButton,
  SVGArrowUpButton,
  SVGTalkStartPoint,
  SVGTalkEndPoint
};
