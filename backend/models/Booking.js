import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);
