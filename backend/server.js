import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import carRoutes from './routes/carRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import connectDB from './config/db.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Global Middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || true, // Reflect the request origin or use env
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); // Body parser

// Test DB Connection
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', db: 'MongoDB Connected' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cars', carRoutes);
app.use('/api/v1/bookings', bookingRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 [Server] Enterprise backend is running on port ${PORT}`);
});
