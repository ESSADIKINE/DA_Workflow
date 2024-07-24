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
        await pool.request().query('DISABLE TRIGGER [TG_INS_F_DOCLIGNE] ON [F_DOCLIGNE]');
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
                @DO_Domaine, @DO_Type, @DO_Piece, @DO_Date, @DO_Ref, @DO_Tiers, @CO_No, @DO_Period, @DO_Devise, 
                @DO_Cours, @DE_No, @LI_No, @CT_NumPayeur, @DO_Expedit, @DO_NbFacture, @DO_BLFact, @DO_TxEscompte, 
                @DO_Reliquat, @DO_Imprim, @CA_Num, @DO_Coord01, @DO_Coord02, @DO_Coord03, @DO_Coord04, @DO_Souche, 
                @DO_DateLivr, @DO_Condition, @DO_Tarif, @DO_Colisage, @DO_TypeColis, @DO_Transaction, @DO_Langue, 
                @DO_Ecart, @DO_Regime, @N_CatCompta, @DO_Ventile, @AB_No, @DO_DebutAbo, @DO_FinAbo, @DO_DebutPeriod, 
                @DO_FinPeriod, @CG_Num, @DO_Statut, @DO_Heure, @CA_No, @CO_NoCaissier, @DO_Transfere, @DO_Cloture, 
                @DO_NoWeb, @DO_Attente, @DO_Provenance, @CA_NumIFRS, @MR_No, @DO_TypeFrais, @DO_ValFrais, 
                @DO_TypeLigneFrais, @DO_TypeFranco, @DO_ValFranco, @DO_TypeLigneFranco, @DO_Taxe1, @DO_TypeTaux1, 
                @DO_TypeTaxe1, @DO_Taxe2, @DO_TypeTaux2, @DO_TypeTaxe2, @DO_Taxe3, @DO_TypeTaux3, @DO_TypeTaxe3, 
                @DO_MajCpta, @DO_Motif, @CT_NumCentrale, @DO_Contact, @DO_FactureElec, @DO_TypeTransac, 
                @DO_DateLivrRealisee, @DO_DateExpedition, @DO_FactureFrs, @DO_PieceOrig, @DO_EStatut, 
                @DO_DemandeRegul, @ET_No, @DO_Valide, @DO_Coffre, @DO_CodeTaxe1, @DO_CodeTaxe2, @DO_CodeTaxe3, 
                @DO_TotalHT, @DO_StatutBAP, @DO_Escompte, @DO_DocType, @DO_TypeCalcul,
                @DO_TotalHTNet, @DO_TotalTTC, @DO_NetAPayer, @DO_MontantRegle, @DO_RefPaiement, @DO_AdressePaiement, 
                @DO_PaiementLigne, @DO_MotifDevis, @DUM, @P_BRUT, @EI, @DATE_EI, @POIDS_EI, @DOM_EI, @COMMENTAIRES, 
                @Date_Accusé_Commande, @Date_Export, @EtatOccasion, @NumImputation, @demandeur, @DO_Conversion, 
                @QUALITE_Quantité, @QUALITE_Specification, @QUALITE_Documentation
            )
        `;
        console.log('Inserting into F_DOCENTETE');
        await transaction.request()
            .input('DO_Domaine', sql.SmallInt, newDA.DO_Domaine)
            .input('DO_Type', sql.SmallInt, newDA.DO_Type)
            .input('DO_Piece', sql.NVarChar(13), newDA.DO_Piece)
            .input('DO_Date', sql.DateTime, newDA.DO_Date)
            .input('DO_Ref', sql.NVarChar(17), newDA.DO_Ref)
            .input('DO_Tiers', sql.NVarChar(17), newDA.DO_Tiers)
            .input('CO_No', sql.Int, newDA.CO_No)
            .input('DO_Period', sql.SmallInt, newDA.DO_Period)
            .input('DO_Devise', sql.SmallInt, newDA.DO_Devise)
            .input('DO_Cours', sql.Numeric(24, 6), newDA.DO_Cours)
            .input('DE_No', sql.Int, newDA.DE_No)
            .input('LI_No', sql.Int, newDA.LI_No)
            .input('CT_NumPayeur', sql.NVarChar(17), newDA.CT_NumPayeur)
            .input('DO_Expedit', sql.SmallInt, newDA.DO_Expedit)
            .input('DO_NbFacture', sql.SmallInt, newDA.DO_NbFacture)
            .input('DO_BLFact', sql.SmallInt, newDA.DO_BLFact)
            .input('DO_TxEscompte', sql.Numeric(24, 6), newDA.DO_TxEscompte)
            .input('DO_Reliquat', sql.SmallInt, newDA.DO_Reliquat)
            .input('DO_Imprim', sql.SmallInt, newDA.DO_Imprim)
            .input('CA_Num', sql.NVarChar(17), newDA.CA_Num)
            .input('DO_Coord01', sql.NVarChar(35), newDA.DO_Coord01)
            .input('DO_Coord02', sql.NVarChar(35), newDA.DO_Coord02)
            .input('DO_Coord03', sql.NVarChar(35), newDA.DO_Coord03)
            .input('DO_Coord04', sql.NVarChar(35), newDA.DO_Coord04)
            .input('DO_Souche', sql.SmallInt, newDA.DO_Souche)
            .input('DO_DateLivr', sql.DateTime, newDA.DO_DateLivr)
            .input('DO_Condition', sql.SmallInt, newDA.DO_Condition)
            .input('DO_Tarif', sql.SmallInt, newDA.DO_Tarif)
            .input('DO_Colisage', sql.SmallInt, newDA.DO_Colisage)
            .input('DO_TypeColis', sql.SmallInt, newDA.DO_TypeColis)
            .input('DO_Transaction', sql.SmallInt, newDA.DO_Transaction)
            .input('DO_Langue', sql.SmallInt, newDA.DO_Langue)
            .input('DO_Ecart', sql.Numeric(24, 6), newDA.DO_Ecart)
            .input('DO_Regime', sql.SmallInt, newDA.DO_Regime)
            .input('N_CatCompta', sql.SmallInt, newDA.N_CatCompta)
            .input('DO_Ventile', sql.SmallInt, newDA.DO_Ventile)
            .input('AB_No', sql.Int, newDA.AB_No)
            .input('DO_DebutAbo', sql.DateTime, newDA.DO_DebutAbo)
            .input('DO_FinAbo', sql.DateTime, newDA.DO_FinAbo)
            .input('DO_DebutPeriod', sql.DateTime, newDA.DO_DebutPeriod)
            .input('DO_FinPeriod', sql.DateTime, newDA.DO_FinPeriod)
            .input('CG_Num', sql.NVarChar(17), newDA.CG_Num)
            .input('DO_Statut', sql.SmallInt, newDA.DO_Statut)
            .input('DO_Heure', sql.Char(9), newDA.DO_Heure)
            .input('CA_No', sql.Int, newDA.CA_No)
            .input('CO_NoCaissier', sql.Int, newDA.CO_NoCaissier)
            .input('DO_Transfere', sql.SmallInt, newDA.DO_Transfere)
            .input('DO_Cloture', sql.SmallInt, newDA.DO_Cloture)
            .input('DO_NoWeb', sql.NVarChar(50), newDA.DO_NoWeb)
            .input('DO_Attente', sql.SmallInt, newDA.DO_Attente)
            .input('DO_Provenance', sql.SmallInt, newDA.DO_Provenance)
            .input('CA_NumIFRS', sql.NVarChar(17), newDA.CA_NumIFRS)
            .input('MR_No', sql.Int, newDA.MR_No)
            .input('DO_TypeFrais', sql.SmallInt, newDA.DO_TypeFrais)
            .input('DO_ValFrais', sql.Numeric(24, 6), newDA.DO_ValFrais)
            .input('DO_TypeLigneFrais', sql.SmallInt, newDA.DO_TypeLigneFrais)
            .input('DO_TypeFranco', sql.SmallInt, newDA.DO_TypeFranco)
            .input('DO_ValFranco', sql.Numeric(24, 6), newDA.DO_ValFranco)
            .input('DO_TypeLigneFranco', sql.SmallInt, newDA.DO_TypeLigneFranco)
            .input('DO_Taxe1', sql.Numeric(24, 6), newDA.DO_Taxe1)
            .input('DO_TypeTaux1', sql.SmallInt, newDA.DO_TypeTaux1)
            .input('DO_TypeTaxe1', sql.SmallInt, newDA.DO_TypeTaxe1)
            .input('DO_Taxe2', sql.Numeric(24, 6), newDA.DO_Taxe2)
            .input('DO_TypeTaux2', sql.SmallInt, newDA.DO_TypeTaux2)
            .input('DO_TypeTaxe2', sql.SmallInt, newDA.DO_TypeTaxe2)
            .input('DO_Taxe3', sql.Numeric(24, 6), newDA.DO_Taxe3)
            .input('DO_TypeTaux3', sql.SmallInt, newDA.DO_TypeTaux3)
            .input('DO_TypeTaxe3', sql.SmallInt, newDA.DO_TypeTaxe3)
            .input('DO_MajCpta', sql.SmallInt, newDA.DO_MajCpta)
            .input('DO_Motif', sql.NVarChar(255), newDA.DO_Motif)
            .input('CT_NumCentrale', sql.NVarChar(17), newDA.CT_NumCentrale)
            .input('DO_Contact', sql.NVarChar(35), newDA.DO_Contact)
            .input('DO_FactureElec', sql.SmallInt, newDA.DO_FactureElec)
            .input('DO_TypeTransac', sql.SmallInt, newDA.DO_TypeTransac)
            .input('DO_DateLivrRealisee', sql.DateTime, adjustDateForSmallDateTime(newDA.DO_DateLivrRealisee))
            .input('DO_DateExpedition', sql.DateTime, adjustDateForSmallDateTime(newDA.DO_DateExpedition))
            .input('DO_FactureFrs', sql.NVarChar(13), newDA.DO_FactureFrs)
            .input('DO_PieceOrig', sql.NVarChar(13), newDA.DO_PieceOrig)
            .input('DO_GUID', sql.UniqueIdentifier, newDA.DO_GUID)  // Ensure this is a valid uniqueidentifier
            .input('DO_EStatut', sql.SmallInt, newDA.DO_EStatut)
            .input('DO_DemandeRegul', sql.SmallInt, newDA.DO_DemandeRegul)
            .input('ET_No', sql.Int, newDA.ET_No)
            .input('DO_Valide', sql.SmallInt, newDA.DO_Valide)
            .input('DO_Coffre', sql.SmallInt, newDA.DO_Coffre)
            .input('DO_CodeTaxe1', sql.NVarChar(3), newDA.DO_CodeTaxe1)
            .input('DO_CodeTaxe2', sql.NVarChar(3), newDA.DO_CodeTaxe2)
            .input('DO_CodeTaxe3', sql.NVarChar(3), newDA.DO_CodeTaxe3)
            .input('DO_TotalHT', sql.Numeric(24, 6), newDA.DO_TotalHT)
            .input('DO_StatutBAP', sql.SmallInt, newDA.DO_StatutBAP)
            .input('DO_Escompte', sql.Numeric(24, 6), newDA.DO_Escompte)
            .input('DO_DocType', sql.SmallInt, newDA.DO_DocType)
            .input('DO_TypeCalcul', sql.SmallInt, newDA.DO_TypeCalcul)
            .input('DO_TotalHTNet', sql.Numeric(24, 6), newDA.DO_TotalHTNet)
            .input('DO_TotalTTC', sql.Numeric(24, 6), newDA.DO_TotalTTC)
            .input('DO_NetAPayer', sql.Numeric(24, 6), newDA.DO_NetAPayer)
            .input('DO_MontantRegle', sql.Numeric(24, 6), newDA.DO_MontantRegle)
            .input('DO_RefPaiement', sql.NVarChar(17), newDA.DO_RefPaiement)
            .input('DO_AdressePaiement', sql.NVarChar(69), newDA.DO_AdressePaiement)
            .input('DO_PaiementLigne', sql.SmallInt, newDA.DO_PaiementLigne)
            .input('DO_MotifDevis', sql.NVarChar(69), newDA.DO_MotifDevis)
            .input('DUM', sql.NVarChar(69), newDA.DUM)
            .input('P_BRUT', sql.Numeric(24, 6), newDA.P_BRUT)
            .input('EI', sql.SmallInt, newDA.EI)
            .input('DATE_EI', sql.DateTime, adjustDateForSmallDateTime(newDA.DATE_EI))
            .input('POIDS_EI', sql.Numeric(24, 6), newDA.POIDS_EI)
            .input('DOM_EI', sql.NVarChar(69), newDA.DOM_EI)
            .input('COMMENTAIRES', sql.NVarChar(69), newDA.COMMENTAIRES)
            .input('Date_Accusé_Commande', sql.SmallDateTime, adjustDateForSmallDateTime(newDA.Date_Accusé_Commande))
            .input('Date_Export', sql.SmallDateTime, adjustDateForSmallDateTime(newDA.Date_Export))
            .input('EtatOccasion', sql.NVarChar(255), newDA['Etat occasion'])
            .input('NumImputation', sql.NVarChar(255), newDA['Num. Imputation'])
            .input('demandeur', sql.NVarChar(255), newDA.demandeur)
            .input('DO_Conversion', sql.NVarChar(255), newDA.DO_Conversion)
            .input('QUALITE_Quantité', sql.Numeric(24, 6), newDA['QUALITE_Quantité'])
            .input('QUALITE_Specification', sql.NVarChar(255), newDA['QUALITE_Specification'])
            .input('QUALITE_Documentation', sql.NVarChar(255), newDA['QUALITE_Documentation'])
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
                    @DO_Domaine, @DO_Type, @CT_Num, @DO_Piece, @DL_PieceBC, @DL_PieceBL, @DO_Date, @DL_DateBC, @DL_DateBL,
                    @DL_Ligne, @DO_Ref, @DL_TNomencl, @DL_TRemPied, @DL_TRemExep, @AR_Ref, @DL_Design, @DL_Qte, @DL_QteBC,
                    @DL_QteBL, @DL_PoidsNet, @DL_PoidsBrut, @DL_Remise01REM_Valeur, @DL_Remise01REM_Type, @DL_Remise02REM_Valeur, 
                    @DL_Remise02REM_Type, @DL_Remise03REM_Valeur, @DL_Remise03REM_Type, @DL_PrixUnitaire, @DL_PUBC, @DL_Taxe1, 
                    @DL_TypeTaux1, @DL_TypeTaxe1, @DL_Taxe2, @DL_TypeTaux2, @DL_TypeTaxe2, @CO_No, @AG_No1, @AG_No2, @DL_PrixRU, 
                    @DL_CMUP, @DL_MvtStock, @DT_No, @AF_RefFourniss, @EU_Enumere, @EU_Qte, @DL_TTC, @DE_No, @DL_NoRef, @DL_TypePL, 
                    @DL_PUDevise, @DL_PUTTC, @DL_No, @DO_DateLivr, @CA_Num, @DL_Taxe3, @DL_TypeTaux3, @DL_TypeTaxe3, @DL_Frais, 
                    @DL_Valorise, @AR_RefCompose, @DL_NonLivre, @AC_RefClient, @DL_MontantHT, @DL_MontantTTC, @DL_FactPoids, 
                    @DL_Escompte, @DL_PiecePL, @DL_DatePL, @DL_QtePL, @DL_NoColis, @DL_NoLink, @RP_Code, @DL_QteRessource, 
                    @DL_DateAvancement, @PF_Num, @DL_CodeTaxe1, @DL_CodeTaxe2, @DL_CodeTaxe3, @DL_PieceOFProd, @DL_PieceDE, 
                    @DL_DateDE, @DL_QteDE, @DL_Operation, @DL_NoSousTotal, @CA_No, @DO_DocType, @Num_Commande, @Poste_Commande, 
                    @TVA_DOUANES, @OPERATEUR, @MACHINE, @PIECE, @Sous_Client, @Date_Livraison_Souhaitee, @Date_Livraison_Confirmee, 
                    @Certificat_Matiere, @Norme_Matiere, @Categorie_Retard, @Retrad_Commentaire, @DATE_RECEPTION, @DATE_MISE_SERVICE, 
                    @DATE_DER_ETALONNAGE, @MARQUE, @NORME, @MOTIF, @Demendeur, @Fournisseur, @DATE_DISPO, @commentaire, @Occasion
                )
            `;
            for (const article of articles) {
                console.log('Inserting article:', article);
                await transaction.request()
                    .input('DO_Domaine', sql.SmallInt, article.DO_Domaine)
                    .input('DO_Type', sql.SmallInt, article.DO_Type)
                    .input('CT_Num', sql.NVarChar(17), article.CT_Num)
                    .input('DO_Piece', sql.NVarChar(13), article.DO_Piece)
                    .input('DL_PieceBC', sql.NVarChar(13), article.DL_PieceBC)
                    .input('DL_PieceBL', sql.NVarChar(13), article.DL_PieceBL)
                    .input('DO_Date', sql.DateTime, article.DO_Date)
                    .input('DL_DateBC', sql.DateTime, adjustDateForSmallDateTime(article.DL_DateBC))
                    .input('DL_DateBL', sql.DateTime, adjustDateForSmallDateTime(article.DL_DateBL))
                    .input('DL_Ligne', sql.Int, article.DL_Ligne)
                    .input('DO_Ref', sql.NVarChar(17), article.DO_Ref)
                    .input('DL_TNomencl', sql.SmallInt, article.DL_TNomencl)
                    .input('DL_TRemPied', sql.Numeric(24, 6), article.DL_TRemPied)
                    .input('DL_TRemExep', sql.Numeric(24, 6), article.DL_TRemExep)
                    .input('AR_Ref', sql.NVarChar(19), article.AR_Ref)
                    .input('DL_Design', sql.NVarChar(69), article.DL_Design)
                    .input('DL_Qte', sql.Numeric(24, 6), article.DL_Qte)
                    .input('DL_QteBC', sql.Numeric(24, 6), article.DL_QteBC)
                    .input('DL_QteBL', sql.Numeric(24, 6), article.DL_QteBL)
                    .input('DL_PoidsNet', sql.Numeric(24, 6), article.DL_PoidsNet)
                    .input('DL_PoidsBrut', sql.Numeric(24, 6), article.DL_PoidsBrut)
                    .input('DL_Remise01REM_Valeur', sql.Numeric(24, 6), article.DL_Remise01REM_Valeur)
                    .input('DL_Remise01REM_Type', sql.SmallInt, article.DL_Remise01REM_Type)
                    .input('DL_Remise02REM_Valeur', sql.Numeric(24, 6), article.DL_Remise02REM_Valeur)
                    .input('DL_Remise02REM_Type', sql.SmallInt, article.DL_Remise02REM_Type)
                    .input('DL_Remise03REM_Valeur', sql.Numeric(24, 6), article.DL_Remise03REM_Valeur)
                    .input('DL_Remise03REM_Type', sql.SmallInt, article.DL_Remise03REM_Type)
                    .input('DL_PrixUnitaire', sql.Numeric(24, 6), article.DL_PrixUnitaire)
                    .input('DL_PUBC', sql.Numeric(24, 6), article.DL_PUBC)
                    .input('DL_Taxe1', sql.Numeric(24, 6), article.DL_Taxe1)
                    .input('DL_TypeTaux1', sql.SmallInt, article.DL_TypeTaux1)
                    .input('DL_TypeTaxe1', sql.SmallInt, article.DL_TypeTaxe1)
                    .input('DL_Taxe2', sql.Numeric(24, 6), article.DL_Taxe2)
                    .input('DL_TypeTaux2', sql.SmallInt, article.DL_TypeTaux2)
                    .input('DL_TypeTaxe2', sql.SmallInt, article.DL_TypeTaxe2)
                    .input('CO_No', sql.Int, article.CO_No)
                    .input('AG_No1', sql.Int, article.AG_No1)
                    .input('AG_No2', sql.Int, article.AG_No2)
                    .input('DL_PrixRU', sql.Numeric(24, 6), article.DL_PrixRU)
                    .input('DL_CMUP', sql.Numeric(24, 6), article.DL_CMUP)
                    .input('DL_MvtStock', sql.SmallInt, article.DL_MvtStock)
                    .input('DT_No', sql.Int, article.DT_No)
                    .input('AF_RefFourniss', sql.NVarChar(35), article.AF_RefFourniss)
                    .input('EU_Enumere', sql.NVarChar(3), article.EU_Enumere)
                    .input('EU_Qte', sql.Numeric(24, 6), article.EU_Qte)
                    .input('DL_TTC', sql.Numeric(24, 6), article.DL_TTC)
                    .input('DE_No', sql.Int, article.DE_No)
                    .input('DL_NoRef', sql.Int, article.DL_NoRef)
                    .input('DL_TypePL', sql.SmallInt, article.DL_TypePL)
                    .input('DL_PUDevise', sql.Numeric(24, 6), article.DL_PUDevise)
                    .input('DL_PUTTC', sql.Numeric(24, 6), article.DL_PUTTC)
                    .input('DL_No', sql.Int, article.DL_No)
                    .input('DO_DateLivr', sql.DateTime, article.DO_DateLivr)
                    .input('CA_Num', sql.NVarChar(17), article.CA_Num)
                    .input('DL_Taxe3', sql.Numeric(24, 6), article.DL_Taxe3)
                    .input('DL_TypeTaux3', sql.SmallInt, article.DL_TypeTaux3)
                    .input('DL_TypeTaxe3', sql.SmallInt, article.DL_TypeTaxe3)
                    .input('DL_Frais', sql.Numeric(24, 6), article.DL_Frais)
                    .input('DL_Valorise', sql.SmallInt, article.DL_Valorise)
                    .input('AR_RefCompose', sql.NVarChar(19), article.AR_RefCompose)
                    .input('DL_NonLivre', sql.SmallInt, article.DL_NonLivre)
                    .input('AC_RefClient', sql.NVarChar(35), article.AC_RefClient)
                    .input('DL_MontantHT', sql.Numeric(24, 6), article.DL_MontantHT)
                    .input('DL_MontantTTC', sql.Numeric(24, 6), article.DL_MontantTTC)
                    .input('DL_FactPoids', sql.SmallInt, article.DL_FactPoids)
                    .input('DL_Escompte', sql.Numeric(24, 6), article.DL_Escompte)
                    .input('DL_PiecePL', sql.NVarChar(13), article.DL_PiecePL)
                    .input('DL_DatePL', sql.DateTime, adjustDateForSmallDateTime(article.DL_DatePL))
                    .input('DL_QtePL', sql.Numeric(24, 6), article.DL_QtePL)
                    .input('DL_NoColis', sql.Int, article.DL_NoColis)
                    .input('DL_NoLink', sql.Int, article.DL_NoLink)
                    .input('RP_Code', sql.NVarChar(17), article.RP_Code)
                    .input('DL_QteRessource', sql.Numeric(24, 6), article.DL_QteRessource)
                    .input('DL_DateAvancement', sql.DateTime, adjustDateForSmallDateTime(article.DL_DateAvancement))
                    .input('PF_Num', sql.NVarChar(9), article.PF_Num)
                    .input('DL_CodeTaxe1', sql.NVarChar(3), article.DL_CodeTaxe1)
                    .input('DL_CodeTaxe2', sql.NVarChar(3), article.DL_CodeTaxe2)
                    .input('DL_CodeTaxe3', sql.NVarChar(3), article.DL_CodeTaxe3)
                    .input('DL_PieceOFProd', sql.NVarChar(13), article.DL_PieceOFProd)
                    .input('DL_PieceDE', sql.NVarChar(13), article.DL_PieceDE)
                    .input('DL_DateDE', sql.DateTime, adjustDateForSmallDateTime(article.DL_DateDE))
                    .input('DL_QteDE', sql.Numeric(24, 6), article.DL_QteDE)
                    .input('DL_Operation', sql.SmallInt, article.DL_Operation)
                    .input('DL_NoSousTotal', sql.Int, article.DL_NoSousTotal)
                    .input('CA_No', sql.Int, article.CA_No)
                    .input('DO_DocType', sql.SmallInt, article.DO_DocType)
                    .input('Num_Commande', sql.NVarChar(17), article.Num_Commande)
                    .input('Poste_Commande', sql.Int, article.Poste_Commande)
                    .input('TVA_DOUANES', sql.SmallInt, article.TVA_DOUANES)
                    .input('OPERATEUR', sql.NVarChar(50), article.OPERATEUR)
                    .input('MACHINE', sql.NVarChar(50), article.MACHINE)
                    .input('PIECE', sql.NVarChar(50), article.PIECE)
                    .input('Sous_Client', sql.NVarChar(17), article.Sous_Client)
                    .input('Date_Livraison_Souhaitee', sql.DateTime, adjustDateForSmallDateTime(article.Date_Livraison_Souhaitee))
                    .input('Date_Livraison_Confirmee', sql.DateTime, adjustDateForSmallDateTime(article.Date_Livraison_Confirmee))
                    .input('Certificat_Matiere', sql.NVarChar(50), article.Certificat_Matiere)
                    .input('Norme_Matiere', sql.NVarChar(50), article.Norme_Matiere)
                    .input('Categorie_Retard', sql.SmallInt, article.Categorie_Retard)
                    .input('Retrad_Commentaire', sql.NVarChar(255), article.Retrad_Commentaire)
                    .input('DATE_RECEPTION', sql.SmallDateTime, adjustDateForSmallDateTime(article.DATE_RECEPTION))
                    .input('DATE_MISE_SERVICE', sql.SmallDateTime, adjustDateForSmallDateTime(article.DATE_MISE_SERVICE))
                    .input('DATE_DER_ETALONNAGE', sql.SmallDateTime, adjustDateForSmallDateTime(article.DATE_DER_ETALONNAGE))
                    .input('MARQUE', sql.NVarChar(50), article.MARQUE)
                    .input('NORME', sql.NVarChar(50), article.NORME)
                    .input('MOTIF', sql.NVarChar(255), article.MOTIF)
                    .input('Demendeur', sql.NVarChar(50), article.Demendeur)
                    .input('Fournisseur', sql.NVarChar(50), article.Fournisseur)
                    .input('DATE_DISPO', sql.DateTime, adjustDateForSmallDateTime(article.DATE_DISPO))
                    .input('commentaire', sql.NVarChar(255), article.commentaire)
                    .input('Occasion', sql.NVarChar(50), article.Occasion)
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
