const mongoose = require('mongoose');
const { Schema } = mongoose;

const RequiredString = {
    type: String,
    required: true
};

const schema = new Schema({
    title: RequiredString,
    genre: String,
    year: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    director: RequiredString,
    starring: [String]
});

module.exports = mongoose.model('Movies', schema);