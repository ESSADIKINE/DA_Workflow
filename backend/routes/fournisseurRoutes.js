import express from 'express';
import { getAllFournisseurs, searchFournisseur, getFournisseurByARDesign } from '../controllers/fournisseurController.js';
const router = express.Router();

router.get('/fournisseurs', getAllFournisseurs);
router.get('/fournisseurs/search', searchFournisseur);
router.get('/fournisseurs/article', getFournisseurByARDesign);

export default router;
