const articleModel = require('../models/articleModel');

const getArticles = async (req, res) => {
    try {
        const articles = await articleModel.getAllArticles();
        res.json(articles);
    } catch (err) {
        res.status(500).send('SQL Server query error: ' + err.message);
    }
};

module.exports = {
    getArticles
};
