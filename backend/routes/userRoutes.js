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

router.use(protect);

router.get('/users', isAdmin, getUsers);
router.post('/users', isAdmin, addUser);
router.put('/users/:id', isAdmin, updateUser);
router.get('/users/search', isAdmin, searchUser);
router.delete('/users/:id', isAdmin, deleteUser);
router.patch('/users/:id/password', isAdmin, updatePassword);

router.put('/users/me', updateMyProfile);

router.get('/users', isAchteur, getUsers);
router.get('/users/search', isAchteur, searchUser);

export default router;
