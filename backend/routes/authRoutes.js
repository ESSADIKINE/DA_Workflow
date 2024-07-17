import express from 'express';
import { signup, login, logout, protect} from '../controllers/authController.js';
import { isDG, isAdmin, isAchteur, isMagasinier, isDemandeur } from '../utils/middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.use(protect);

export default router;
