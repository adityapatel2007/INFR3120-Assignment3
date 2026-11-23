const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    genre: {
        type: String,
        required: true,
        enum: [
            'Action',
            'Adventure',
            'Comedy',
            'Drama',
            'Horror',
            'Sci-Fi',
            'Romance',
            'Thriller',
            'Animation',
            'Other'
        ]
    },

    releaseYear: {
        type: Number,
        required: true,
        min: 1888,
        max: 2100
    },

    director: {
        type: String,
        trim: true,
        maxlength: 100
    },

    watchStatus: {
        type: String,
        enum: [
            'Want to Watch',
            'Watching',
            'Watched'
        ],
        default: 'Want to Watch'
    },

    rating: {
        type: Number,
        min: 1,
        max: 10,
        default: null
    },

    description: {
        type: String,
        trim: true,
        maxlength: 1000
    }

}, {
    timestamps: true
});
module.exports = mongoose.model('Movie', movieSchema);