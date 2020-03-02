import React from 'react';

export default ({ ...props }) => (
  <svg
    {...props}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8" cy="8" r="8" fill="#3C6BF6" />
    <path d="M4 8L7 11L13 5" stroke="white" />
  </svg>
);
