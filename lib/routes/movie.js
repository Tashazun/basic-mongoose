const router = require('express').Router();
const Movies = require('../models/movie');
const errHandler = require('../errHandler');

module.exports = router
    .post('/', (req, res) => {
        Movies.create(req.body)
            .then(movie => res.json(movie))
            .catch(err => errHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Movies.findById(id)
            .lean()
            .then(movie => {
                if(!movie) {
                    errHandler({
                        status: 404,
                        error: `The movie by id ${id} was not found.`
                    }, req, res);
                }
                res.json(movie);
            });
    })

    .get('/', (req, res) => {
        Movies.find(req.query)
            .lean()
            .select('director')
            .then(movies => res.json(movies))
            .catch(err => errHandler(err, req, res));
    });