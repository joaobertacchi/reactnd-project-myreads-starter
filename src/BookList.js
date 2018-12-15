import React, { Component } from 'react';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }

    this.changeBookShelf = this.changeBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  changeBookShelf(shelf, book) {
    const changedBook = {
      ...book,
      shelf,
    };
    BooksAPI.update(book, shelf).then(() => {
      this.setState((currState) => ({
        books: [...currState.books.filter(b => b.id !== changedBook.id), changedBook],
      }));
    });
  }

  render() {
    const { onPageChange } = this.props;
    const { books } = this.state;
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
              onBookShelfChange={this.changeBookShelf}
            />
            <BookShelf
              title={"Want to Read"}
              books={books.filter(book => book.shelf === "wantToRead")}
              onBookShelfChange={this.changeBookShelf}
            />
            <BookShelf
              title={"Read"}
              books={books.filter(book => book.shelf === "read")}
              onBookShelfChange={this.changeBookShelf}
            />
          </div>
        </div>
        <div className="open-search">
          <button onClick={onPageChange}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default BookList;
