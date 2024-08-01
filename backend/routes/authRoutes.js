import express from 'express';
import { login, logout, signUp, sendOTP, verifyOTP } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.post('/signup', signUp);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
