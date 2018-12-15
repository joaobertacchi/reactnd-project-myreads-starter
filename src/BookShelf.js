import React from 'react';
import Book from './Book';

const BookShelf = props => {
  const { books, title, onBookShelfChange } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <li key={book.id || index}>
              <Book book={book} onBookShelfChange={onBookShelfChange} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default BookShelf;