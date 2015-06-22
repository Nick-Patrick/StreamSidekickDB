var mongoose = require('mongoose');
var primeMovie = require('../models/primeMovie');
var request = require('requestretry');
var config = require('../config');

var amazonApiOptions = config.amazonApi;

var omdbApiOptions = config.omdbApi;

var retryStrategy = function (err, response) {
    var  resultsLength = 0;
    if (response && response.body) {
      resultsLength = response.body.results ? response.body.results.length : 0;
    }
    return err || response.statusCode === 502 || resultsLength === 0;
};

module.exports.controller = function (app) {
  setInterval(function () {
    for (var movieUrl in config.amazonApi.movies) {
        if (config.amazonApi.movies.hasOwnProperty(movieUrl)) {
            request({
                url: config.amazonApi.movies[movieUrl],
                method: 'GET',
                json: true,
                maxAttempts: 10,
                retryDelay: 5000,
                retryStrategy: retryStrategy
            }, function (error, response, body) {
                if (error) {
                    console.log('error', error);
                }
                else if (response.statusCode !== 200) {
                    console.log('Error: ', response.statusCode);
                }
                else {
                    if (body['results'].length === 0) {
                        console.log('no results returned');
                    }
                    body['results'].forEach(function (movie) {
                        var strippedMovieTitle = movie.title.replace(/ *\([^)]*\) */g, ""); //strip anything between '()'
                        strippedMovieTitle = strippedMovieTitle.replace(/ *\[[^)]*\] */g, ""); //strip anything between '[]'

                        console.log(omdbApiOptions.movieByTitleYear + strippedMovieTitle + (movie.year ? '&y=' + movie.year : ''));
                        request({
                            url: omdbApiOptions.movieByTitleYear + strippedMovieTitle + (movie.year ? '&y=' + movie.year : ''),
                            method: 'GET',
                            json: true
                        }, function (error, response, body) {
                            if (error) {
                                console.log('error', error);
                            }
                            else if (response.statusCode !== 200) {
                                console.log('Errors: ', response.statusCode);
                            }
                            else {
                                if (body.Error) {
                                    console.log('error', body.Error);
                                    return;
                                }
                                var movieEntry;
                                if (body.imdbRating == 'N/A' || body.genre == 'N/A' || body.rottenMeter == 'N/A' || body.Poster == 'N/A') {
                                     return;
                                } else {
                                    try {
                                        movieEntry = primeMovie.find({"title": body.Title, "year": body.Year}, function (error, data) {
                                            if (error) {
                                                console.log(error);
                                            }
                                            if (data && data.length === 0) {
                                                movieEntry = new primeMovie({
                                                    title: body.Title,
                                                    description: body.Plot,
                                                    year: body.Year,
                                                    genre: body.Genre,
                                                    rated: body.Rated,
                                                    released: body.Released,
                                                    runtime: body.Runtime,
                                                    director: body.Director,
                                                    actors: body.Actors,
                                                    metascore: body.Metascore,
                                                    imdbRating: body.imdbRating,
                                                    rottenMeter: body.tomatoRotten,
                                                    poster: body.Poster
                                                });
                                                movieEntry.save();
                                                console.log('success');
                                            }
                                        });

                                    } catch (e) {
                                        console.log(e);
                                    }
                                }
                            }
                        });
                    });

                }
            });
        }
    }
  }, 1000*60*60*12);
};
