import getConnection from '../config/dbsql.js';
import sql from 'mssql';

export const getAllBCInDetailsFromDB = async () => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT 
                DO_Domaine, DO_Type, CT_Num, DO_Piece, DO_Date, DL_Ligne, DO_Ref, AR_Ref, DL_Design, DL_Qte, DL_PrixUnitaire,  
                CO_No, EU_Enumere, EU_Qte, DE_No, DL_PUTTC, DL_No, DO_DateLivr, CA_Num, DL_CodeTaxe1, CA_No, Demendeur
            FROM F_DOCLIGNE 
            WHERE DO_Piece LIKE 'FBC%' 
            ORDER BY DO_Date DESC
        `;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET ALL BC IN DETAILS: ${err.message}`);
        throw new Error('Database error during fetching all BC in details');
    }
};

export const getAllBCInBriefFromDB = async () => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT 
                DO_Domaine, DO_Type, DO_Piece, DO_Date, DO_Ref, DO_Tiers, CO_No, DO_Devise, DO_Cours, DE_No, CT_NumPayeur,  
                DO_Expedit, CA_Num, DO_Coord01, DO_DateLivr, DO_Statut, DO_Heure, CA_No, DO_TotalHT, DO_DocType, DO_TotalHTNet, 
                DO_TotalTTC, DO_NetAPayer, DUM, P_BRUT
            FROM F_DOCENTETE 
            WHERE DO_Piece LIKE 'FBC%' 
            ORDER BY DO_Date DESC
        `;
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET ALL BC IN BRIEF: ${err.message}`);
        throw new Error('Database error during fetching all BC in brief');
    }
};

export const updateBCInDB = async (id, updatedBC) => {
    try {
        const pool = await getConnection();
        const query = `
            UPDATE F_DOCENTETE
            SET DO_Tiers = @DO_Tiers, DO_Date = @DO_Date, CA_Num = @CA_Num, 
                DO_Expedit = @DO_Expedit, DO_DateLivr = @DO_DateLivr, DUM = @DUM, 
                DO_Ref = @DO_Ref, DO_Coord01 = @DO_Coord01, DO_Devise = @DO_Devise
            WHERE DO_Piece = @DO_Piece
        `;    
        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar(13), id)
            .input('DO_Tiers', sql.NVarChar(17), updatedBC.DO_Tiers)
            .input('DO_Date', sql.DateTime, updatedBC.DO_Date)
            .input('CA_Num', sql.NVarChar(17), updatedBC.CA_Num)
            .input('DO_Expedit', sql.SmallInt, updatedBC.DO_Expedit)
            .input('DO_DateLivr', sql.DateTime, updatedBC.DO_DateLivr)
            .input('DUM', sql.NVarChar(69), updatedBC.DUM)
            .input('DO_Ref', sql.NVarChar(17), updatedBC.DO_Ref)
            .input('DO_Coord01', sql.NVarChar(35), updatedBC.DO_Coord01)
            .input('DO_Devise', sql.SmallInt, updatedBC.DO_Devise)
            .query(query);
        return result
    } catch (err) {
        console.log(`MODEL UPDATE BC: ${err.message}`);
        throw new Error('Database error during updating BC');
    }
};

export const updateDocLigneInDB = async (doPiece, dlLigne, updatedArticle) => {
    try {
        const pool = await getConnection();

        // Disable the trigger
        await pool.request().query("DISABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");

        const query = `
            UPDATE F_DOCLIGNE
            SET 
                CT_Num = @CT_Num,
                DO_Date = @DO_Date,
                DO_Ref = @DO_Ref,
                AR_Ref = @AR_Ref,
                DL_Design = @DL_Design,
                DL_Qte = @DL_Qte,
                DL_PrixUnitaire = @DL_PrixUnitaire,
                CO_No = @CO_No,
                EU_Enumere = @EU_Enumere,
                EU_Qte = @EU_Qte,
                DE_No = @DE_No,
                DL_PUTTC = @DL_PUTTC,
                DO_DateLivr = @DO_DateLivr,
                CA_Num = @CA_Num,
                DL_QtePL = @DL_QtePL,
                DL_CodeTaxe1 = @DL_CodeTaxe1,
                CA_No = @CA_No,
                Demendeur = @Demendeur
            WHERE 
                DO_Piece = @DO_Piece AND
                DL_Ligne = @DL_Ligne
        `;

        const result = await pool.request()
            .input('CT_Num', sql.NVarChar(17), updatedArticle.CT_Num)
            .input('DO_Piece', sql.NVarChar(13), doPiece)
            .input('DO_Date', sql.DateTime, updatedArticle.DO_Date)
            .input('DO_Ref', sql.NVarChar(17), updatedArticle.DO_Ref)
            .input('AR_Ref', sql.NVarChar(19), updatedArticle.AR_Ref)
            .input('DL_Design', sql.NVarChar(69), updatedArticle.DL_Design)
            .input('DL_Qte', sql.Numeric(24, 6), updatedArticle.DL_Qte)
            .input('DL_PrixUnitaire', sql.Numeric(24, 6), updatedArticle.DL_PrixUnitaire)
            .input('CO_No', sql.Int, updatedArticle.CO_No)
            .input('EU_Enumere', sql.NVarChar(35), updatedArticle.EU_Enumere)
            .input('EU_Qte', sql.Numeric(24, 6), updatedArticle.EU_Qte)
            .input('DE_No', sql.Int, updatedArticle.DE_No)
            .input('DL_PUTTC', sql.Numeric(24, 6), updatedArticle.DL_PUTTC)
            .input('DO_DateLivr', sql.DateTime, updatedArticle.DO_DateLivr)
            .input('CA_Num', sql.NVarChar(17), updatedArticle.CA_Num)
            .input('DL_QtePL', sql.Numeric(24, 6), updatedArticle.DL_QtePL)
            .input('DL_CodeTaxe1', sql.NVarChar(5), updatedArticle.DL_CodeTaxe1)
            .input('CA_No', sql.Int, updatedArticle.CA_No)
            .input('Demendeur', sql.NVarChar(50), updatedArticle.Demendeur)
            .input('DL_Ligne', sql.Int, dlLigne)
            .query(query);

        // Enable the trigger
        await pool.request().query("ENABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");

        return result
    } catch (err) {
        console.log(`MODEL UPDATE DOCLIGNE: ${err.message}`);
        
        // Re-enable the trigger if an error occurs
        await pool.request().query("ENABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE").catch(e => console.log(`Error enabling trigger: ${e.message}`));

        throw new Error('Database error during updating DOCLIGNE');
    }
};

export const updateBCStatutByAcheteurInDB = async (id, statut) => {
    try {
        const pool = await getConnection();

        // Retrieve the current statut
        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .query("SELECT DO_Statut FROM F_DOCENTETE WHERE DO_Piece = @DO_Piece");

        const OldStatut = result.recordset[0]?.DO_Statut;

        // Check if the current statut is 1
        if (OldStatut === 1) {
            const query = `
                UPDATE F_DOCENTETE
                SET DO_Statut = 2
                WHERE DO_Piece = @DO_Piece
            `;
            const updateResult = await pool.request()
                .input('DO_Piece', sql.NVarChar, id)
                .query(query);
            return updateResult;
        } else {
            // Return an appropriate response or throw an error if the current statut is not 1
            throw new Error('The current statut is not 1 and cannot be updated by the acheteur');
        }
    } catch (err) {
        console.log(`MODEL UPDATE BC STATUT BY ACHETEUR: ${err.message}`);
        throw new Error('Database error during updating BC statut by acheteur');
    }
};

export const updateBCStatutByDGInDB = async (id, statut) => {
    try {
        const pool = await getConnection();

        // Retrieve the current statut
        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .query("SELECT DO_Statut FROM F_DOCENTETE WHERE DO_Piece = @DO_Piece");

        const OldStatut = result.recordset[0]?.DO_Statut;

        if (OldStatut === 0) {
            let Nstatut;
            switch (statut) {
                case 'Saisie':
                    Nstatut = 0;
                    break;
                case 'Confirmé':
                    Nstatut = 1;
                    break;
                case 'Refusé':
                    Nstatut = 3;
                    break;
                default:
                    throw new Error('Invalid statut');
            }

            const query = `
                UPDATE F_DOCENTETE
                SET DO_Statut = @DO_Statut
                WHERE DO_Piece = @DO_Piece
            `;
            const updateResult = await pool.request()
                .input('DO_Piece', sql.NVarChar, id)
                .input('DO_Statut', sql.Int, Nstatut)
                .query(query);
            return updateResult;
        } else {
            // If the current statut is not 0, return an appropriate response or throw an error
            throw new Error('The current statut is not 0 and cannot be updated by DG');
        }
    } catch (err) {
        console.log(`MODEL UPDATE BC STATUT BY DG: ${err.message}`);
        throw new Error('Database error during updating BC statut by DG');
    }
};

export const searchBCInDB = async (key) => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT 
                DO_Domaine, DO_Type, DO_Piece, DO_Date, DO_Ref, DO_Tiers, CO_No, DO_Devise, DO_Cours, DE_No, CT_NumPayeur,  
                DO_Expedit, CA_Num, DO_Coord01, DO_DateLivr, DO_Statut, DO_Heure, CA_No, DO_TotalHT, DO_DocType, DO_TotalHTNet, 
                DO_TotalTTC, DO_NetAPayer, DUM, P_BRUT 
            FROM F_DOCENTETE
            WHERE DO_Piece LIKE @key
            ORDER BY DO_Date DESC
        `;
        const result = await pool.request()
            .input('key', sql.NVarChar, `%${key}%`)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL SEARCH BC: ${err.message}`);
        throw new Error('Database error during searching BC');
    }
};

export const searchDLInDB = async (key) => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT
                DO_Domaine, DO_Type, CT_Num, DO_Piece, DO_Date, DL_Ligne, DO_Ref, AR_Ref, DL_Design, DL_Qte, DL_PrixUnitaire,  
                CO_No, EU_Enumere, EU_Qte, DE_No, DL_PUTTC, DL_No, DO_DateLivr, CA_Num, DL_CodeTaxe1, CA_No, Demendeur 
            FROM F_DOCLIGNE
            WHERE DO_Piece LIKE @key OR AR_Ref LIKE @key
            ORDER BY DO_Date DESC
        `;
        const result = await pool.request()
            .input('key', sql.NVarChar, `%${key}%`)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL SEARCH DL: ${err.message}`);
        throw new Error('Database error during searching DL');
    }
};

export const getBCByStatutFromDB = async (statut) => {
    try {
        const pool = await getConnection();
        const query = 'SELECT * FROM F_DOCENTETE WHERE DO_Statut = @DO_Statut';
        const result = await pool.request()
            .input('DO_Statut', sql.NVarChar, statut)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET BC BY STATUT: ${err.message}`);
        throw new Error('Database error during fetching BC by statut');
    }
};

export const deleteDocLigneInDB = async (doPiece, dlLigne) => {
    try {
        const pool = await getConnection();
        
        const query = `
            DELETE FROM F_DOCLIGNE
            WHERE DO_Piece = @DO_Piece AND DL_Ligne = @DL_Ligne
        `;
        
        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar, doPiece)
            .input('DL_Ligne', sql.Int, dlLigne)
            .query(query);
        
        return result;
    } catch (err) {
        console.log(`MODEL DELETE DOCLIGNE: ${err.message}`);
        throw new Error('Database error during deleting docligne');
    }
};

export const transformDaToBcInDB = async (doPiece) => {
    let transaction;
    try {
        const pool = await getConnection();
        
        transaction = new sql.Transaction(pool);

        await pool.request().query("DISABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");

        await transaction.begin();

        const query = `
            UPDATE F_DOCENTETE
            SET DO_Piece = REPLACE(DO_Piece, 'DA', 'FBC'), DO_Type = 11, DO_Statut = 1
            WHERE DO_Piece = @DO_Piece;

            UPDATE F_DOCLIGNE
            SET DO_Piece = REPLACE(DO_Piece, 'DA', 'FBC'), DO_Type = 11
            WHERE DO_Piece = @DO_Piece;
        `;

        const request = transaction.request();

        await request
            .input('DO_Piece', sql.NVarChar, doPiece)
            .query(query);

        await transaction.commit();

        await pool.request().query("ENABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");

        return { message: 'DA successfully transformed to BC' };
    } catch (err) {
        console.log(`MODEL TRANSFORM DA TO BC: ${err.message}`);
        
        if (transaction) {
            console.log('Rolling back transaction');
            await transaction.rollback().catch(rollbackErr => {
                console.log(`Error rolling back transaction: ${rollbackErr.message}`);
            });
        }

        if (pool) {
            console.log('Enabling trigger after error');
            await pool.request().query("ENABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE").catch(triggerErr => {
                console.log(`Error enabling trigger: ${triggerErr.message}`);
            });
        }

        throw new Error('Database error during transforming DA to BC');
    }
};





export const updateBCTypeAndStatutInDB = async (doPiece) => {
    try {
        const pool = await getConnection();

        await pool.request().query("DISABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");

        const query = `
            UPDATE F_DOCENTETE
            SET DO_Type = 12, DO_Statut = 0
            WHERE DO_Piece = @DO_Piece;

            UPDATE F_DOCLIGNE
            SET DO_Type = 12
            WHERE DO_Piece = @DO_Piece;
        `;

        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar, doPiece)
            .query(query);

        await pool.request().query("ENABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");

        return result;
    } catch (err) {
        console.log(`MODEL UPDATE BC TYPE AND STATUT: ${err.message}`);

        // Ensure the trigger is enabled even if there is an error
        try {
            console.log('Enabling trigger after error');
            await pool.request().query("ENABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");
            console.log('Trigger enabled after error');
        } catch (triggerErr) {
            console.log(`Error enabling trigger after error: ${triggerErr.message}`);
        }

        throw new Error('Database error during updating BC type and statut');
    }
};

