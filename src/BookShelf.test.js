import React from 'react';
import { shallow } from 'enzyme';
import BookShelf from './BookShelf';

describe('[Component] BookShelf', () => {
  // Force PropTypes to throw errors instead of logging warnings
  console.error = message => {
    throw new Error(message);
  }

  const setup = {
    title: 'My shelf',
    onBookShelfChange: jest.fn(),
  }

  it('renders correctly', () => {
    expect(() => {
      shallow(<BookShelf {...setup} />);
    }).not.toThrow();
  });

  it('displays title', () => {
    const title = 'Test';
    const wrapper = shallow(
      <BookShelf {...{ ...setup, title }} />
    );

    expect(wrapper.find('.bookshelf-title').props().children).toEqual(title);
  });

  it('renders all the passed books', () => {
    const books = [
      { title: 'Book1', authors: [] },
      { title: 'Book2', authors: [] },
    ]
    const wrapper = shallow(
      <BookShelf {...setup} books={books} />
    );
    expect(wrapper.find('Book')).toHaveLength(2);
  });
});
