import express from 'express';
import { getCars, getCarById, createCar } from '../controllers/carController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCars);
router.get('/:id', getCarById);
router.post('/', protect, admin, createCar); // Only admins can add cars

export default router;
