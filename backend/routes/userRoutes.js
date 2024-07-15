import express from 'express';
import { protect } from '../controllers/authController.js';

import { addCollaborator,
        updateCollaborator,
        searchCollaborator,
        getCollaborators } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getCollaborators);
router.post('/collaborators', addCollaborator);
router.put('/collaborators/:id', updateCollaborator);
router.get('/collaborators/search', searchCollaborator);
router.use(protect);



export default router;
