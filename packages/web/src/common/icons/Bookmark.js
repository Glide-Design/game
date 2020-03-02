import React from 'react';
import { PrimaryGreen } from 'xi-core/colours';

const Bookmark = ({ className, filled = false, filledColor = PrimaryGreen }) =>
  !filled ? (
    <svg className={className} width="12" height="15" viewBox="0 0 12 15">
      <g fill="none">
        <path d="M-2-1h16v16H-2z" />
        <path
          fill="currentColor"
          d="M11 12.503L6 7.339l-5 5.164V1.034h10v11.469zM11 0H0v15l6-6.207L12 15V0h-1z"
        />
      </g>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 1H14V15L8 9L2 15V1Z" fill="#7C52F6" />
    </svg>
  );

export default Bookmark;
