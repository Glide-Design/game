export const DefaultAPIRetryDelay = 500;
export const RetryNumber = 3;

export default (ms = DefaultAPIRetryDelay) => new Promise(resolve => setTimeout(resolve, ms));
