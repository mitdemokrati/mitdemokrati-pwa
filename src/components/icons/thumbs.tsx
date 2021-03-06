import React from 'react';

type ThumbProps = {
  className?: string;
  size: number;
};
export const Thumb = ({
  className = 'thumbs',
  size,
}: ThumbProps): JSX.Element => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    enableBackground="new 0 0 350 350"
    xmlSpace="preserve"
    viewBox="0 0 350 350"
    height={size}
    width={size}
    y="0px"
    x="0px"
  >
    <path
      fill="inherit"
      stroke="inherit"
      strokeWidth="10"
      d="M199.595,25c9.365,0.001,18.973,6.367,21.828,21.159c10.263,53.176-14.648,92.984-14.648,92.984h53.946
					c15.896,0,29.773,12.879,29.773,28.771c0,15.885-10.836,28.771-21.199,28.771c2.55,4.299,4.038,9.291,4.038,14.646
					c0,12.208-7.611,22.619-18.353,26.799c2.863,4.477,4.546,9.771,4.546,15.477c0,14.063-10.086,25.75-23.412,28.262
					c2.434,4.224,3.847,9.109,3.847,14.33c0,15.885-12.884,28.771-28.772,28.771L180.662,325
					c-90.319,0-73.312-31.335-121.159-31.335V174.969c30.568,0,57.156-1.621,83.819-43.766
					c18.678-29.521,30.692-48.09,35.718-88.036C180.467,31.817,189.902,25,199.595,25z"
    />
  </svg>
);
