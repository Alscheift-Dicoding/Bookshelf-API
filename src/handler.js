const { nanoid } = require('nanoid');
const books = require('./books');

const getCurrentDateString = () => new Date().toISOString();
const findBook = (bookId) => books.find((book) => book.id === bookId);
const findBookIndex = (bookId) => books.findIndex((book) => book.id === bookId);

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
const getBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    let fBooks = books.map((book) => book);
    // filter by query
    if (name) fBooks = fBooks.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    if (reading) fBooks = fBooks.filter((b) => Number(b.reading) === Number(reading));
    if (finished) fBooks = fBooks.filter((b) => Number(b.finished) === Number(finished));

    return h.response({
        status: 'success',
        data: {
            books: fBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    }).code(200);
};

// Kriteria 5 : API dapat menampilkan detail buku
const getBookDetailHandler = (request, h) => {
    const { bookId } = request.params;
    const book = findBook(bookId);

    if (book) {
        return h.response({
            status: 'success',
            data: { book },
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);
};

// Kriteria 6 : API dapat mengubah data buku
const editBookHandler = (request, h) => {
    const newBookData = request.payload;
    const { bookId } = request.params;

    const book = findBook(bookId);

    if (!newBookData.name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (newBookData.pageCount < newBookData.readPage) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    // updating book
    (Object.entries(newBookData)).forEach(([key, value]) => { book[key] = value; });

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
    }).code(200);
};

// Kriteria 7 : API dapat menghapus buku
const deleteBookHandler = (request, h) => {
    const { bookId } = request.params;
    const bookIndex = findBookIndex(bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        }).code(200);
    }

    return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
};

module.exports = {
    addBookHandler,
    getBooksHandler,
    getBookDetailHandler,
    editBookHandler,
    deleteBookHandler,
};
