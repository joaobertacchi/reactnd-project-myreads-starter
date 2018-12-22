import React, { Component } from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
    onBookShelfChange: PropTypes.func.isRequired,
    shelfTypes: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    books: [],
  }

  render() {
    const { onBookShelfChange, books, shelfTypes } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfTypes.map(bookShelf => (
              <BookShelf
                key={bookShelf.shelf}
                title={bookShelf.title}
                books={books.filter(book => book.shelf === bookShelf.shelf)}
                onBookShelfChange={onBookShelfChange}
                shelfTypes={shelfTypes}
              />
            ))}
          </div>
        </div>
        <Link to={'/search'}>
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
    );
  }
}

export default BookList;
