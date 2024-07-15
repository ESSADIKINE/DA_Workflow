import express from 'express';
import { signup, login, logout, protect, getUsers } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/users', getUsers);  // Add this line to get all users

router.use(protect);

export default router;
