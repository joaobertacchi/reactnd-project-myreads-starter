import React from 'react';
import Book from './Book';
import { shallow } from 'enzyme';

describe('[Component] Book', () => {
  // Force PropTypes to throw errors instead of logging warnings
  console.error = message => {
    throw new Error(message);
  };

  const defaultBook = {
    title: "My book",
    authors: ["John"],
    shelf: "read",
    imageLinks: {
      smallThumbnail: ""
    },
  };

  const setup = {
    onBookShelfChange: jest.fn(),
  };

  it('MUST have at least a title', () => {
    const { title, ...bookWithoutTitle } = defaultBook;

    expect(() => {
      shallow(<Book book={bookWithoutTitle} {...setup} />);
    }).toThrow();
  });

  it('renders successfully when its authors are missing', () => {
    const { authors, ...bookWithoutAuthors } = defaultBook;

    expect(() => {
      shallow(<Book book={bookWithoutAuthors} {...setup} />);
    }).not.toThrow();
  });

  it('renders successfully when its thumbnail is missing', () => {
    const { imageLinks, ...bookWithoutThumbnail } = defaultBook;

    expect(() => {
      shallow(<Book book={bookWithoutThumbnail} {...setup} />);
    }).not.toThrow();
  });

  it('is classified as "none" when no shelf is provided', () => {
    const { shelf, ...bookWithoutShelf } = defaultBook;
    const wrapper = shallow(<Book book={bookWithoutShelf} {...setup} />);

    expect(wrapper.find("select").props().value).toEqual("none");
  });

  it('calls onBookShelfChange when a change in select happens', () => {
    const wrapper = shallow(<Book book={defaultBook} {...setup} />);
    wrapper.find('select').simulate('change', { target: { value: 'wantToRead' } });

    expect(setup.onBookShelfChange).toHaveBeenCalled();
  });

  it('has configurable shelf types', () => {
    const shelfTypes = [
      { title: "Type1", shelf: "type1", },
      { title: "Type2", shelf: "type2", },
    ];
    const wrapper = shallow(<Book
      book={defaultBook}
      {...setup}
      shelfTypes={shelfTypes}
    />);

    expect(wrapper.find('option')).toHaveLength(shelfTypes.length + 2);
  });
});
