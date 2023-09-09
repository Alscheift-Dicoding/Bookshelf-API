/* eslint-disable no-unused-vars */
const {
    addBookHandler,
    getBooksHandler,
    getBookDetailHandler,
    editBookHandler,
    deleteBookHandler,
} = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookDetailHandler,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: editBookHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookHandler,
    },
];

module.exports = routes;
