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
                assert.deepEqual(body, [test1]);
                test1 = body;
            });
    });

});