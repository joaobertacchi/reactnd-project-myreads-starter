import React from 'react';
import BookSearch from './BookSearch';
import { shallow, mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe('[Component] BookSearch', () => {
  // Force PropTypes to throw errors instead of logging warnings
  console.error = message => {
    throw new Error(message);
  };

  let setup;
  let pathname;
  let history;

  beforeEach(() => {
    pathname = '/search';
    history = createMemoryHistory(pathname);
    setup = {
      onBookShelfChange: jest.fn(),
      onSearch: jest.fn(() => {
        return new Promise((resolve) => {
          const books = [
            {
              title: 'Book 1',
            },
            {
              title: 'Book 2',
            },
          ];
          resolve(books);
        });
      }),
      history,
      location: {
        pathname,
        search: '',
      }
    };
  });

  it('calls handleQuery when text is typed in search input', () => {
    // Save handler
    const oldHandleQuery = BookSearch.prototype.handleQuery;

    // Change handler for current test
    BookSearch.prototype.handleQuery = jest.fn();
    const wrapper = shallow(
      <BookSearch {...setup} />
    );

    wrapper.find('DebounceInput').simulate('change', { target: { value: 'art' } });
    expect(BookSearch.prototype.handleQuery).toHaveBeenCalled();

    // Restore handler for next tests
    BookSearch.prototype.handleQuery = oldHandleQuery;
  });

  it('calls handleQuery when url contains a preset query term', done => {
    const pathname = '/search';
    const search = '?q=term';
    history.push(pathname+search);
    const wrapper = shallow(
      <BookSearch {...{
        ...setup,
        location: {
          pathname,
          search,
        }
      }} />
    );

    wrapper.instance().componentDidMount();
    expect(setup.onSearch).toHaveBeenCalled();
    process.nextTick(() => {
      expect(wrapper.find('Book')).toHaveLength(2);
      done();
    });
  });

  it('calls onSearch handler when passed via props', () => {
    const wrapper = shallow(<BookSearch {...setup} />);

    wrapper.find('DebounceInput').simulate('change', { target: { value: 'art' } });
    expect(setup.onSearch).toHaveBeenCalled();
  });

  it('catch error upon API failure', () => {
    const bogusSetup = {
      ...setup,
      onSearch: jest.fn(() => {
        return new Promise((resolve, reject) => {
          reject('Bogus input');
        });
      }),
    };

    const wrapper = mount(
      <Router history={history}>
        <BookSearch {...bogusSetup} />
      </Router>
    );

    expect(() => {
      wrapper.find('DebounceInput').simulate('change', { target: { value: 'art' } });
    }).not.toThrow();
  });

  it('return empty list for empty string input', done => {
    const wrapper = shallow(<BookSearch {...setup} />);
    const searchResult = [
      {
        id: 'book1',
        title: 'Book 1',
      },
      {
        id: 'book2',
        title: 'Book 2',
      },
    ];
    wrapper.instance().setState({ searchResult });
    wrapper.update();
    expect(wrapper.find('Book')).toHaveLength(2);

    wrapper.find('DebounceInput').simulate('change', { target: { value: '' } });
    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.find('Book')).toHaveLength(0);
      done();
    });
  });

  it('renders successfully invalid query', () => {
    const setupInvalidQuery = {
      ...setup,
      onSearch: jest.fn(() => {
        return new Promise((resolve) => {
          const books = undefined;
          resolve(books);
        });
      }),
    };
    const wrapper = shallow(<BookSearch {...setupInvalidQuery} />);
    wrapper.find('DebounceInput').simulate('change', { target: { value: '???' } });
  });

  it('_getBookFromShelves() returns a book from the shelves when it is available', () => {
    const searchedBook = {
      id: 1,
    };
    const shelfBook1 = {
      id: 1,
    };
    const shelfBook2 = {
      id: 2,
    };
    const shelves = [shelfBook1, shelfBook2];

    const wrapper = shallow(<BookSearch {...setup} />);
    expect(wrapper.instance()._getBookFromShelves(shelves, searchedBook)).toBe(shelfBook1);
  });

  it('_getBookFromShelves() returns the searchedBook when it is not on the shelves', () => {
    const searchedBook = {
      id: 1,
    };
    const shelfBook2 = {
      id: 2,
    };
    const shelves = [shelfBook2];

    const wrapper = shallow(<BookSearch {...setup} />);
    expect(wrapper.instance()._getBookFromShelves(shelves, searchedBook)).toBe(searchedBook);
  });
});
