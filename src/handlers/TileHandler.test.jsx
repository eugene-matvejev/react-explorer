import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TileHandler from './TileHandler';

configure({ adapter: new Adapter() });

describe('TileHandler', () => {

  let mountedTileHandler;

  beforeEach(() => {
    mountedTileHandler = shallow(<TileHandler />);
  });

  describe('renders', () => { 
    it('has no props', () => {
      expect(mountedTileHandler).toMatchSnapshot();
    });
  });

  describe('lifecycle method', () => { 
    it.skip('mounts component with placeholder data', () => {
      
    });
  });

});