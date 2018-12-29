import React from 'react';
import BookDetails from './BookDetails';
import { shallow } from 'enzyme';

describe('[Component] BookDetails', () => {
  // Force PropTypes to throw errors instead of logging warnings
  console.error = message => {
    throw new Error(message);
  };

  const fakeBook = {
    title: 'Satire TV (FAKE)',
    subtitle: 'Politics and Comedy in the Post-Network Era',
    authors: [
      'Jonathan Gray', 'Jeffrey P. Jones', 'Ethan Thompson'
    ],
    publisher: 'NYU Press',
    publishedDate: '2009-04-01',
    description: 'Satirical TV has become mandatory viewing for citizens wishing to make sense of the bizarre contemporary state of political life. Shifts in industry economics and audience tastes have re-made television comedy, once considered a wasteland of escapist humor, into what is arguably the most popular source of political critique. From fake news and pundit shows to animated sitcoms and mash-up videos, satire has become an important avenue for processing politics in informative and entertaining ways, and satire TV is now its own thriving, viable television genre. Satire TV examines what happens when comedy becomes political, and politics become funny. A series of original essays focus on a range of programs, from The Daily Show to South Park, Da Ali G Show to The Colbert Report, The Boondocks to Saturday Night Live, Lil’ Bush to Chappelle’s Show, along with Internet D.I.Y. satire and essays on British and Canadian satire. They all offer insights into what today’s class of satire tells us about the current state of politics, of television, of citizenship, all the while suggesting what satire adds to the political realm that news and documentaries cannot.',
    industryIdentifiers: [
      {
        type: 'ISBN_10',
        identifier: '081473216X'
      },
      {
        type: 'ISBN_13',
        identifier: '9780814732168'
      }
    ],
    readingModes: {
      text: true,
      image: false
    },
    pageCount: 288,
    printType: 'BOOK',
    categories: ['Performing Arts'],
    maturityRating: 'NOT_MATURE',
    allowAnonLogging: true,
    contentVersion: '0.6.4.0.preview.2',
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false
    },
    imageLinks: {
      smallThumbnail: 'http://books.google.com/books/content?id=1wy49i-gQjIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      thumbnail: 'http://books.google.com/books/content?id=1wy49i-gQjIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api'
    },
    language: 'en',
    previewLink: 'http://books.google.com/books?id=1wy49i-gQjIC&printsec=frontcover&dq=satire&hl=&cd=3&source=gbs_api',
    infoLink: 'https://play.google.com/store/books/details?id=1wy49i-gQjIC&source=gbs_api',
    canonicalVolumeLink: 'https://market.android.com/details?id=book-1wy49i-gQjIC',
    id: '1wy49i-gQjIC',
    shelf: 'read'
  };

  const setup = {
    match: {
      params: {
        id: '1wy49i-gQjIC',
      }
    },
    onGet: jest.fn(() => {
      return new Promise((resolve, reject) => {
        const book = fakeBook;
        resolve(book);
      });
    }),
  };

  it('renders successfully when onGet fails', () => {
    expect(() => {
      shallow(
        <BookDetails {...setup} />
      );
    }).not.toThrow();
  });

  it('renders successfully', () => {
    const bogusSetup = {
      ...setup,
      onGet: jest.fn(() => {
        return new Promise((resolve, reject) => {
          const book = fakeBook;
          reject(book);
        });
      }),
    };
    expect(() => {
      shallow(
        <BookDetails {...bogusSetup} />
      );
    }).not.toThrow();
  });
});
