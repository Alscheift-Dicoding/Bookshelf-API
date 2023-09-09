/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');
const books = require('./books');

const getCurrentDateString = (a) => new Date().toISOString();
const findBook = (bookId) => books.find((book) => book.id === bookId);

function createBook(bookData) {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = bookData;

    const id = nanoid(16);
    const finished = (pageCount === readPage);
    const insertedAt = getCurrentDateString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    return id;
}

// Kriteria 3 : API dapat menyimpan buku
const addBookHandler = (request, h) => {
    const bookData = request.payload;

    if (!bookData.name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400);
    }

    if (bookData.pageCount < bookData.readPage) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const bookId = createBook(bookData);

    if (findBook(bookId)) {
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId,
            },
        }).code(201);
    }

    return h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku.',
    }).code(500);
};

// Kriteria 4 : API dapat menampilkan seluruh buku
const getBooksHandler = (request, h) => h.response({
    status: 'success',
    data: {
        books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        })),
    },
}).code(200);

// Kriteria 5 : API dapat menampilkan detail buku
const getBookDetailHandler = (request, h) => {

};

// Kriteria 6 : API dapat mengubah data buku
const editBookHandler = (request, h) => {

};

// Kriteria 7 : API dapat menghapus buku
const deleteBookHandler = (request, h) => {

};

module.exports = {
    addBookHandler,
    getBooksHandler,
    getBookDetailHandler,
    editBookHandler,
    deleteBookHandler,
};
