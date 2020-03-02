import React from 'react';

export default ({ width = 24, height = 24, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 23 23" {...props}>
    <g fill="currentColor" fillRule="evenodd">
      <path d="M18.727 0L7.997 10.496l-1.95 5.832 5.962-1.907L22.738 3.925 18.727 0zm-8.94 11.572l8.94-8.744 1.12 1.097-8.938 8.743-1.666.533.545-1.629z" />
      <path d="M18.446 6.71L15.88 4.198l1.446-1.414 2.565 2.51zM.5 2.77h12.586V.768H.5zM.5 22.77h20.445v-2H.5z" />
      <path d="M0 22.77h2.044v-22H0zM18.986 22.77h2.044V10.456h-2.044z" />
    </g>
  </svg>
);
