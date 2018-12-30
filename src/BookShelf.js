import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = props => {
  const { books, title, onBookShelfChange, shelfTypes } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={book.id || index}>
              <Book {...{ book, onBookShelfChange, shelfTypes }} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object),
  onBookShelfChange: PropTypes.func.isRequired,
  shelfTypes: PropTypes.arrayOf(PropTypes.object),
};

BookShelf.defaultProps = {
  books: [],
  shelfTypes: [],
};

export default BookShelf;
