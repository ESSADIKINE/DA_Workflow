import getConnection from '../config/dbsql.js';
import sql from 'mssql';

export const createDemandeInDB = async (demande) => {
  try {
    const { AR_Ref, AR_Design, Qty, description, Demande_statut = 'Demander', email } = demande;
    const pool = await getConnection();
    const result = await pool.request()
      .input('AR_Ref', sql.VarChar(50), AR_Ref)
      .input('AR_Design', sql.VarChar(50), AR_Design)
      .input('Qty', sql.Int, Qty)
      .input('description', sql.VarChar(255), description)
      .input('Demande_statut', sql.VarChar(100), Demande_statut)
      .input('email', sql.VarChar(100), email)
      .query(`INSERT INTO DA_LIST (AR_Ref, AR_Design, Qty, description, Demande_statut, email) 
              VALUES (@AR_Ref, @AR_Design, @Qty, @description, @Demande_statut, @email); 
              SELECT * FROM DA_LIST WHERE DA_id = SCOPE_IDENTITY();`);
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL CREATE DEMANDE: ${err.message}`);
    throw new Error('Database error during demande creation');
  }
};

export const getDemandesFromDB = async () => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT 
        l.DA_id, 
        u.Nom, 
        u.Prenom, 
        u.Email,
        l.AR_Ref, 
        l.AR_Design, 
        l.Qty,
        l.description,
        l.Date_De_Creation, 
        l.Demande_statut
      FROM 
        DA_LIST AS l
      JOIN 
        DA_USERS AS u ON l.email = u.Email;
    `);
    console.log('Demandes fetched from database:', result.recordset);
    return result.recordset;
  } catch (err) {
    console.log(`MODEL GET DEMANDES: ${err.message}`);
    throw new Error('Database error during fetching all demandes');
  }
};

export const getDemandeBySearchInDB = async (AR_Ref, AR_Design) => {
  try {
    const pool = await getConnection();
    let query = `
      SELECT 
        u.Nom, 
        u.Prenom, 
        u.Email,
        l.DA_id
        l.AR_Ref, 
        l.AR_Design, 
        l.Qty,
        l.description,
        l.Date_De_Creation, 
        l.Demande_statut
      FROM 
        DA_LIST l
      JOIN 
        DA_USERS u ON l.email = u.Email
      WHERE 1=1
    `;
    
    if (AR_Ref) query += ` AND l.AR_Ref LIKE '%${AR_Ref}%'`;
    if (AR_Design) query += ` AND l.AR_Design LIKE '%${AR_Design}%'`;

    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.log(`MODEL SEARCH DEMANDES: ${err.message}`);
    throw new Error('Database error during demande search');
  }
};


export const updateDemandeInDB = async (id, demande) => {
  try {
    const { AR_Ref, AR_Design, Qty, description, Demande_statut, email } = demande;
    const pool = await getConnection();
    const result = await pool.request()
      .input('AR_Ref', sql.VarChar(50), AR_Ref)
      .input('AR_Design', sql.VarChar(50), AR_Design)
      .input('Qty', sql.Int, Qty)
      .input('description', sql.VarChar(255), description)
      .input('Demande_statut', sql.VarChar(100), Demande_statut)
      .input('email', sql.VarChar(100), email)
      .input('id', sql.Int, id)
      .query(`UPDATE DA_LIST SET AR_Ref = @AR_Ref, AR_Design = @AR_Design, Qty = @Qty, 
              description = @description, Demande_statut = @Demande_statut, email = @email
              WHERE DA_id = @id;
              SELECT * FROM DA_LIST WHERE DA_id = @id;`);
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL UPDATE DEMANDE: ${err.message}`);
    throw new Error('Database error during demande update');
  }
};

export const deleteDemandeInDB = async (id) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM DA_LIST WHERE DA_id = @id;');
    return result.rowsAffected[0];
  } catch (err) {
    console.log(`MODEL DELETE DEMANDE: ${err.message}`);
    throw new Error('Database error during demande deletion');
  }
};

export const getArticlesInSelection = async (key) => {
  try {
    const pool = await getConnection();
    const query = `
      SELECT CONCAT([AR_Ref], ' - ', [AR_Design]) AS article
      FROM F_ARTICLE
      WHERE AR_Ref LIKE @key OR AR_Design LIKE @key
    `;
    const result = await pool.request()
      .input('key', sql.NVarChar, `%${key}%`)
      .query(query);
    console.log("Database query result:", result.recordset); // Log database query result
    return result.recordset.map(record => record.article);
  } catch (err) {
    console.log(`MODEL SEARCH ARTICLES: ${err.message}`);
    throw new Error('Database error during article search');
  }
};

export const refuseDemandeInDB = async (id) => {
  try {
    const pool = await getConnection();
    console.log(`Connecting to DB to refuse demande with DA_id: ${id}`);
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('Demande_statut', sql.VarChar(100), 'Refuser')
      .query(`UPDATE DA_LIST SET Demande_statut = @Demande_statut WHERE DA_id = @id;
              SELECT * FROM DA_LIST WHERE DA_id = @id;`);
    console.log(`DB response:`, result.recordset[0]);
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL REFUSE DEMANDE: ${err.message}`);
    throw new Error('Database error during demande refusal');
  }
};
