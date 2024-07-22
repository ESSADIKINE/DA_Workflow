import express from 'express';
import { getAllArticles, editArticle, searchArticle, getArticlesByFournisseur, getArticlesInStock } from '../controllers/articleController.js';
const router = express.Router();

router.get('/articles', getAllArticles);
router.put('/articles/:id', editArticle);
router.get('/articles/search', searchArticle);
router.get('/articles/fournisseur/:fournisseurId', getArticlesByFournisseur);
router.get('/articles/stock', getArticlesInStock);
export default router;
