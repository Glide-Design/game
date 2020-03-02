import htmlToReactParser from './htmlToReactParser';
import DOMParser from './DOMParser';

const testHtmlStrings = {
  unexpectedInput1: [],
  unexpectedInput2: 2,
  unexpectedInput3: true,
  emptyString: '',
  supportedTags: '<img src="mySource.png"/><p>Supported</p>',
  unsupportedTags: '<p>Script tag</p><script>console.log("script");</script>',
  supportedAttributes: '<img src="mysource.png"/>',
  unsupportedAttributes: '<img src="mysource.png" style="width:100px"/>',
};

const mockReplacements = {
  img: (children, { src, ...otherAttributes }) => key => ({ type: 'img', src, ...otherAttributes }),
  p: children => key => ({ type: 'p', children }),
  text: text => key => text,
};

describe('htmlToReactParser', () => {
  it('returns nothing if unexpected input passed', () => {
    let components = htmlToReactParser(testHtmlStrings.unexpectedInput1, DOMParser, {});
    expect(components).toEqual(null);
    components = htmlToReactParser(testHtmlStrings.unexpectedInput2, DOMParser, {});
    expect(components).toEqual(null);
    components = htmlToReactParser(testHtmlStrings.unexpectedInput3, DOMParser, {});
    expect(components).toEqual(null);
  });

  it('returns nothing if no replacements are passed', () => {
    const components = htmlToReactParser(testHtmlStrings.supportedTags, DOMParser, {});
    expect(components).toHaveLength(0);
  });

  it('returns nothing if empty html string passed', () => {
    const components = htmlToReactParser(testHtmlStrings.emptyString, DOMParser, mockReplacements);
    expect(components).toEqual(null);
  });

  it('returns supported tags', () => {
    const components = htmlToReactParser(
      testHtmlStrings.supportedTags,
      DOMParser,
      mockReplacements
    );
    expect(components).toHaveLength(2);
  });

  it('removes unsupported tags', () => {
    const components = htmlToReactParser(
      testHtmlStrings.unsupportedTags,
      DOMParser,
      mockReplacements
    );
    expect(components).toHaveLength(1);
    expect(components[0]).toHaveLength(1);
    expect(components[0][0].type).toEqual('p');
  });

  it('returns supported attributes', () => {
    const components = htmlToReactParser(
      testHtmlStrings.supportedAttributes,
      DOMParser,
      mockReplacements
    );
    expect(components[0][0].src).toBeDefined();
  });

  it('remove unsupported attributes', () => {
    const components = htmlToReactParser(
      testHtmlStrings.unsupportedAttributes,
      DOMParser,
      mockReplacements
    );
    expect(components[0][0].src).toBeDefined();
    expect(components[0][0].style).not.toBeDefined();
  });
});
