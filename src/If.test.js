import React from 'react';
import { shallow } from 'enzyme';
import If from './If';

describe('[Component] If', () => {
  const children = <p>Hello, World!</p>;

  it('returns children if test return true', () => {
    const wrapper = shallow(<If test={true}>{children}</If>)
    expect(wrapper.getElement()).toEqual(children)
  })

  it('returns null if test returns false', () => {
    const wrapper = shallow(<If test={false}>{children}</If>)
    expect(wrapper.getElement()).toEqual(null)
  })
});
