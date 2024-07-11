const { poolPromise } = require('../config/db');

const getAllArticles = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM [DSTM].[dbo].[F_ARTICLE]');
    return result.recordset;
};

module.exports = {
    getAllArticles
};
