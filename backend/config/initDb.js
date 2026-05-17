import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Car from '../models/Car.js';
import Booking from '../models/Booking.js';

dotenv.config();

async function initializeDatabase() {
    console.log('⏳ Starting professional MongoDB database initialization...');
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/veloce_crms');
        console.log('✅ MongoDB connected successfully.');

        // 1. Seed Admin User
        console.log('⏳ Checking default super admin...');
        const adminExists = await User.findOne({ email: 'admin@veloce.com' });
        if (!adminExists) {
            await User.create({
                name: 'Super Admin',
                email: 'admin@veloce.com',
                password: 'Admin@1234', // Model will hash it
                role: 'admin'
            });
            console.log('✅ Admin user created (admin@veloce.com | Admin@1234).');
        } else {
            console.log('⏩ Admin already exists, skipping.');
        }

        // 2. Seed Fleet Data
        console.log('⏳ Checking professional car fleet...');
        const carsCount = await Car.countDocuments();
        if (carsCount === 0) {
            const seedCars = [
                { name: 'Toyota Corolla 2024', brand: 'Toyota', category: 'economy', price_per_day: 45, transmission: 'Auto', fuel_type: 'Petrol', image_url: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800' },
                { name: 'Honda Civic RS 2024', brand: 'Honda', category: 'sedan', price_per_day: 55, transmission: 'Auto', fuel_type: 'Petrol', image_url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800' },
                { name: 'Kia Sportage X 2024', brand: 'Kia', category: 'suv', price_per_day: 85, transmission: 'Auto', fuel_type: 'Petrol', image_url: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&q=80&w=800' },
                { name: 'BMW X5 M Sport', brand: 'BMW', category: 'luxury', price_per_day: 180, transmission: 'Auto', fuel_type: 'Hybrid', image_url: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800' },
                { name: 'Hyundai Elantra', brand: 'Hyundai', category: 'sedan', price_per_day: 50, transmission: 'Auto', fuel_type: 'Petrol', image_url: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80&w=800' },
                { name: 'Mercedes-Benz E-Class', brand: 'Mercedes', category: 'luxury', price_per_day: 220, transmission: 'Auto', fuel_type: 'Petrol', image_url: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800' },
            ];

            await Car.insertMany(seedCars);
            console.log(`✅ Seeded ${seedCars.length} cars into inventory.`);
        } else {
            console.log('⏩ Cars already exist, skipping fleet seed.');
        }

        console.log('🎉 Enterprise Database Setup Complete! You can now start the server.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Database Initialization Failed:', error);
        process.exit(1);
    }
}

initializeDatabase();
