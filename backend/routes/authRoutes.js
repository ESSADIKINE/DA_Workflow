import express from 'express';
import { login, logout, sendOTP, verifyOTPAndSignup, checkEmailExists } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);
router.post('/check-email', checkEmailExists);
router.post('/send-otp', sendOTP);
router.post('/verify-otp-signup', verifyOTPAndSignup);

export default router;
