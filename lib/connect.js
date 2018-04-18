const mongoose = require('mongoose');

module.exports = function(dbUri) {

    const promise = mongoose.connect(dbUri);

    mongoose.connection.on('connection', () => {
        console.log('Mongoose connection open!!!!');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error', err);
    });

    mongoose.connection.on('disconnect', () => {
        console.log('Mongoose has been disconnected');
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose log connection closed. It is the apps fault');
        });
    });
    return promise;
};

