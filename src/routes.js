const { addBookHandler, getAllBooksHandler } = require('./handler');

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    }
]

module.exports = routes;