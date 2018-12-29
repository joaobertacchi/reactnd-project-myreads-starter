import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
});

describe('[Component] App', () => {
  const books = [
    {
      id: 'book1',
      title: 'Book 1',
      authors: [],
      shelf: 'read'
    },
  ];
  const setup = {
    getAll: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(books);
      });
    }),
    update: jest.fn((book, shelf) => {
      return new Promise((resolve) => {
        const shelves = {
          [shelf]: [(shelf !== 'none' ? book.id : undefined)],
        };
        resolve(shelves);
      });
    }),
  };

  it('renders BookList in / path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} >
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find('BookList')).toHaveLength(1);
    expect(wrapper.find('BookSearch')).toHaveLength(0);
  });

  it('renders BookSearch in /search path', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']} >
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find('BookList')).toHaveLength(0);
    expect(wrapper.find('BookSearch')).toHaveLength(1);
  });

  it('fetches all books when App is rendered with / path', () => {
    mount(
      <MemoryRouter initialEntries={['/']} >
        <App {...setup} />
      </MemoryRouter>
    );

    expect(setup.getAll).toHaveBeenCalled();
  });

  it('set initial state when App is renderes in / path', done => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} >
        <App {...setup} />
      </MemoryRouter>
    );

    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.find('Book')).toHaveLength(1);
      done();
    });
  });

  it('move book from "read" to "wantToRead" shelf', done => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} >
        <App state={{ books }} {...setup} />
      </MemoryRouter>
    );

    wrapper.find('select').simulate('change', { target: { value: 'wantToRead' } });
    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.find('select').props().value).toEqual('wantToRead');
      done();
    });
  });

  it('move book from "read" to "none" shelf', done => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} >
        <App state={{ books }} {...setup} />
      </MemoryRouter>
    );

    wrapper.find('select').simulate('change', { target: { value: 'none' } });
    process.nextTick(() => {
      wrapper.update();
      expect(wrapper.find('Book')).toHaveLength(0);
      done();
    });
  });
});
