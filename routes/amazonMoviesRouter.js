var express = require('express');

var routes = function (Movie) {
    var amazonMoviesRouter = express.Router();
    amazonMoviesRouter.route('/amazonPrime/movies/recentlyAdded')
        .get(function (req, res) {
            Movie.find(function (err, movies) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(movies);
                }
            })
        });
    return amazonMoviesRouter;
};

module.exports = routes;