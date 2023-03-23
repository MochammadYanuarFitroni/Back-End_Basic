const books = require('./bookshelf');
const { nanoid } = require('nanoid');

const isreading = (pageCount, readPage) => {
    if (pageCount > readPage) {
        return true;
    }
    return false;
}

// add/save book (POST)
const addBookHandler = (request, h) => {
    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const isfinished = (pageCount, readPage) => {
        if (pageCount === readPage) {
            return true;
        }
        return false;
    }
    const finished = isfinished(pageCount, readPage);
    const reading = isreading(pageCount, readPage);

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
    }

    if (newBook.name === "") {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }
    else if (newBook.readPage > newBook.pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }
    else{
        books.push(newBook);
    }

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// view all books (GET)
const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },
});

module.exports = { addBookHandler, getAllBooksHandler };