import Booking from '../models/Booking.js';
import Car from '../models/Car.js';

export const createBooking = async (req, res, next) => {
    try {
        const { car_id, start_date, end_date, total_price } = req.body;
        const user_id = req.user.id;

        const booking = await Booking.create({
            user_id, car_id, start_date, end_date, total_price, status: 'Pending'
        });

        res.status(201).json({ success: true, message: 'Booking requested successfully', bookingId: booking._id });
    } catch (error) {
        next(error);
    }
};

export const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find({ user_id: req.user.id })
            .populate('car_id', 'name image_url')
            .sort('-createdAt');
            
        // Map to match frontend expected structure
        const mapped = bookings.map(b => ({
            _id: b._id,
            id: b._id,
            start_date: b.start_date,
            end_date: b.end_date,
            total_price: b.total_price,
            status: b.status,
            created_at: b.createdAt,
            car_name: b.car_id ? b.car_id.name : 'Unknown Car',
            car_image: b.car_id ? b.car_id.image_url : ''
        }));
        
        res.json({ success: true, count: mapped.length, data: mapped });
    } catch (error) {
        next(error);
    }
};

export const getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.find()
            .populate('car_id', 'name')
            .populate('user_id', 'name email')
            .sort('-createdAt');
            
        const mapped = bookings.map(b => ({
            _id: b._id,
            id: b._id,
            start_date: b.start_date,
            end_date: b.end_date,
            total_price: b.total_price,
            status: b.status,
            created_at: b.createdAt,
            car_name: b.car_id ? b.car_id.name : 'Unknown Car',
            user_name: b.user_id ? b.user_id.name : 'Unknown User',
            email: b.user_id ? b.user_id.email : ''
        }));

        res.json({ success: true, count: mapped.length, data: mapped });
    } catch (error) {
        next(error);
    }
};

export const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        
        if (!booking) {
             return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        res.json({ success: true, message: `Booking status updated to ${status}` });
    } catch (error) {
        next(error);
    }
};
