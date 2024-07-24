import getConnection from '../config/dbsql.js';
import sql from 'mssql';

const MIN_SMALLDATETIME = new Date('1900-01-01');
const MAX_SMALLDATETIME = new Date('2079-06-06');

function adjustDateForSmallDateTime(date) {
    if (date < MIN_SMALLDATETIME) {
        return MIN_SMALLDATETIME;
    }
    if (date > MAX_SMALLDATETIME) {
        return MAX_SMALLDATETIME;
    }
    return date;
}

export const addNewDAInDB = async (newDA, articles) => {
    const pool = await getConnection();
    const transaction = new sql.Transaction(pool);

    try {
        console.log('Starting transaction');
        await transaction.begin();
        console.log('Transaction started');

        // Disable the trigger
        await transaction.request().query('DISABLE TRIGGER [TG_INS_F_DOCLIGNE] ON [F_DOCLIGNE]');
        console.log('Trigger disabled');

        // Insert into F_DOCENTETE
        const headerQuery = `
        INSERT INTO F_DOCENTETE (
            DO_Domaine, DO_Type, DO_Piece, DO_Date, DO_Ref, DO_Tiers, CO_No, DO_Period, DO_Devise, DO_Cours,
            DE_No, LI_No, CT_NumPayeur, DO_Expedit, DO_NbFacture, DO_BLFact, DO_TxEscompte, DO_Reliquat, 
            DO_Imprim, CA_Num, DO_Coord01, DO_Coord02, DO_Coord03, DO_Coord04, DO_Souche, DO_DateLivr, 
            DO_Condition, DO_Tarif, DO_Colisage, DO_TypeColis, DO_Transaction, DO_Langue, DO_Ecart, DO_Regime, 
            N_CatCompta, DO_Ventile, AB_No, DO_DebutAbo, DO_FinAbo, DO_DebutPeriod, DO_FinPeriod, CG_Num, 
            DO_Statut, DO_Heure, CA_No, CO_NoCaissier, DO_Transfere, DO_Cloture, DO_NoWeb, DO_Attente, 
            DO_Provenance, CA_NumIFRS, MR_No, DO_TypeFrais, DO_ValFrais, DO_TypeLigneFrais, DO_TypeFranco, 
            DO_ValFranco, DO_TypeLigneFranco, DO_Taxe1, DO_TypeTaux1, DO_TypeTaxe1, DO_Taxe2, DO_TypeTaux2, 
            DO_TypeTaxe2, DO_Taxe3, DO_TypeTaux3, DO_TypeTaxe3, DO_MajCpta, DO_Motif, CT_NumCentrale, DO_Contact, 
            DO_FactureElec, DO_TypeTransac, DO_DateLivrRealisee, DO_DateExpedition, DO_FactureFrs, DO_PieceOrig, 
            DO_EStatut, DO_DemandeRegul, ET_No, DO_Valide, DO_Coffre, DO_CodeTaxe1, DO_CodeTaxe2, 
            DO_CodeTaxe3, DO_TotalHT, DO_StatutBAP, DO_Escompte, DO_DocType, DO_TypeCalcul, 
            DO_TotalHTNet, DO_TotalTTC, DO_NetAPayer, DO_MontantRegle, DO_RefPaiement, DO_AdressePaiement, 
            DO_PaiementLigne, DO_MotifDevis, DUM, P_BRUT, EI, DATE_EI, POIDS_EI, DOM_EI, COMMENTAIRES, 
            Date_Accusé_Commande, Date_Export, [Etat occasion], [Num. Imputation], demandeur, DO_Conversion, 
            QUALITE_Quantité, QUALITE_Specification, QUALITE_Documentation
        )
        VALUES (
1, 10, @DO_Piece, @DO_Date, @DO_Ref, @DO_Tiers, @CO_No, 0, @DO_Devise, 
@DO_Cours, @DE_No, 0, @CT_NumPayeur, @DO_Expedit, 1, 0, 0.000000, 
0, 0, @CA_Num, @DO_Coord01, '', '', '', 0, 
@DO_DateLivr, 1, 1, 1, 11, 11, 0, 
0.000000, 11, 2, 0, 0, '1900-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z', 
'1900-01-01T00:00:00.000Z', '44111000', @DO_Statut, @DO_Heure, @CA_No, 0, 0, 0, 
'', 0, 0, '', 0, 0, 0.000000, 
0, 0, 0.000000, 0, 0.000000, 0, 
0, 0.000000, 0, 0, 0.000000, 0, 0, 
0, '', null, '', 0, 10, 
'1900-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z', '', '', 0, 
0, 0, 0, '', null, null, null, 
@DO_TotalHT, 0, 0.000000, @DO_DocType, 0,
@DO_TotalHTNet, @DO_TotalTTC, @DO_NetAPayer, 0.000000, null, '', 
'', '', @DUM, @P_BRUT, '', '1900-01-01T00:00:00.000Z', 0.000000, '', '', 
'1900-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z', '', '', @demandeur, '', 
0, null, null

        )
    `;
        console.log('Inserting into F_DOCENTETE');
        await transaction.request()
            .input('DO_Piece', sql.NVarChar(13), newDA.DO_Piece)
            .input('DO_Date', sql.DateTime, adjustDateForSmallDateTime(newDA.DO_Date))
            .input('DO_Ref', sql.NVarChar(17), newDA.DO_Ref)
            .input('DO_Tiers', sql.NVarChar(17), newDA.DO_Tiers)
            .input('CO_No', sql.Int, newDA.CO_No)
            .input('DO_Devise', sql.SmallInt, newDA.DO_Devise)
            .input('DO_Cours', sql.Numeric(24, 6), newDA.DO_Cours)
            .input('DE_No', sql.Int, newDA.DE_No)
            .input('CT_NumPayeur', sql.NVarChar(17), newDA.CT_NumPayeur)
            .input('DO_Expedit', sql.SmallInt, newDA.DO_Expedit)
            .input('CA_Num', sql.NVarChar(17), newDA.CA_Num)
            .input('DO_Coord01', sql.NVarChar(35), newDA.DO_Coord01)
            .input('DO_DateLivr', sql.DateTime, adjustDateForSmallDateTime(newDA.DO_DateLivr))
            .input('DO_Statut', sql.SmallInt, newDA.DO_Statut)
            .input('DO_Heure', sql.Char(9), newDA.DO_Heure)
            .input('CA_No', sql.Int, newDA.CA_No)
            .input('DO_TotalHT', sql.Numeric(24, 6), newDA.DO_TotalHT)
            .input('DO_DocType', sql.SmallInt, newDA.DO_DocType)
            .input('DO_TotalHTNet', sql.Numeric(24, 6), newDA.DO_TotalHTNet)
            .input('DO_TotalTTC', sql.Numeric(24, 6), newDA.DO_TotalTTC)
            .input('DO_NetAPayer', sql.Numeric(24, 6), newDA.DO_NetAPayer)
            .input('DUM', sql.NVarChar(69), newDA.DUM)
            .input('P_BRUT', sql.Numeric(24, 6), newDA.P_BRUT)
            .input('COMMENTAIRES', sql.NVarChar(69), newDA.COMMENTAIRES)
            .input('demandeur', sql.NVarChar(255), newDA.demandeur)
            .query(headerQuery);
        console.log('Inserted into F_DOCENTETE successfully');

        // Insert into F_DOCLIGNE for each article
        if (articles && articles.length > 0) {
            console.log('Inserting into F_DOCLIGNE');
            const lineQuery = `
                INSERT INTO F_DOCLIGNE (
                    DO_Domaine, DO_Type, CT_Num, DO_Piece, DL_PieceBC, DL_PieceBL, DO_Date, DL_DateBC, DL_DateBL,
                    DL_Ligne, DO_Ref, DL_TNomencl, DL_TRemPied, DL_TRemExep, AR_Ref, DL_Design, DL_Qte, DL_QteBC,
                    DL_QteBL, DL_PoidsNet, DL_PoidsBrut, DL_Remise01REM_Valeur, DL_Remise01REM_Type, DL_Remise02REM_Valeur, 
                    DL_Remise02REM_Type, DL_Remise03REM_Valeur, DL_Remise03REM_Type, DL_PrixUnitaire, DL_PUBC, DL_Taxe1, 
                    DL_TypeTaux1, DL_TypeTaxe1, DL_Taxe2, DL_TypeTaux2, DL_TypeTaxe2, CO_No, AG_No1, AG_No2, DL_PrixRU, 
                    DL_CMUP, DL_MvtStock, DT_No, AF_RefFourniss, EU_Enumere, EU_Qte, DL_TTC, DE_No, DL_NoRef, DL_TypePL, 
                    DL_PUDevise, DL_PUTTC, DL_No, DO_DateLivr, CA_Num, DL_Taxe3, DL_TypeTaux3, DL_TypeTaxe3, DL_Frais, 
                    DL_Valorise, AR_RefCompose, DL_NonLivre, AC_RefClient, DL_MontantHT, DL_MontantTTC, DL_FactPoids, 
                    DL_Escompte, DL_PiecePL, DL_DatePL, DL_QtePL, DL_NoColis, DL_NoLink, RP_Code, DL_QteRessource, 
                    DL_DateAvancement, PF_Num, DL_CodeTaxe1, DL_CodeTaxe2, DL_CodeTaxe3, DL_PieceOFProd, DL_PieceDE, 
                    DL_DateDE, DL_QteDE, DL_Operation, DL_NoSousTotal, CA_No, DO_DocType, Num_Commande, Poste_Commande, 
                    TVA_DOUANES, OPERATEUR, MACHINE, PIECE, Sous_Client, Date_Livraison_Souhaitee, Date_Livraison_Confirmee, 
                    Certificat_Matiere, Norme_Matiere, Categorie_Retard, Retrad_Commentaire, DATE_RECEPTION, DATE_MISE_SERVICE, 
                    DATE_DER_ETALONNAGE, MARQUE, NORME, MOTIF, Demendeur, Fournisseur, DATE_DISPO, commentaire, Occasion
                ) VALUES (
                    1, 10, @CT_Num, @DO_Piece, '', '', @DO_Date, '1900-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z',
@DL_Ligne, @DO_Ref, 0, 0.000000, 0.000000, @AR_Ref, @DL_Design, @DL_Qte, 0.000000,
0.000000, 0.000000, 0.000000, 0.000000, 0, 0.000000,
0, 0.000000, 0, @DL_PrixUnitaire, 0.000000, 0.000000,
0, 0, 0.000000, 0, 0, @CO_No, 0, 0, 0.000000,
0.000000, 0, 0, '', @EU_Enumere, @EU_Qte, 0, @DE_No, 0, 1,
0.000000, @DL_PUTTC, @DL_No, @DO_DateLivr, @CA_Num, 0.000000, 0, 0, 0.000000,
0, null, 0, '', 0.000000, 0.000000, 0,
0.000000, '', '1900-01-01T00:00:00.000Z', 0.000000, null, 0, null, 0.000000,
'1900-01-01T00:00:00.000Z', '', @DL_CodeTaxe1, null, null, '', '',
'1900-01-01T00:00:00.000Z', 0.000000, '', 0, @CA_No, @DO_DocType, null, 0,
0.000000, '', '', '', '', '1900-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z',
@Certificat_Matiere, @Norme_Matiere, '', '', '1900-01-01T00:00:00.000Z', '1900-01-01T00:00:00.000Z',
'1900-01-01T00:00:00.000Z', '', '', '', @Demendeur, @Fournisseur, '1900-01-01T00:00:00.000Z', @commentaire, ''
                )
            `;
            for (const article of articles) {
                console.log('Inserting article:', article);
                await transaction.request()
                    .input('CT_Num', sql.NVarChar(17), article.CT_Num)
                    .input('DO_Piece', sql.NVarChar(13), article.DO_Piece)
                    .input('DO_Date', sql.DateTime, adjustDateForSmallDateTime(article.DO_Date))
                    .input('DL_Ligne', sql.Int, article.DL_Ligne)
                    .input('DO_Ref', sql.NVarChar(17), article.DO_Ref)
                    .input('AR_Ref', sql.NVarChar(19), article.AR_Ref)
                    .input('DL_Design', sql.NVarChar(69), article.DL_Design)
                    .input('DL_Qte', sql.Numeric(24, 6), article.DL_Qte)
                    .input('DL_PrixUnitaire', sql.Numeric(24, 6), article.DL_PrixUnitaire)
                    .input('CO_No', sql.Int, article.CO_No)
                    .input('EU_Enumere', sql.NVarChar(35), article.EU_Enumere)
                    .input('EU_Qte', sql.Numeric(24, 6), article.EU_Qte)
                    .input('DE_No', sql.Int, article.DE_No)
                    .input('DL_PUTTC', sql.Numeric(24, 6), article.DL_PUTTC)
                    .input('DL_No', sql.Int, article.DL_No)
                    .input('DO_DateLivr', sql.DateTime, adjustDateForSmallDateTime(article.DO_DateLivr))
                    .input('CA_Num', sql.NVarChar(17), article.CA_Num)
                    .input('DL_QtePL', sql.Numeric(24, 6), article.DL_QtePL)
                    .input('DL_CodeTaxe1', sql.NVarChar(5), article.DL_CodeTaxe1)
                    .input('CA_No', sql.Int, article.CA_No)
                    .input('DO_DocType', sql.SmallInt, newDA.DO_DocType)
                    .input('Certificat_Matiere', sql.NVarChar(255), article.Certificat_Matiere)
                    .input('Norme_Matiere', sql.NVarChar(255), article.Norme_Matiere)
                    .input('Demendeur', sql.NVarChar(50), article.Demendeur)
                    .input('Fournisseur', sql.NVarChar(50), article.Fournisseur)
                    .input('commentaire', sql.NVarChar(255), article.commentaire)
                    .query(lineQuery);
                console.log('Inserted article successfully:', article);
            }
        }

        await transaction.commit();
        console.log('Transaction committed successfully');

        // Re-enable the trigger
        await pool.request().query('ENABLE TRIGGER [TG_INS_F_DOCLIGNE] ON [F_DOCLIGNE]');
        console.log('Trigger re-enabled');

        return { message: 'DA and articles added successfully' };
    } catch (err) {
        console.error(`Transaction Error: ${err.message}`, err);
        await transaction.rollback();
        console.log('Transaction rolled back');

        // Re-enable the trigger in case of an error
        await pool.request().query('ENABLE TRIGGER [TG_INS_F_DOCLIGNE] ON [F_DOCLIGNE]');
        console.log('Trigger re-enabled after error');

        throw new Error('Database error during adding new DA');
    }
};

export const getAllDAInDetailsFromDB = async () => {
    try {
        const pool = await getConnection();
        const query = 'SELECT * FROM F_DOCLIGNE';
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET ALL DA IN DETAILS: ${err.message}`);
        throw new Error('Database error during fetching all DA in details');
    }
};

export const getAllDAInBriefFromDB = async () => {
    try {
        const pool = await getConnection();
        const query = 'SELECT * FROM F_DOCENTETE';
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET ALL DA IN BRIEF: ${err.message}`);
        throw new Error('Database error during fetching all DA in brief');
    }
};

export const updateDAInDB = async (id, updatedDA) => {
    try {
        const pool = await getConnection();
        const query = `
            UPDATE F_DOCENTETE
            SET DO_Tiers = @DO_Tiers, DO_Date = @DO_Date, DO_Statut = @DO_Statut, DO_Affaire = @DO_Affaire, DO_Expedition = @DO_Expedition, DO_LivrPrev = @DO_LivrPrev, DO_Acheteur = @DO_Acheteur, DO_DUM = @DO_DUM, DO_TypeDoc = @DO_TypeDoc, DO_Ref = @DO_Ref, DO_Entete1 = @DO_Entete1, DO_Devise = @DO_Devise
            WHERE DO_Piece = @DO_Piece
        `;
        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .input('DO_Tiers', sql.NVarChar, updatedDA.DO_Tiers)
            .input('DO_Date', sql.Date, updatedDA.DO_Date)
            .input('DO_Statut', sql.NVarChar, updatedDA.DO_Statut)
            .input('DO_Affaire', sql.NVarChar, updatedDA.DO_Affaire)
            .input('DO_Expedition', sql.NVarChar, updatedDA.DO_Expedition)
            .input('DO_LivrPrev', sql.Date, updatedDA.DO_LivrPrev)
            .input('DO_Acheteur', sql.NVarChar, updatedDA.DO_Acheteur)
            .input('DO_DUM', sql.NVarChar, updatedDA.DO_DUM)
            .input('DO_TypeDoc', sql.NVarChar, updatedDA.DO_TypeDoc)
            .input('DO_Ref', sql.NVarChar, updatedDA.DO_Ref)
            .input('DO_Entete1', sql.NVarChar, updatedDA.DO_Entete1)
            .input('DO_Devise', sql.NVarChar, updatedDA.DO_Devise)
            .query(query);
        return result;
    } catch (err) {
        console.log(`MODEL UPDATE DA: ${err.message}`);
        throw new Error('Database error during updating DA');
    }
};

export const updateDAStatutByAcheteurInDB = async (id, statut) => {
    try {
        const pool = await getConnection();
        const query = `
            UPDATE F_DOCENTETE
            SET DO_Statut = @DO_Statut
            WHERE DO_Piece = @DO_Piece
        `;
        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .input('DO_Statut', sql.NVarChar, statut)
            .query(query);
        return result;
    } catch (err) {
        console.log(`MODEL UPDATE DA STATUT BY ACHETEUR: ${err.message}`);
        throw new Error('Database error during updating DA statut by acheteur');
    }
};

export const updateDAStatutByDGInDB = async (id, statut) => {
    try {
        const pool = await getConnection();
        const query = `
            UPDATE F_DOCENTETE
            SET DO_Statut = @DO_Statut
            WHERE DO_Piece = @DO_Piece
        `;
        const result = await pool.request()
            .input('DO_Piece', sql.NVarChar, id)
            .input('DO_Statut', sql.NVarChar, statut)
            .query(query);
        return result;
    } catch (err) {
        console.log(`MODEL UPDATE DA STATUT BY DG: ${err.message}`);
        throw new Error('Database error during updating DA statut by DG');
    }
};

export const searchDAInDB = async (key) => {
    try {
        const pool = await getConnection();
        const query = `
            SELECT * FROM F_DOCENTETE
            WHERE DO_Piece LIKE @key OR DO_Tiers LIKE @key
        `;
        const result = await pool.request()
            .input('key', sql.NVarChar, `%${key}%`)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL SEARCH DA: ${err.message}`);
        throw new Error('Database error during searching DA');
    }
};

export const getDAByStatutFromDB = async (statut) => {
    try {
        const pool = await getConnection();
        const query = 'SELECT * FROM F_DOCENTETE WHERE DO_Statut = @DO_Statut';
        const result = await pool.request()
            .input('DO_Statut', sql.NVarChar, statut)
            .query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL GET DA BY STATUT: ${err.message}`);
        throw new Error('Database error during fetching DA by statut');
    }
};
