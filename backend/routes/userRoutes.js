import express from 'express';
import { getCollaborators, addCollaborator, updateCollaborator, searchCollaborator, deleteCollaborator } from '../controllers/userController.js';
import { isAdmin, isDG, isAchteur, isMagasinier, isDemandeur } from '../utils/middleware.js';

const router = express.Router();

router.get('/collaborators', isAdmin, getCollaborators);
router.post('/collaborators', isAdmin, addCollaborator);
router.put('/collaborators/:id', isAdmin, updateCollaborator);
router.delete('/collaborators/:id', isAdmin, deleteCollaborator);
router.get('/collaborators/search', isAdmin, searchCollaborator);

export default router;
