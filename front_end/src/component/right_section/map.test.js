import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map';

describe('Counter', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<Map />);
  });

  it('matches snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
});