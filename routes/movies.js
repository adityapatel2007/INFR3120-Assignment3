const express = require('express');
const router = express.Router();

const movieController = require('../controllers/movieController');

router.get('/', movieController.getAllMovies);

router.get('/new', movieController.showAddForm);

router.post('/', movieController.createMovie);

router.get('/:id/edit', movieController.showEditForm);

router.post('/:id/edit', movieController.updateMovie);

router.post('/:id/delete', movieController.deleteMovie);

module.exports = router;