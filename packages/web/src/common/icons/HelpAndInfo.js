import React from 'react';

export default props => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="11" />
      <circle cx="12" cy="12" r="6.5" />
      <path
        strokeLinecap="square"
        d="M4.25 4.25l3 3M17.25 16.75l2.435 2.296M17.25 7.75L20 5M4.75 19.046l2.435-2.296"
      />
    </g>
  </svg>
);
