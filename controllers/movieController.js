const Movie = require('../models/Movie');

exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find()
            .sort({ createdAt: -1 });

        res.render('movies/index', {
            title: 'Movie Library',
            movies: movies
        });
    } catch (error) {
        next(error);
    }
};