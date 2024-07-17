import express from 'express';
import { 
  addCollaborator, 
  updateCollaborator, 
  searchCollaborator, 
  getCollaborators, 
  deleteCollaborator 
} from '../controllers/userController.js';
import { updateCollaboratorPasswordById } from '../controllers/authController.js';
import { protect, isAdmin, isAchteur } from '../utils/middleware.js';

const router = express.Router();

router.use(protect);

router.get('/collaborators', isAdmin, getCollaborators);
router.post('/collaborators', isAdmin, addCollaborator);
router.put('/collaborators/:id', isAdmin, updateCollaborator);
router.get('/collaborators/search', isAdmin, searchCollaborator);
router.delete('/collaborators/:id', isAdmin, deleteCollaborator);
router.patch('/collaborators/:id/password', isAdmin, updateCollaboratorPasswordById);

export default router;
