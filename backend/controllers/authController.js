import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Generate JWT Token
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log('[Register] Attempt:', { name, email });
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('[Register] User already exists:', email);
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role: 'user' });
        console.log('[Register] User created successfully:', user._id);

        if (user) {
            const token = generateToken(user._id, user.role);
            res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('[Register] ERROR:', error.message, error.stack);
        res.status(500).json({ success: false, message: error.message || 'Registration failed' });
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id, user.role);
            res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (user) {
            res.json({ success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};
