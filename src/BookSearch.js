import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import If from './If';

class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.object),
    onBookShelfChange: PropTypes.func.isRequired,
    shelfTypes: PropTypes.arrayOf(PropTypes.object),
    onSearch: PropTypes.func,
  }

  static defaultProps = {
    books: [],
    onSearch: BooksAPI.search,
  }

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      searchResult: [],
      loading: false,
    };
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(event) {
    const query = event.target.value;
    const { onSearch } = this.props;
    this.setState({
      query,
      loading: true,
      searchResult: [], });
    console.debug("handleQuery called:", query);
    if (query !== '') {
      onSearch(query)
        .then(searchResult => {
          console.debug('onSearch() promise returned:', searchResult)
          if (searchResult instanceof Array) {
            this.setState(() => ({
              searchResult,
              loading: false,
            }));
          } else {
            this.setState(() => ({
              searchResult: [
                {
                  title: "Invalid search",
                }
              ],
              loading: false,
            }))
          }
        })
        .catch(error => console.log(error));
    } else {
      this.setState(() => {
        console.log("empty query!");
        return {
          searchResult: [],
          loading: false,
        };
      });
    }
  }

  render() {
    const { onBookShelfChange, books, shelfTypes } = this.props;
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
            <DebounceInput
              debounceTimeout={500}
              value={query}
              type="text"
              onChange={this.handleQuery}
              placeholder="Search by title or author" />

          </div>
        </div>
        <div className="search-books-results">
          <If test={this.state.loading} >
            <div className="books-grid">
              <ReactLoading type="spinningBubbles" color="green" height={'20%'} width={'20%'} />
            </div>
          </If>
          <ol className="books-grid">
            {/* {this.state.loading && (<li><ReactLoading type="spinningBubbles" color="green" height={100} width={100} /></li>)} */}
            {
              searchResult.map((book, index) => {
                return (
                  <li key={book.id || index}>
                    <Book
                      book={books.filter((b) => b.id === book.id)[0] || book}
                      onBookShelfChange={onBookShelfChange}
                      shelfTypes={shelfTypes}
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
