import { camelCase, flow, mapKeys, replace } from 'lodash/fp';

export default env =>
	mapKeys(
		flow(
			replace('REACT_APP_', ''),
			camelCase
		)
	)(env);
