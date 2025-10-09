const User = require('../dataBase/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

let refreshTokens = [];

// Register new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) return res.status(400).json({ message: 'Username or email already exists' });

        const hashPassword = await bcrypt.hash(password, 10);
        const countUser = await User.countDocuments();
        const roleUser = countUser === 0 ? 'admin' : 'user';

        const newUser = new User({
            username,
            email,
            password,  //: hashPassword
            role: roleUser
        });

        await newUser.save();
        res.status(201).json({ 
            message: 'User registered successfully', 
            user: { username: newUser.username, email: newUser.email, role: newUser.role } 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        const refreshToken = crypto.randomBytes(40).toString('hex');
        refreshTokens.push({ token: refreshToken, userId: user._id });

        res.json({ message: 'Login successful', token, refreshToken });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Refresh token
const refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Refresh token required' });

    const stored = refreshTokens.find(rt => rt.token === token);
    if (!stored) return res.status(400).json({ error: 'Invalid refresh token' });

    const user = await User.findById(stored.userId);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const accessToken = jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ accessToken });
};

// Forgot password
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: http://localhost:5000/auth/reset-password/${token}`
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent' });
};

// Reset password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password successfully reset' });
};

module.exports = { login, register, refreshToken, forgotPassword, resetPassword };
