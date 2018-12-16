import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResult: []
    };
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(event) {
    const query = event.target.value;
    this.setState({ query });
    if (query !== '') {
      BooksAPI.search(query)
        .then(searchResult => {
          if (searchResult instanceof Array) {
            this.setState({ searchResult });
          } else {
            this.setState({
              searchResult: [
                {
                  title: "Invalid search",
                }
              ]
            })
          }
        })
        .catch(error => console.log(error));
    } else {
      this.setState({ searchResult: [] });
    }
  }

  render() {
    const { onBookShelfChange, books } = this.props;
    const { searchResult, query } = this.state;
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
              searchResult.map((book, index) => {
                return (
                  <li key={book.id || index}>
                    <Book
                      book={books.filter((b) => b.id === book.id)[0] || book}
                      onBookShelfChange={onBookShelfChange}
                    />
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
