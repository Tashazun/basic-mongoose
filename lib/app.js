const express = require('express');
const app = express();
const movies = require('./routes/movie');

app.use(express.json());

app.use('/movies', movies);

module.exports = app;