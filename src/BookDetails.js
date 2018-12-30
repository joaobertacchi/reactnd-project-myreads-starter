import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from './If';
import ReactLoading from 'react-loading';
import * as BooksAPI from './BooksAPI';

class BookDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    onGet: PropTypes.func,
    history: PropTypes.object,
  };

  static defaultProps = {
    onGet: BooksAPI.get,
  }

  constructor(props) {
    super(props);
    this.state = {
      book: {},
      loading: false,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const { onGet } = this.props;
    this.setState(() => ({
      loading: true,
    }));
    onGet(id)
      .then(book => {
        this.setState(() => ({
          book,
          loading: false,
        }));
      }).catch(error => {
        console.error(error);
      });
  }

  render() {
    const { book, loading } = this.state;
    const { history } = this.props;
    return (
      <div className="book-details">
        <div className="book-details-title">
          <button className="book-details-back" onClick={history.goBack}>Close</button>
          <h1>Book Details</h1>
        </div>
        <div className="book-details-content">
          <div className="book-details-left">
            <div
              className="book-details-cover"
              style={book.style || {
                width: 300,
                height: 435,
                backgroundImage: `url(${(book.imageLinks && book.imageLinks.thumbnail.replace('zoom=1', 'zoom=2')) || ''})`,
              }}
            ></div>
          </div>
          <div className="book-details-right">
            <div className="book-details-content-text">
              <If test={loading}>
                <ReactLoading type="spinningBubbles" color="green" height={'40%'} width={'40%'} />
              </If>
              <If test={!loading}>
                <h1>
                  {book.title}
                  <If test={book.subtitle}>
                    <small>: {book.subtitle}</small>
                  </If>
                </h1>
                <p><b>Authors:</b> {(book.authors || []).join('; ')} | <b>Pages:</b> {book.pageCount} | <b>ISBN:</b> {(book.industryIdentifiers ? book.industryIdentifiers[1].identifier : '')}</p>
                <p>{book.description}</p>
                <p>Published by <b>{book.publisher}</b> in {(new Date(book.publishedDate)).toDateString()}</p>
              </If>
            </div>
          </div>
        </div>
        <div className="book-details-footer">
        </div>
      </div>
    );
  }
}

export default BookDetails;
