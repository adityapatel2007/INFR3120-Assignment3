
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

exports.showAddForm = (req, res) => {
    res.render('movies/new', {
        title: 'Add Movie',
        error: null,
        formData: {}
    });
};

exports.createMovie = async (req, res, next) => {
    try {
        const {
            title,
            genre,
            releaseYear,
            director,
            watchStatus,
            rating,
            description
        } = req.body;

        const movie = new Movie({
            title,
            genre,
            releaseYear,
            director,
            watchStatus,
            rating: rating === '' || rating == null
                ? null
                : Number(rating),
            description
        });

        await movie.save();

        res.redirect('/movies');

    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).render('movies/new', {
                title: 'Add Movie',
                error: 'Please check your movie details and try again.',
                formData: req.body
            });
        }

        next(error);
    }
};