import React from 'react';
import Book from './Book';

const BookShelf = props => {
  const { books, title } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={book.id || index}>
              <Book book={book} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;
