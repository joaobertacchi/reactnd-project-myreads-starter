import React from 'react';

const Book = props => {
  const { book, onBookShelfChange } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={book.style || {
            width: 128,
            height: 190,
            backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail) || ''})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book.shelf || "none"}
            onChange={event => onBookShelfChange(event.target.value, book)}
          >
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{(book.authors || []).join("; ") }</div>
    </div>
  );
}

export default Book;
