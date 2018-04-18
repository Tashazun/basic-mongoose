const { assert } = require('chai');
const Movie = require('../../lib/models/Movie');

describe('Unit Testing', () => {
    
    it('valid model structure', () => {
        const input = {
            title: '8mm',
            genre: 'thriller',
            year: 1999,
            rating: 6,
            director: 'Joel Schumacher',
            starring: ['Nicholas Cage, Joaquin Pheonix, James Gandolfini']
        };
        const movie = new Movie(input);

        assert.deepEqual(movie.toJSON(), {
            _id: movie._id,
            ...input
        });
        assert.isUndefined(movie.validateSync());
    });
    
    const getValidationErrors = validation => {
        assert.isDefined(validation, 'wanted valid errors, got none.');
        return validation.errors;
    };

    it('required fields', () => {
        const movie = new Movie({});
        const errors = getValidationErrors(movie.validateSync());
        assert.equal(Object.keys(errors).length, 3);
        assert.equal(errors.title.kind, 'required');
        assert.equal(errors.year.kind, 'required');
        assert.equal(errors.director.kind, 'required');
    });
    
});