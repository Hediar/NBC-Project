import { SVGProps } from 'react';

const Ellipse = (props: SVGProps<SVGSVGElement>) => (
  <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="2" cy="2" r="2" fill="white" />
  </svg>
);

export default Ellipse;
