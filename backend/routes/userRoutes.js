import express from 'express';
import { 
  addUser, 
  updateUser, 
  searchUser, 
  getUsers, 
  deleteUser, 
  updateMyProfile 
} from '../controllers/userController.js';
import { updatePassword } from '../controllers/authController.js';
import { protect, isAdmin, isAchteur } from '../utils/middleware.js';

const router = express.Router();

// Apply the protect middleware to all routes
router.use(protect);

// Routes for admin
router.get('/users', isAdmin, getUsers);
router.post('/users', isAdmin, addUser);
router.put('/users/:id', isAdmin, updateUser);
router.get('/users/search', isAdmin, searchUser);
router.delete('/users/:id', isAdmin, deleteUser);
router.patch('/users/:id/password', isAdmin, updatePassword);

// Route for updating own profile
router.put('/users/me', updateMyProfile);

// Routes for acheteur (example, can be adjusted based on requirements)
router.get('/users', isAchteur, getUsers);
router.get('/users/search', isAchteur, searchUser);

export default router;
