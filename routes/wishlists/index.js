import express from 'express';
import { addMovie, getMovies, getMovieById, updateMovie, deleteMovie, toggleWatch } from './controller.js'
import { authenticateUser } from '../../middelwares/jwt.js';

const router = express.Router();

router.post('/addWishlist', authenticateUser, addMovie);
router.get('/getWishlists', authenticateUser, getMovies);
router.get('/getWishlistById/:id', authenticateUser, getMovieById);
router.put('/:id', authenticateUser, updateMovie);
router.delete('/deleteWishlist/:id', authenticateUser, deleteMovie);
router.put('/toggelWatch/:id', authenticateUser, toggleWatch);

export default router;