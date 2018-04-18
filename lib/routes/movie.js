const router = require('express').Router();
const Movies = require('../models/Movie');
const errHandler = require('../errHandler');

module.exports = router
    .post('/', (req, res) => {
        Movies.create(req.body)
            .then(movie => res.json(movie))
            .catch(err => errHandler(err, req, res));
    });