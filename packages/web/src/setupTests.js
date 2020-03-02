import 'jest-localstorage-mock';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });
// Make some Enzyme functions available in all test files without importing
global.mount = mount;
global.shallow = shallow;
