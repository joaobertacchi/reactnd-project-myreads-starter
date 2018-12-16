import React, { Component } from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

class BookList extends Component {
  render() {
    const { onBookShelfChange, books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title={"Currently Reading"}
              books={books.filter(book => book.shelf === "currentlyReading")}
              onBookShelfChange={onBookShelfChange}
            />
            <BookShelf
              title={"Want to Read"}
              books={books.filter(book => book.shelf === "wantToRead")}
              onBookShelfChange={onBookShelfChange}
            />
            <BookShelf
              title={"Read"}
              books={books.filter(book => book.shelf === "read")}
              onBookShelfChange={onBookShelfChange}
            />
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
