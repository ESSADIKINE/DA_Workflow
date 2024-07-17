import express from 'express';
import { getAllArticles, editArticle, searchArticle, getArticlesByFournisseur } from '../controllers/articleController.js';
const router = express.Router();

router.get('/articles', getAllArticles);
router.put('/articles/:id', editArticle);
router.get('/articles/search', searchArticle);
router.get('/articles/fournisseur/:fournisseurId', getArticlesByFournisseur);

export default router;
