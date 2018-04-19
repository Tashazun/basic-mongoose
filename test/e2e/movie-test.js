const { assert } = require('chai');
const request = require('./request');
const Movie = require('../../lib/models/movie');
const { dropCollection } = require('./db');

describe('E2E for Movies', () => {


    before(() => dropCollection('movies'));

    let test1 = {
        title: '8mm',
        genre: 'thriller',
        year: 1999,
        rating: 6,
        director: 'Joel Schumacher',
        starring: ['Nicholas Cage, Joaquin Pheonix, James Gandolfini']
    };
    
    let test2 = {
        title: 'Hanna',
        genre: 'thriller',
        year: 2011,
        rating: 7,
        director: 'Joe Wright',
        starring: ['Saoirse Ronan, Eric Bana, Cate Blanchett']
    };

    it('posts a movie', () => {
        return request.post('/movies')
            .send(test1)
            .then(({ body }) => {
                test1 = body;
                assert.deepEqual(body, { _id: test1._id, ...test1 });
            });
    });

    const comeback = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets movie by assigned id', () => {
        return Movie.create(test2).then(comeback)
            .then(save => {
                test2 = save;
                return request.get(`/movies/${test2._id}`)
                    .then(({ body }) => {
                        assert.deepEqual(body, test2);
                    });
            });
    });

    const fields = ({ _id, director }) => ({ _id, director });

    it('gets specific fields', () => {
        return request.get('/movies')
            .then(({ body }) => {
                assert.deepEqual(body, [test1, test2].map(fields));
            });
    });
});