const books = require('./bookshelf');

const getAllBooksHandler = () => ({
    status: 'success',
    data: {
        books,
    },
});

module.exports = { getAllBooksHandler };