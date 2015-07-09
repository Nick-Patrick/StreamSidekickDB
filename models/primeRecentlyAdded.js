var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var primeRecentlyAdded = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: String
    },
    genre: {
        type: String
    },
    rated: {
        type: String
    },
    released: {
        type: String
    },
    runtime: {
        type: String
    },
    director: {
        type: String
    },
    actors: {
        type: String
    },
    metascore: {
        type: String
    },
    imdbRating: {
        type: String
    },
    rottenMeter: {
        type: String
    },
    poster: {
        type: String
    },
    recentlyAdded: {
        type: Boolean,
        default: false
    },
    vendor: {
      type: String
    },
    updated: {
      type: Date
    }
});

module.exports = mongoose.model('PrimeRecentlyAddedMovies', primeRecentlyAdded);
