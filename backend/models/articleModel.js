import getConnection from '../config/db.js';
import sql from 'mssql';

export const getAllArticlesFromDB = async () => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT [AR_Ref], [AR_Design], [FA_CodeFamille], [AR_UnitePoids], 
                   [AR_PoidsNet], [AR_PoidsBrut], [AR_UniteVen], [AR_SuiviStock], 
                   [AR_Nomencl], [AR_CodeBarre], [AR_Nature], [cbMarq], 
                   [cbModification], [cbCreation]  
            FROM [DSTM].[dbo].[F_ARTICLE]
        `;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET ALL ARTICLES: ${err.message}`);
        throw new Error('Database error during fetching all articles');
    }
};

export const updateArticleInDB = async (id, article) => {
    try {
        const { AR_Design, AR_PoidsNet } = article;
        const pool = await getConnection();
        const query = `
            UPDATE F_ARTICLE
            SET AR_Design = @AR_Design, AR_PoidsNet = @AR_PoidsNet
            WHERE AR_Ref = @AR_Ref
        `;
        const result = await pool.request()
            .input('AR_Ref', sql.NVarChar, id)
            .input('AR_Design', sql.NVarChar, AR_Design)
            .input('AR_PoidsNet', sql.Float, AR_PoidsNet)
            .query(query);
        return result;
    } catch (err) {
        console.log(`MODEL UPDATE ARTICLE: ${err.message}`);
        throw new Error('Database error during article update');
    }
};

export const searchArticlesInDB = async (key) => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT [AR_Ref], [AR_Design], [FA_CodeFamille], [AR_UnitePoids], 
                   [AR_PoidsNet], [AR_PoidsBrut], [AR_UniteVen], [AR_SuiviStock], 
                   [AR_Nomencl], [AR_CodeBarre], [AR_Nature], [cbMarq], 
                   [cbModification], [cbCreation]
            FROM F_ARTICLE
            WHERE AR_Ref LIKE @key OR AR_Design LIKE @key
        `;
        const result = await pool.request()
            .input('key', sql.NVarChar, `%${key}%`)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL SEARCH ARTICLES: ${err.message}`);
        throw new Error('Database error during article search');
    }
};

export const getArticlesByFournisseurFromDB = async (fournisseurId) => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT A.[AR_Ref], A.[AR_Design], C.CT_Nom, C.CT_Prenom, C.CT_EMail AS LC_Email
            FROM F_ARTICLE A
            JOIN F_ARTFOURNISS AF ON A.AR_Ref = AF.AR_Ref
            JOIN F_CONTACTT C ON AF.CT_Num = C.CT_Num
            WHERE C.CT_Num = @fournisseurId
        `;
        const result = await pool.request()
            .input('fournisseurId', sql.NVarChar, fournisseurId)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET ARTICLES BY FOURNISSEUR: ${err.message}`);
        throw new Error('Database error during fetching articles by fournisseur');
    }
};
