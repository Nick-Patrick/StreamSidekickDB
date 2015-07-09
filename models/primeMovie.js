var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var primeMovies = new Schema({
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
    imdbId: {
      type: String
    },
    trailers: [{
      videoType: String,
      videoKey: String
    }],
    vendor: {
      type: String
    },
    updated: {
      type: Date
    }
});

module.exports = mongoose.model('primeMovies', primeMovies);
