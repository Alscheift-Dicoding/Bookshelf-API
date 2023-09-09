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
];

module.exports = routes;
