import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import BookList from './BookList';

describe('[Component] BookList', () => {
  const setup = {
    onBookShelfChange: jest.fn(),
  };

  const currentlyReadingBook = {
    title: 'Currently Reading Book',
    shelf: 'currentlyReading',
  };

  const wantToReadBook = {
    title: 'Want to Read Book',
    shelf: 'wantToRead',
  };

  const readBook = {
    title: 'Read Book',
    shelf: 'read',
  };

  const noShelfBook = {
    title: 'No Shelf Book'
  };

  it('renders three book BookShelves named "Currently Reading", "Want to Read", and "Read"', () => {
    const wrapper = shallow(<BookList {...setup} />);
    const shelfWapper = wrapper.find('BookShelf');
    expect(shelfWapper).toHaveLength(3);
    expect(shelfWapper.find({
      title: 'Currently Reading',
    })).toHaveLength(1);
    expect(shelfWapper.find({
      title: 'Want to Read',
    })).toHaveLength(1);
    expect(shelfWapper.find({
      title: 'Read',
    })).toHaveLength(1);
  });

  it('distributes books to the correct shelves', () => {
    const books = [currentlyReadingBook, wantToReadBook, readBook, noShelfBook];
    const wrapper = mount(
      <MemoryRouter>
        <BookList books={books} {...setup} />
      </MemoryRouter>
    );

    expect(wrapper.find('BookShelf').find({ books: [currentlyReadingBook] })).toHaveLength(1);
    expect(wrapper.find('BookShelf').find({ books: [wantToReadBook] })).toHaveLength(1);
    expect(wrapper.find('BookShelf').find({ books: [readBook] })).toHaveLength(1);
    expect(wrapper.find('BookShelf').find({ books: [noShelfBook] })).toHaveLength(0);
  });
});
