import getConnection from '../config/dbsql.js';
import sql from 'mssql';

export const getAllFournisseursFromDB = async () => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT DISTINCT AF.CT_Num, C.[CT_Nom], C.[CT_Prenom], C.[CT_EMail],C.[CT_Telephone],C.[CT_TelPortable],C.[CT_Telecopie]
            FROM F_ARTFOURNISS AF 
            JOIN F_CONTACTT C ON AF.CT_Num = C.CT_Num
            ORDER BY CT_Num
        `;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET ALL FOURNISSEURS: ${err.message}`);
        throw new Error('Database error during fetching all fournisseurs');
    }
};

export const searchFournisseurFromDB = async (key) => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT DISTINCT AF.[CT_Num], C.[CT_Nom], C.[CT_Prenom], C.[CT_EMail],C.[CT_Telephone],C.[CT_TelPortable],C.[CT_Telecopie]
            FROM F_ARTFOURNISS AF
            JOIN F_CONTACTT C ON AF.CT_Num = C.CT_Num
            WHERE CT_Nom LIKE @key OR CT_Prenom LIKE @key OR C.CT_Num LIKE @key
            ORDER BY CT_Num
        `;
        const result = await pool.request()
            .input('key', sql.NVarChar, `%${key}%`)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL SEARCH FOURNISSEUR: ${err.message}`);
        throw new Error('Database error during searching fournisseur');
    }
};

export const getFournisseurByARDesignFromDB = async (AR_Design) => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT DISTINCT AF.[CT_Num], C.[CT_Nom], C.[CT_Prenom], C.[CT_EMail], C.[CT_Telephone], C.[CT_TelPortable], C.[CT_Telecopie], A.[AR_Design]
            FROM F_ARTICLE A
            JOIN F_ARTFOURNISS AF ON A.AR_Ref = AF.AR_Ref
            JOIN F_CONTACTT C ON AF.CT_Num = C.CT_Num
            WHERE A.[AR_Design] LIKE @AR_Design
            ORDER BY AF.CT_Num, A.[AR_Design]
        `;
        const result = await pool.request()
            .input('AR_Design', sql.NVarChar, `%${AR_Design}%`)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET FOURNISSEUR BY AR_DESIGN: ${err.message}`);
        throw new Error('Database error during fetching fournisseur by AR_Design');
    }
};
