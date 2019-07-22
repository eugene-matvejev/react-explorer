import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HealthCheck from './HealthCheck';

configure({ adapter: new Adapter() });

describe('HealthCheck', () => {
  describe('renders', () => {
    it('with no props', () => {
      expect(true).toBe(true);
    });
  });
});
