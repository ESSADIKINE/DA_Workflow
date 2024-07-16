import express from 'express';
import { addCollaborator, updateCollaborator, searchCollaborator, getCollaborators, deleteCollaborator } from '../controllers/userController.js';
import { updateCollaboratorPasswordById } from '../controllers/authController.js';
const router = express.Router();

router.get('/collaborators', getCollaborators);
router.post('/collaborators', addCollaborator);
router.put('/collaborators/:id', updateCollaborator);
router.get('/collaborators/search', searchCollaborator);
router.delete('/collaborators/:id', deleteCollaborator); // Add this line
router.patch('/collaborators/:id/password', updateCollaboratorPasswordById);


export default router;
