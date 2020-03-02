import xmldom from 'xmldom';

export default new xmldom.DOMParser({
  errorHandler: {
    warning: function(w) {
      console.warn(w);
    },
    error: e => console.error(e),
    fatalError: e => console.error(e),
  },
});
