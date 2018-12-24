import React from 'react';
import BookSearch from './BookSearch';
import { shallow } from 'enzyme';

describe('[Component] BookSearch', () => {
  // Force PropTypes to throw errors instead of logging warnings
  console.error = message => {
    throw new Error(message);
  }

  let setup;

  beforeEach(() => {
    setup = {
      onBookShelfChange: jest.fn(),
      onSearch: jest.fn(() => {
        return new Promise((resolve, reject) => {
          const books = [
            {
              title: "Book 1",
            },
            {
              title: "Book 2",
            },
          ];
          resolve(books);
        });
      }),
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
          reject("Bogus input");
        });
      }),
    };

    const wrapper = shallow(<BookSearch {...bogusSetup} />);

    expect(() => {
      wrapper.find('DebounceInput').simulate('change', { target: { value: 'art' } });
    }).not.toThrow();
  });

  it('return empty list for empty string input', done => {
    const wrapper = shallow(<BookSearch {...setup} />);
    const searchResult = [
      {
        id: "book1",
        title: "Book 1",
      },
      {
        id: "book2",
        title: "Book 2",
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
      onBookShelfChange: jest.fn(),
      onSearch: jest.fn(() => {
        return new Promise((resolve, reject) => {
          const books = undefined;
          resolve(books);
        });
      }),
    };
    const wrapper = shallow(<BookSearch {...setupInvalidQuery} />);
    wrapper.find('DebounceInput').simulate('change', { target: { value: '???' } });
  });
});
