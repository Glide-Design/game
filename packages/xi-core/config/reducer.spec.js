import { config } from './reducer';
import { CONFIG_SUCCESS } from './actions';

describe('config reducer', () => {
  it('defaults to having no config loaded', () => {
    expect(config(undefined, {})).toEqual({ loaded: false });
  });

  it('puts config into state and sets loaded to true', () => {
    const state = { loaded: false };
    const action = {
      type: CONFIG_SUCCESS,
      config: {
        apiRoot: 'https://api.stage.footycloud.com/cloudtv/v4',
        clientAppBaseUrl: 'https://eleven-staging.tojs.io',
      },
    };
    expect(config(state, action)).toEqual({
      loaded: true,
      apiRoot: 'https://api.stage.footycloud.com/cloudtv/v4',
      clientAppBaseUrl: 'https://eleven-staging.tojs.io',
    });
  });
});
