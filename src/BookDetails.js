import React, { Component } from 'react';
import PropTypes from 'prop-types';
import If from './If';
import ReactLoading from 'react-loading';
import * as BooksAPI from './BooksAPI';

class BookDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    onGet: PropTypes.func,
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
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Book Details</h1>
        </div>
        <div className="list-books-content">
          <div
            className="book-cover"
            style={book.style || {
              width: 128,
              height: 190,
              backgroundImage: `url(${(book.imageLinks && book.imageLinks.smallThumbnail) || ''})`,
            }}
          ></div>
          <p><b>Title:</b> {book.title}</p>
          <p><b>Description:</b> {book.description}</p>
          <p><b>Authors:</b> {(book.authors || []).join('; ')}</p>
          <If test={loading}>
            <ReactLoading type="spinningBubbles" color="green" height={'20%'} width={'20%'} />
          </If>
        </div>
      </div>
    );
  }
}

export default BookDetails;
