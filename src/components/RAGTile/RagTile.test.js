import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RagTile from './RagTile';
import {TileHeader, TileWrapper} from './RagTileStyling';

configure({ adapter: new Adapter() });

describe('RagTile', () => {

  const props = {
    id: 1,
    status : "red",
    name : "Health Check 1",
    parent: null,
    onClick: jest.fn(),
  }

  const propsTileWrapper = {
    ...{ key : props.id, tileColour: props.status, onClick : props.onClick}
  }

  let mountedRagTile;

  beforeEach(() => {
    mountedRagTile = shallow(<RagTile {...props} />);
  });

  describe('renders', () => {
    
    it('with some props', () => {
      expect(mountedRagTile).toMatchSnapshot();
    });

    it('a TileWrapper Component with the correct props', () => {
      const tileWrapper = mountedRagTile.find(TileWrapper);
      expect(tileWrapper.length).toBe(1);
      expect(tileWrapper.props().tileColour).toEqual('red');
      expect(tileWrapper.props().onClick).toEqual(expect.any(Function));
    });

    it('a TileHeader Component', () => {
      const tileHeader = mountedRagTile.find(TileHeader);
      expect(tileHeader.length).toBe(1);   
    });


  });
});

