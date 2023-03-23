const books = require('./bookshelf');
const { nanoid } = require('nanoid');


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

    const isreading = (pageCount, readPage) => {
        if (pageCount > readPage) {
            return true;
        }
        return false;
    }
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
                bookId: id,
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
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished} = request.query;
    
    if(name){
        const response = h.response({
            status: 'success',
            data: {
                books: books
                .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
                .map((newbook) => ({
                    id: newbook.id,
                    name: newbook.name,
                    publisher: newbook.publisher
                }))
            },
        });
        response.code(200)
        return response
    }
    else if(reading === "1" && finished === "0"){
        const response = h.response({
            status: 'success',
            data: {
                books: books
                .filter((book) => book.reading === true && book.finished === false)
                .map((newbook) => ({
                    id: newbook.id,
                    name: newbook.name,
                    publisher: newbook.publisher
                }))
            },
        });
        response.code(200)
        return response
    }
    else if(reading === "0" && finished === "1"){
        const response = h.response({
            status: 'success',
            data: {
                books: books
                .filter((book) => book.reading === false && book.finished === true)
                .map((newbook) => ({
                    id: newbook.id,
                    name: newbook.name,
                    publisher: newbook.publisher
                }))
            },
        });
        response.code(200)
        return response
    }
    else{
        const response = h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        });
        response.code(200)
        return response
    }
};

module.exports = { addBookHandler, getAllBooksHandler };