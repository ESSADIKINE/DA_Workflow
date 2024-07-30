import getConnection from '../config/dbsql.js';
import { sendEmail } from '../utils/Emails/Email.js';
import { emailTemplates } from '../utils/Emails/Templates.js';
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

export const updateBCStatutByAcheteurInDB = async (id) => {
    try {
        const pool = await getConnection();

        // Retrieve current DO_Statut
        const statutResult = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .query("SELECT DO_Statut FROM F_DOCENTETE WHERE DO_Piece = @DO_Piece");

        if (!statutResult.recordset.length) {
            throw new Error(`No record found for DO_Piece: ${id}`);
        }

        const { DO_Statut } = statutResult.recordset[0];
        console.log(`Current DO_Statut: ${DO_Statut}`);

        if (DO_Statut === 1) {
            // Update DO_Statut in F_DOCENTETE
            const query = `
                UPDATE F_DOCENTETE
                SET DO_Statut = 2
                WHERE DO_Piece = @DO_Piece
            `;
            await pool.request()
                .input('DO_Piece', sql.NVarChar, id)
                .query(query);
            console.log(`DO_Statut updated to 2 for DO_Piece: ${id}`);

            // Retrieve all Demendeur values and their names from F_DOCLIGNE and User tables
            const demandeurResult = await pool.request()
                .input('DO_Piece', sql.NVarChar, id)
                .query(`
                    SELECT DISTINCT U.Nom, U.Prenom, U.Email, D.DL_Design
                    FROM F_DOCLIGNE D
                    JOIN DA_USERS U ON D.Demendeur = U.Email
                    WHERE D.DO_Piece = @DO_Piece
                `);

            if (!demandeurResult.recordset.length) {
                throw new Error(`No demandeurs found for DO_Piece: ${id}`);
            }

            const demandeurs = demandeurResult.recordset.map(record => ({
                email: record.Email,
                fullName: `${record.Nom} ${record.Prenom}`,
                DL_Design: record.DL_Design
            }));
            console.log(`Demandeurs found: ${demandeurs.map(d => d.fullName).join(', ')}`);


            // Send emails to all unique demandeurs
            for (const { email, fullName, DL_Design } of demandeurs) {
                const { subject, html } = emailTemplates.envoye(fullName, DL_Design);
                await sendEmail(email, subject, html);
                console.log(`Email sent to demandeur: ${fullName}`);
            }
        } else {
            throw new Error('The current statut is not 0 and cannot be updated by the acheteur');
        }
    } catch (err) {
        console.error(`Error updating DA statut by acheteur: ${err.message}`);
        throw new Error('Database error during updating DA statut by acheteur');
    }
};

export const updateBCStatutByDGInDB = async (id, statut) => {
    try {
        const pool = await getConnection();

        // Retrieve current DO_Statut
        const statutResult = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .query("SELECT DO_Statut FROM F_DOCENTETE WHERE DO_Piece = @DO_Piece");

        if (!statutResult.recordset.length) {
            throw new Error(`No record found for DO_Piece: ${id}`);
        }

        const { DO_Statut } = statutResult.recordset[0];
        console.log(`Current DO_Statut: ${DO_Statut}`);

        // Retrieve all Demendeur values and their names from F_DOCLIGNE and User tables
        const demandeurResult = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .query(`
                SELECT DISTINCT U.Nom, U.Prenom, U.Email, D.DL_Design
                FROM F_DOCLIGNE D
                JOIN DA_USERS U ON D.Demendeur = U.Email
                WHERE D.DO_Piece = @DO_Piece
            `);

        // Retrieve the email of the acheteur
        const acheteurResult = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .query(`
                SELECT U.Nom, U.Prenom, U.Email 
                FROM F_COLLABORATEUR C 
                JOIN F_DOCENTETE E ON E.CO_No = C.CO_No 
                JOIN DA_USERS U ON C.CO_EMail = U.Email 
                WHERE E.DO_Piece = @DO_Piece
            `);

        if (!acheteurResult.recordset.length) {
            throw new Error('No email found for acheteur');
        }

        const acheteur = acheteurResult.recordset[0];
        const acheteurEmail = acheteur.Email;
        const acheteurFullName = `${acheteur.Nom} ${acheteur.Prenom}`;

        const demandeurs = demandeurResult.recordset.map(record => ({
            email: record.Email,
            fullName: `${record.Nom} ${record.Prenom}`,
            DL_Design: record.DL_Design
        }));
        console.log(`Demandeurs found: ${demandeurs.map(d => d.fullName).join(', ')}`);

        if (DO_Statut === 0) {
            let Nstatut, emailTemplate;
            switch (statut) {
                case 'Saisie':
                    Nstatut = 0;
                    emailTemplate = emailTemplates.saisie;
                    break;
                case 'Confirmé':
                    Nstatut = 1;
                    emailTemplate = emailTemplates.confirme;
                    break;
                case 'Refusé':
                    Nstatut = 3;
                    emailTemplate = emailTemplates.refuse;
                    break;
                default:
                    throw new Error('Invalid statut');
            }

            // Update DO_Statut in F_DOCENTETE
            const query = `
                UPDATE F_DOCENTETE
                SET DO_Statut = @DO_Statut
                WHERE DO_Piece = @DO_Piece
            `;
            await pool.request()
                .input('DO_Piece', sql.NVarChar, id)
                .input('DO_Statut', sql.Int, Nstatut)
                .query(query);

            // Send emails to all unique demandeurs
            for (const { email, fullName, DL_Design } of demandeurs) {
                const { subject, html } = emailTemplate(fullName, DL_Design);
                await sendEmail(email, subject, html);
                console.log(`Email sent to demandeur: ${fullName}`);
            }

            // Send email to the acheteur
            const { subject: acheteurSubject, html: acheteurHtml } = emailTemplate(acheteurFullName, demandeurs[0].DL_Design);
            await sendEmail(acheteurEmail, acheteurSubject, acheteurHtml);
            console.log(`Email sent to acheteur: ${acheteurFullName}`);
        } else {
            throw new Error('The current statut is not 1 and cannot be updated by DG');
        }
    } catch (err) {
        console.error(`Error updating DA statut by DG: ${err.message}`);
        throw new Error('Database error during updating DA statut by DG');
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

        // Retrieve all Demendeur values from F_DOCLIGNE
        const demandeurResult = await pool.request()
            .input('DO_Piece', sql.NVarChar, doPiece.replace('DA', 'FBC'))
            .query("SELECT DISTINCT Demendeur FROM F_DOCLIGNE WHERE DO_Piece = @DO_Piece");

        const demandeurs = demandeurResult.recordset.map(record => record.Demendeur);
        console.log(`Demandeurs found: ${demandeurs.join(', ')}`);

        // Send emails to all unique demandeurs
        for (const demandeur of demandeurs) {
            const { subject, html } = emailTemplates.preparation(demandeur);
            await sendEmail(demandeur, subject, html);
            console.log(`Email sent to demandeur: ${demandeur}`);
        }

        return { message: 'DA successfully transformed to BC' };
    } catch (err) {
        console.error(`Error transforming DA to BC: ${err.message}`);
        
        if (transaction) {
            await transaction.rollback();
        }
        await pool.request().query("ENABLE TRIGGER TG_UPD_F_DOCLIGNE ON F_DOCLIGNE");
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

