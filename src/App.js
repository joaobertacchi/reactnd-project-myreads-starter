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
    BooksAPI.update(book, shelf)
      .then((resp) => {
        if (shelf === 'none') {
          console.log(`Succeeded to remove book ${book.id} from shelves!`);
          this.setState((currState) => ({
            books: [...currState.books.filter(b => b.id !== changedBook.id)],
          }));
        } else if (resp[shelf].includes(book.id)) {
          console.log(`Succeeded to move book ${book.id} to ${shelf} shelf!`);
          this.setState((currState) => ({
            books: [...currState.books.filter(b => b.id !== changedBook.id), changedBook],
          }));
        } else {
          console.log(`Failed to move book ${book.id} to ${shelf} shelf!`);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  render() {
    const { books } = this.state;
    const shelfTypes = [
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
      <div className="app">
        <Route
          exact path="/"
          render={() => (
            <BookList
              books={books}
              onBookShelfChange={this.changeBookShelf}
              shelfTypes={shelfTypes}
            />
          )} />
        <Route
          exact path="/search"
          render={() => (
            <BookSearch
              onBookShelfChange={this.changeBookShelf}
              books={books}
              shelfTypes={shelfTypes}
            />
          )} />
      </div>
    )
  }
}

export default BooksApp
