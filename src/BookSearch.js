import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      books: []
    };
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(event) {
    const query = event.target.value;
    this.setState({ query });
    if (query !== '') {
      BooksAPI.search(query)
        .then(books => {
          if (books instanceof Array) {
            this.setState({ books });
          } else {
            this.setState({
              books: [
                {
                  title: "Invalid search",
                }
              ]
            })
          }
        })
        .catch(error => console.log(error));
    } else {
      this.setState({ books: [] });
    }
  }

  render() {
    const { query } = this.props;
    const { books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              value={query}
              type="text"
              onChange={this.handleQuery}
              placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.map((book, index) => {
                return (
                  <li key={book.id || index}>
                    <Book book={book} />
                  </li>
                );
              })
            }
          </ol>
        </div>
      </div>
    );
  }
}

export default BookSearch;
