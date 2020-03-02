import React from 'react';

export default ({ width = 24, height = 24, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2m0 22C5.383 24 0 18.617 0 12S5.383 0 12 0c6.616 0 12 5.383 12 12s-5.384 12-12 12" />
      <text fontFamily="GT-America" fontSize="14" fontWeight="400">
        <tspan x="9" y="17">
          ?
        </tspan>
      </text>
    </g>
  </svg>
);
