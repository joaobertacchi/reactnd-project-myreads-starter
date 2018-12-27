import React from 'react';
import './App.css';
import BookList from './BookList';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class BooksApp extends React.Component {
  static propTypes = {
    update: PropTypes.func,
    getAll: PropTypes.func,
    state: PropTypes.object,
  }

  static defaultProps = {
    update: BooksAPI.update,
    getAll: BooksAPI.getAll,
  }

  constructor(props) {
    super(props);
    const { state } = this.props;
    this.state = state || {
      books: [],
    };

    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  updateBookShelf(book, shelf) {
    const { update } = this.props;
    update(book, shelf)
      .then((shelves) => {
        if (shelf === 'none') {
          this._removeBookFromAllShelves(book);
        } else if (Object.keys(shelves).includes(shelf) && shelves[shelf].includes(book.id)) {
          this._moveBookToShelf(book, shelf);
        } else {
          console.log(`Failed to move book ${book.id} to ${shelf} shelf!`);
        }
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  _copyBookAndSetShelf = (book, shelf) => ({ ...book, shelf })

  _moveBookToShelf(book, shelf) {
    this.setState((currState) => ({
      books: [...currState.books.filter(b => b.id !== book.id), this._copyBookAndSetShelf(book, shelf)],
    }));
    console.log(`Succeeded to move book ${book.id} to ${shelf} shelf!`);
  }

  _removeBookFromAllShelves(book) {
    this.setState((currState) => ({
      books: [...currState.books.filter(b => b.id !== book.id)],
    }));
    console.log(`Succeeded to remove book ${book.id} from shelves!`);
  }

  componentDidMount() {
    const { getAll } = this.props;
    getAll().then(books => {
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
              onBookShelfChange={this.updateBookShelf}
              shelfTypes={shelfTypes}
            />
          )} />
        <Route
          exact path="/search"
          render={() => (
            <BookSearch
              onBookShelfChange={this.updateBookShelf}
              books={books}
              shelfTypes={shelfTypes}
            />
          )} />
      </div>
    );
  }
}

export default BooksApp;
