
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

exports.showEditForm = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        res.render('movies/edit', {
            title: 'Edit Movie',
            movie: movie,
            error: null
        });

    } catch (error) {
        next(error);
    }
};

exports.updateMovie = async (req, res, next) => {
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

        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).send('Movie not found');
        }

        // Update movie information
        movie.title = title;
        movie.genre = genre;
        movie.releaseYear = releaseYear;
        movie.director = director;
        movie.watchStatus = watchStatus;
        movie.rating = rating === '' || rating == null
            ? null
            : Number(rating);
        movie.description = description;

        await movie.save();

        res.redirect('/movies');

    } catch (error) {
        if (error.name === 'ValidationError') {
            try {
                const movie = await Movie.findById(req.params.id);

                if (!movie) {
                    return res.status(404).send('Movie not found');
                }

                // Keep submitted values when validation fails
                Object.assign(movie, req.body);

                return res.status(400).render('movies/edit', {
                    title: 'Edit Movie',
                    movie: movie,
                    error: 'Please check the movie details and try again.'
                });
            } catch (lookupError) {
                return next(lookupError);
            }
        }

        next(error);
    }
};