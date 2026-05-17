import express from 'express';
import { createBooking, getMyBookings, getAllBookings, updateBookingStatus } from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/me', protect, getMyBookings);
router.get('/', protect, admin, getAllBookings); // Admin only
router.patch('/:id/status', protect, admin, updateBookingStatus); // Admin only

export default router;
