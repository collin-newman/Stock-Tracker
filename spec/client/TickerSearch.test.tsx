/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import { shallow } from 'enzyme';
import TickerSearch from '../../src/components/TickerSearch';


describe('TickerSearch component', () => {

  it('Renders a form component', () => {
    const wrapper = shallow(<TickerSearch />);

    expect(wrapper.find('form')).toHaveLength(1);
  });
});