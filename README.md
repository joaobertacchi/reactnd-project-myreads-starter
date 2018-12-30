# MyReads Project

<div align="center">

[![CircleCI](https://img.shields.io/circleci/project/github/joaobertacchi/reactnd-project-myreads-starter/master.svg)](https://circleci.com/gh/joaobertacchi/workflows/reactnd-project-myreads-starter/tree/master)
[![Coverage Status](https://img.shields.io/codecov/c/github/joaobertacchi/reactnd-project-myreads-starter/master.svg)](https://codecov.io/gh/joaobertacchi/reactnd-project-myreads-starter/branch/master)

</div>

MyReads is a React SPA for tracking book reading interest, books currently being read, and books that have already been read. It has the following 3 routes:

* **/** : Show 3 book lists: "Currently Reading", "Want to Read", and "Read". For each listed book, it's possible to move it from its currently list to another list or remove it from all the lists (move to None).

* **/search?q=** : Search for books using a backend service. Found books can be added to one of the 3 book lists: "Currently Reading", "Want to Read", and "Read". If a found book is already in one of the 3 lists, the current book list must be selected.

* **/books/:id** : Show detailed information for book with id :id.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`
* run tests with `npm test`
* create coverage report with `npm test -- --coverage`
* build project for production with `npm build`

## What You're Getting

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Project additions

The following additional features were added to the project:

* **DebounceInput**: used *react-debounce-input* package in BookSearch component to solve a bug in the change input handler. Queries for empty string '' don't need to be forwarded to the search backend service and, therefore, return earlier than non-empty requests. In special situations, late responses from the backend service inadvertently changed the component state. Its usage also reduce network traffic.
* **If component**: idea presented in an online session. If component that is responsible for rendering/not rendering its child based on test props.
* **BookDetails component**: show additional book information in /books/:id route. Back button returns to the previous page.
* **Loading**: used *react-loading* package to show visual feedback to user when calling BooksAPI at /search and /books/:id pages. It is used in conjunction with the If component described above.
* **Search query in browser path**: improved BookSearch component to update /search?q=term path to the searched term.
* **Tests**: used jest and enzyme as explained in an online session. All developed components have more than 80% of code coverage.
* **ESLint**: it was configured to enforce Udacity's JavaScript code style.
* **Continuous Integration**: *CircleCI* was configured to run the tests, create coverage report, and upload it to *Codecov.io*. It was also configured to build the project.
* **Badges**: build status and code coverage badges were configured to show in README.md.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
