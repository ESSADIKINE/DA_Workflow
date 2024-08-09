import getConnection from '../config/dbsql.js';
import sql from 'mssql';

export const getCollaborateur = async () => {
  console.log('Fetching Collaborateur');
  const pool = await getConnection();
  const query = "SELECT CONCAT([CO_Nom], ' ', [CO_Prenom]) AS NomPrenom FROM F_COLLABORATEUR WHERE [CO_NO] = 10 OR [CO_NO] = 1";
  const result = await pool.request().query(query);
  console.log('Fetched Collaborateur:', result.recordset);
  return result.recordset;
};

export const getAllCT_Num = async () => {
  console.log('Fetching CT_Num');
  const pool = await getConnection();
  const query = "SELECT DISTINCT CT_Num FROM F_ARTFOURNISS";
  const result = await pool.request().query(query);
  console.log('Fetched CT_Num:', result.recordset);
  return result.recordset;
};

export const getDO_Devise = async () => {
  console.log('Fetching DO_Devise');
  const pool = await getConnection();
  const query = "SELECT CONCAT([cbIndice], ')', [D_Intitule]) as D_Intitule FROM P_DEVISE WHERE D_Intitule <> ''";
  const result = await pool.request().query(query);
  console.log('Fetched DO_Devise:', result.recordset);
  return result.recordset;
};

export const getAllDepot = async () => {
  console.log('Fetching Depot');
  const pool = await getConnection();
  const query = "SELECT DISTINCT DE_Intitule FROM F_DEPOT";
  const result = await pool.request().query(query);
  console.log('Fetched Depot:', result.recordset);
  return result.recordset;
};

export const getExpedition = async () => {
  console.log('Fetching Expedition');
  const pool = await getConnection();
  const query = "SELECT DISTINCT E_Intitule FROM P_EXPEDITION WHERE E_Intitule <> ''";
  const result = await pool.request().query(query);
  console.log('Fetched Expedition:', result.recordset);
  return result.recordset;
};

export const getAllAffaire = async () => {
  console.log('Fetching Affaire');
  const pool = await getConnection();
  const query = "SELECT CONCAT([CA_Num], ' - ', [CA_Intitule]) AS Affaire FROM F_COMPTEA";
  const result = await pool.request().query(query);
  console.log('Fetched Affaire:', result.recordset);
  return result.recordset;
};

export const getTaxe = async () => {
  console.log('Fetching Taxe');
  const pool = await getConnection();
  const query = "SELECT CONCAT(CAST(TA_Taux AS INT), '%') AS Taxe FROM F_TAXE WHERE TA_Code LIKE 'TR%A' ORDER BY CAST(TA_Taux AS INT) DESC";
  const result = await pool.request().query(query);
  console.log('Fetched Taxe:', result.recordset);
  return result.recordset;
};

export const getAllEU_Enumere = async () => {
  console.log('Fetching EU_Enumere');
  const pool = await getConnection();
  const query = "SELECT DISTINCT U_Intitule AS Uneration FROM P_UNITE WHERE U_Intitule <> ''";
  const result = await pool.request().query(query);
  console.log('Fetched EU_Enumere:', result.recordset);
  return result.recordset;
};

export const getAllDemandeur = async () => {
  console.log('Fetching Demandeur');
  const pool = await getConnection();
  const query = "SELECT CONCAT([Nom], ' ', [Prenom]) AS NomPrenom FROM DA_USERS";
  const result = await pool.request().query(query);
  console.log('Fetched Demandeur:', result.recordset);
  return result.recordset;
};

export const getArticlesDemander = async () => {
  try {
    const pool = await getConnection();
    const query = `
      SELECT CONCAT(l.[AR_Ref], ' - ', l.[AR_Design], ', Demander par (', u.[Nom], ' ', u.[Prenom], ')') AS articleDemander
      FROM DA_LIST l
      JOIN DA_USERS u ON l.email = u.Email
      WHERE l.[Demande_statut] = 'Demander'
    `;
    const result = await pool.request().query(query);
    console.log("Database query result:", result.recordset); // Log database query result
    return result.recordset; // Corrected the property access
  } catch (err) {
    console.log(`MODEL SEARCH ARTICLES:`, err);
    throw new Error('Database error during article search');
  }
};

