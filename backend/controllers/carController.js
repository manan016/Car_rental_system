import Car from '../models/Car.js';

export const getCars = async (req, res, next) => {
    try {
        const { category } = req.query;
        const query = (category && category !== 'all') ? { category } : {};

        const cars = await Car.find(query);
        res.json({ success: true, count: cars.length, data: cars });
    } catch (error) {
        next(error);
    }
};

export const getCarById = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }
        res.json({ success: true, data: car });
    } catch (error) {
        next(error);
    }
};

export const createCar = async (req, res, next) => {
    try {
        const { name, brand, category, price_per_day, transmission, fuel_type, image_url } = req.body;
        
        const car = await Car.create({
            name, brand, category, price_per_day, transmission, fuel_type, image_url, status: 'Available'
        });

        res.status(201).json({ success: true, message: 'Car added successfully', carId: car._id });
    } catch (error) {
        next(error);
    }
};
