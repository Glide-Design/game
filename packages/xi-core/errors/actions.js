const ON_GLOBAL_ERROR = 'ON_GLOBAL_ERROR';

const onGlobalError = error => ({
  type: ON_GLOBAL_ERROR,
  error,
});

export { onGlobalError };
