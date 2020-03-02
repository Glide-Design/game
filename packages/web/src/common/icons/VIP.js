import React from 'react';

export default ({ ...props }) => (
  <svg {...props} viewBox="0 0 16 16">
    <g fill="none" fillRule="evenodd">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        fill="#FFF"
        d="M11.057 5L6.333 9.724l-1.39-1.39L4 9.275l1.39 1.39.943.943.943-.942L12 5.943z"
      />
    </g>
  </svg>
);
