import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }


  handlePageChange(page) {
    this.setState({ showSearchPage: page === 'search' })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <BookSearch onPageChange={() => this.handlePageChange('list')} />
        ) : (
            <BookList onPageChange={() => this.handlePageChange('search')} />
        )}
      </div>
    )
  }
}

export default BooksApp
