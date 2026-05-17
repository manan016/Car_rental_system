import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, enum: ['economy', 'sedan', 'suv', 'luxury'], required: true },
    price_per_day: { type: Number, required: true },
    transmission: { type: String, enum: ['Auto', 'Manual'], required: true },
    fuel_type: { type: String, enum: ['Petrol', 'Hybrid', 'Electric', 'Diesel'], required: true },
    image_url: { type: String },
    status: { type: String, enum: ['Available', 'Booked', 'Maintenance'], default: 'Available' },
}, { timestamps: true });

export default mongoose.model('Car', carSchema);
