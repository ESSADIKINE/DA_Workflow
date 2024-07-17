import { getAllArticlesFromDB, updateArticleInDB, searchArticlesInDB, getArticlesByFournisseurFromDB, getArticlesInStockFromDB } from '../models/articleModel.js';

export const getAllArticles = async (req, res) => {
    try {
        const articles = await getAllArticlesFromDB();
        res.status(200).json({
            status: 'success',
            data: {
                articles,
            },
        });
    } catch (err) {
        console.log(`GET ARTICLES: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const editArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = req.body;

        const result = await updateArticleInDB(id, article);
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Article updated successfully',
                result,
            },
        });
    } catch (err) {
        console.log(`UPDATE ARTICLE: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const searchArticle = async (req, res) => {
    try {
        const { key } = req.query;
        const articles = await searchArticlesInDB(key);
        res.status(200).json({
            status: 'success',
            data: {
                articles,
            },
        });
    } catch (err) {
        console.log(`SEARCH ARTICLE: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getArticlesByFournisseur = async (req, res) => {
    try {
        const { fournisseurId } = req.params;
        const articles = await getArticlesByFournisseurFromDB(fournisseurId);
        res.status(200).json({
            status: 'success',
            data: {
                articles,
            },
        });
    } catch (err) {
        console.log(`GET ARTICLES BY FOURNISSEUR: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};

export const getArticlesInStock = async (req, res) => {
    try {
        const articles = await getArticlesInStockFromDB();
        res.status(200).json({
            status: 'success',
            data: {
                articles,
            },
        });
    } catch (err) {
        console.log(`GET ARTICLES IN STOCK: ${err.message}`);
        res.status(500).json({
            status: 'fail',
            message: err.message,
        });
    }
};
