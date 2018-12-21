import React, { Component } from 'react';
import BookShelf from './BookShelf';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class BookList extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
    onBookShelfChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    books: [],
  }

  render() {
    const { onBookShelfChange, books } = this.props;
    const bookShelves = [
      {
        title: "Currently Reading",
        shelf: "currentlyReading",
      },
      {
        title: "Want to Read",
        shelf: "wantToRead",
      },
      {
        title: "Read",
        shelf: "read",
      }
    ];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelves.map(bookShelf => (
              <BookShelf
                key={bookShelf.shelf}
                title={bookShelf.title}
                books={books.filter(book => book.shelf === bookShelf.shelf)}
                onBookShelfChange={onBookShelfChange}
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
