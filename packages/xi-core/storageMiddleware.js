const SET_ITEM = 'storageMiddleware/SET_ITEM';
const GET_ITEM = 'storageMiddleware/GET_ITEM';
const REMOVE_ITEM = 'storageMiddleware/REMOVE_ITEM';
const MULTI_SET = 'storageMiddleware/MULTI_SET';
const MULTI_GET = 'storageMiddleware/MULTI_GET';
const MULTI_REMOVE = 'storageMiddleware/MULTI_REMOVE';

export default api => () => {
  let currentTransaction = Promise.resolve();
  return next => action => {
    switch (action.type) {
      case SET_ITEM:
        // Note even if {get,set,remove}Item is sync, it will get wrapped in a promise
        if (process.env.NODE_ENV !== 'production') {
          if (typeof action.key !== 'string') {
            console.error(`Attempted to set item with non-string key: ${action.key}`);
          }
          if (typeof action.value !== 'string') {
            console.error(`Attempted to set item with non-string value: ${action.value}`);
          }
        }
        currentTransaction = currentTransaction.then(() => api.setItem(action.key, action.value));
        return currentTransaction;
      case GET_ITEM:
        if (process.env.NODE_ENV !== 'production') {
          if (typeof action.key !== 'string') {
            console.error(`Attempted to get item with non-string key: ${action.key}`);
          }
        }
        currentTransaction = currentTransaction.then(() => api.getItem(action.key));
        return currentTransaction;
      case REMOVE_ITEM:
        if (process.env.NODE_ENV !== 'production') {
          if (typeof action.key !== 'string') {
            console.error(`Attempted to removed item with non-string key: ${action.key}`);
          }
        }
        currentTransaction = currentTransaction.then(() => api.removeItem(action.key));
        return currentTransaction;
      case MULTI_SET:
        if (process.env.NODE_ENV !== 'production') {
          const allStrings = action.tuples.every(
            t => typeof t[0] === 'string' && typeof t[1] === 'string'
          );
          if (!allStrings) {
            console.error('Attempted to multi set items with non-string values');
          }
        }
        currentTransaction = currentTransaction.then(() => api.multiSet(action.tuples));
        return currentTransaction;
      case MULTI_GET:
        if (process.env.NODE_ENV !== 'production') {
          const allStrings = action.keys.every(key => typeof key === 'string');
          if (!allStrings) {
            console.error('Attempted to multi get items with non-string keys');
          }
        }
        currentTransaction = currentTransaction.then(() => api.multiGet(action.keys));
        return currentTransaction;
      case MULTI_REMOVE:
        if (process.env.NODE_ENV !== 'production') {
          const allStrings = action.keys.every(key => typeof key === 'string');
          if (!allStrings) {
            console.error('Attempted to multi get items with non-string keys');
          }
        }
        currentTransaction = currentTransaction.then(() => api.multiRemove(action.keys));
        return currentTransaction;
      default:
        return next(action);
    }
  };
};

export const setItem = (key, value) => ({ type: SET_ITEM, key, value });
export const getItem = key => ({ type: GET_ITEM, key });
export const removeItem = key => ({ type: REMOVE_ITEM, key });
export const multiSet = tuples => ({ type: MULTI_SET, tuples });
export const multiGet = keys => ({ type: MULTI_GET, keys });
export const multiRemove = keys => ({ type: MULTI_REMOVE, keys });
