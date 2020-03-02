import { css } from 'styled-components';

const LineHeightSafetyBuffer = 0.03;

export default ({ fontSize = '20px', lineHeight = 1, linesToShow = 1, width = 'auto' }) => {
    return css`
        /* Fallback for non-webkit */
        display: block;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: ${linesToShow};
        width: ${width};

        /* Fallback for non-webkit */
        max-height: calc(${fontSize} * ${lineHeight + LineHeightSafetyBuffer} * ${linesToShow});
        font-size: ${fontSize};
        line-height: ${lineHeight};
    `;
};
