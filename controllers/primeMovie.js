var mongoose = require('mongoose');
var primeMovie = require('../models/primeMovie');
var request = require('requestretry');
var config = require('../config');

var amazonApiOptions = config.amazonApi;

var omdbApiOptions = config.omdbApi;
var tmdbApiOptions = config.tmdb;
var timer = 0;
var movieInterval;


var retryStrategy = function (err, response) {
    var  resultsLength = 0;
    if (response && response.body) {
      resultsLength = response.body.results ? response.body.results.length : 0;
    }
    return err || response.statusCode === 502 || resultsLength === 0;
};

module.exports.controller = function (app) {
  clearInterval(movieInterval);
  setInterval(function () {
    console.log('ASDADASDKASDKASDMADKASKDASMDAMSDA--------------')
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
                          movieInterval = setInterval(function () {
                          var strippedMovieTitle = movie.title.replace(/ *\([^)]*\) */g, ""); //strip anything between '()'
                          strippedMovieTitle = strippedMovieTitle.replace(/ *\[[^)]*\] */g, ""); //strip anything between '[]'
                          request({
                              url: omdbApiOptions.movieByTitleYear + strippedMovieTitle + (movie.year ? '&y=' + movie.year : ''),
                              method: 'GET',
                              json: true
                          }, function (error, response, omdbMovieBody) {
                              if (error) {
                                  console.log('error', error);
                              }
                              else if (response.statusCode !== 200) {
                                  console.log('Errors: ', response.statusCode);
                              }
                              else {
                                if (omdbMovieBody.Error) {
                                  console.log('error', omdbMovieBody.Error);
                                  return;
                                }
                                getMovieTrailers(omdbMovieBody.imdbID, omdbMovieBody);
                            }
                          });
                        }, timer += 3000);
                      });
                  }
              });
            }
          }
        }, 1000 * 60 * 60 * 4);


  getMovieTrailers = function(imdbID, omdbMovieBody) {
    try {
      request({
        url: tmdbApiOptions.movieByImdbId + imdbID + '?external_source=imdb_id&api_key=' + tmdbApiOptions.apiKey,
        method: 'GET',
        json: true
      }, function (error, response, movieData) {
          if (error) {
              console.log('error connecting to movieDB.', error);
          }
          else if (response.statusCode !== 200) {
              console.log('Errors: ', response.statusCode);
          }
          else {
              if (!movieData.movie_results[0] || !movieData.movie_results[0].id) {
                  console.log('error no movie results');
                  return;
              }
              getMovieTrailersByTmdbId(movieData.movie_results[0].id, omdbMovieBody);
          }
      });
    } catch(e) {
      console.log('getMovieTrailers', e);
    }
  };

  getMovieTrailersByTmdbId = function (id, omdbMovieBody) {
    try {
      request({
        url: tmdbApiOptions.movieByMovieId + id + '/videos?api_key=' + tmdbApiOptions.apiKey,
        method: 'GET',
        json: true
      }, function (error, response, movieTrailersData) {
          if (error) {
              console.log('error connecting to movieDB.', error);
          }
          else if (response.statusCode !== 200) {
              console.log('Errors: ', response.statusCode);
          }
          else {
              if (!movieTrailersData.results[0] || !movieTrailersData.results[0].key) {
                  console.log('error', movieTrailersData.Error);
                  return;
              }
              console.log('movie trailers', movieTrailersData.results[0]);
              omdbMovieBody.trailers = {};
              omdbMovieBody.trailers.videoKey = movieTrailersData.results[0].key;
              omdbMovieBody.trailers.videoType = movieTrailersData.results[0].site;
              addMovieToDb(omdbMovieBody);
          }
      });
    } catch (e) {
      console.log('getMovieTrailersByTmdbId', e);
    }
  };

  addMovieToDb = function(body) {
    if (body.imdbRating == 'N/A' || body.genre == 'N/A' || body.rottenMeter == 'N/A' || body.Poster == 'N/A') {
         return;
    }
    var movieEntry;
    var dateNow = new Date();
    try {
      console.log('PRIME MOVIE');
        movieEntry = primeMovie.find({"title": body.Title, "year": body.Year}, function (error, data) {
          if (error) {
            console.log(error, movieEntry);
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
               poster: body.Poster,
               vendor: 'AmazonPrime',
               recentlyAdded: false,
               imdbId: body.imdbID,
               trailers: body.trailers,
               updated: dateNow
              });
              movieEntry.save();
              console.log('success', movieEntry);
          }
        });

    } catch (e) {
        console.log(e);
    }
  };
};
