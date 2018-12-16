import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }

    this.changeBookShelf = this.changeBookShelf.bind(this);
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

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    const { books } = this.state;
    return (
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <BookList books={books} onBookShelfChange={this.changeBookShelf} />
          )} />
        <Route
          exact path="/search"
          render={() => (
            <BookSearch onBookShelfChange={this.changeBookShelf} books={books} />
          )} />
      </div>
    )
  }
}

export default BooksApp
