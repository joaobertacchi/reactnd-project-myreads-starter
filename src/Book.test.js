import React from 'react';
import Book from './Book';
import { shallow } from 'enzyme';

describe('[Component] Book', () => {
  // Force PropTypes to throw errors instead of logging warnings
  console.error = message => {
    throw new Error(message);
  }

  const defaultBook = {
    title: "My book",
    authors: ["John"],
    shelf: "Read",
    imageLinks: {
      smallThumbnail: ""
    },
  };

  it('MUST have at least a title', () => {
    const { title, ...bookWithoutTitle } = defaultBook;

    expect(() => {
      shallow(<Book book={bookWithoutTitle} />);
    }).toThrow();
  });

  it('renders successfully when its authors are missing', () => {
    const { authors, ...bookWithoutAuthors } = defaultBook;

    expect(() => {
      shallow(<Book book={bookWithoutAuthors} />);
    }).not.toThrow();
  });

  it('renders successfully when its thumbnail is missing', () => {
    const { imageLinks, ...bookWithoutThumbnail } = defaultBook;

    expect(() => {
      shallow(<Book book={bookWithoutThumbnail} />);
    }).not.toThrow();
  });

  it('is classified as "none" when no shelf is provided', () => {
    const { shelf, ...bookWithoutShelf } = defaultBook;
    const wrapper = shallow(<Book book={bookWithoutShelf} />);

    expect(wrapper.find("select").props().value).toEqual("none");
  });
});
