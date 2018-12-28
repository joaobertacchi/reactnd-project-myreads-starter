import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Book = props => {
  const { book, onBookShelfChange, shelfTypes } = props;
  return (
    <div className="book">
      <div className="book-top">
        {/* TODO: Refactor book cover style behavour */}
        <Link to={`/books/${book.id}`}>
          <div
            className="book-cover"
            style={book.style || {
              width: 128,
              height: 190,
              backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail) || ''})`,
            }}
            ></div>
        </Link>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || 'none'}
            onChange={event => onBookShelfChange(book, event.target.value)}
          >
            <option value="move" disabled>Move to...</option>
            {shelfTypes.map(shelfType => (
              <option key={shelfType.shelf} value={shelfType.shelf}>{shelfType.title}</option>
            ))}
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{(book.authors || []).join('; ') }</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string),
  }),
  onBookShelfChange: PropTypes.func.isRequired,
  shelfTypes: PropTypes.arrayOf(PropTypes.object),
};

Book.defaultProps = {
  shelfTypes: [],
};

export default Book;
