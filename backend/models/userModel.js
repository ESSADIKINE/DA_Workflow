import getConnection from '../config/db.js';
import sql from 'mssql';

export const findCollaboratorByEmail = async (email) => {
  try {
    const pool = await getConnection();
    const query = `
      SELECT CO_No, CO_Nom, CO_Prenom, CO_EMail, CO_Fonction, cbCreation, CO_Pass
      FROM ${process.env.DB_USERNAME_TABLE}
      WHERE CO_EMail = @Email
    `;
    const result = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query(query);
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL FIND USER: ${err.message}`);
    throw new Error('Database error during user lookup');
  }
};

export const findCollaboratorById = async (id) => {
  try {
    const pool = await getConnection();
    const query = `
      SELECT * FROM ${process.env.DB_USERNAME_TABLE}
      WHERE CO_No = '${id}'
    `;
    const result = await pool.request().query(query);
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL FIND USER BY ID: ${err.message}`);
    throw new Error('Database error during user lookup by ID');
  }
};

export const getAllCollaborators = async () => {
  try {
    const pool = await getConnection();
    const query = `
    SELECT CO_No, CO_Nom, CO_Prenom, CO_EMail, CO_Fonction, cbCreation
    FROM ${process.env.DB_USERNAME_TABLE}
`;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.log(`MODEL GET ALL USERS: ${err.message}`);
    throw new Error('Database error during fetching all users');
  }
};

export const createCollaborator = async (collaborator) => {
  try {
    const { CO_No, CO_Nom, CO_Prenom, CO_EMail, CO_Fonction, DA_Role } = collaborator;
    const pool = await getConnection();
    const query = `
      INSERT INTO ${process.env.DB_USERNAME_TABLE} (CO_Nom, CO_Prenom, CO_EMail, CO_Fonction)
      VALUES ('${CO_Nom}', '${CO_Prenom}', '${CO_EMail}', '${CO_Fonction}')
    `;
    console.log(query);
    const result = await pool.request()
      .input('CO_No', sql.NVarChar, CO_No)
      .input('CO_Nom', sql.NVarChar, CO_Nom)
      .input('CO_Prenom', sql.NVarChar, CO_Prenom)
      .input('CO_EMail', sql.NVarChar, CO_EMail)
      .input('CO_Fonction', sql.NVarChar, CO_Fonction)
      .input('CO_EMail', sql.NVarChar, DA_Role)
      .query(query);
    return result;
  } catch (err) {
    console.log(`MODEL CREATE COLLABORATOR: ${err.message}`);
    throw new Error('Database error during collaborator creation');
  }
};

export const updateCollaboratorById = async (id, collaborator) => {
  try {
    const { CO_Nom, CO_Prenom, CO_EMail, CO_Fonction } = collaborator;
    const pool = await getConnection();
    const query = `
      UPDATE ${process.env.DB_USERNAME_TABLE}
      SET CO_Nom = '${CO_Nom}', CO_Prenom = '${CO_Prenom}', CO_EMail = '${CO_EMail}', CO_Fonction = '${CO_Fonction}'
      WHERE CO_No = ${id}
    `;
    const result = await pool.request()
      .input('CO_Nom', sql.NVarChar, CO_Nom)
      .input('CO_Prenom', sql.NVarChar, CO_Prenom)
      .input('CO_EMail', sql.NVarChar, CO_EMail)
      .input('CO_Fonction', sql.NVarChar, CO_Fonction)
      .input('id', sql.Int, id)
      .query(query);
    console.log('Update Result:', result);
    return result;
  } catch (err) {
    console.log(`MODEL UPDATE COLLABORATOR: ${err.message}`);
    throw new Error('Database error during collaborator update');
  }
};

export const findCollaboratorBySearch = async (key) => {
  try {
    let Search = key.replace(/\n/g, '');
    const pool = await getConnection();
    const query = `
      SELECT CO_No, CO_Nom, CO_Prenom, CO_EMail, CO_Fonction, cbCreation
      FROM ${process.env.DB_USERNAME_TABLE}
      WHERE CO_Nom LIKE @Search OR CO_Prenom LIKE @Search OR CO_EMail LIKE @Search
    `;
    const result = await pool.request()
      .input('Search', sql.NVarChar, `%${Search}%`)
      .query(query);
    return result.recordset;
  } catch (err) {
    console.log(`MODEL FIND COLLABORATOR: ${err.message}`);
    throw new Error('Database error during collaborator lookup');
  }
};

export const deleteCollaboratorById = async (id) => {
  try {
    const pool = await getConnection();
    const query = `
      DELETE FROM ${process.env.DB_USERNAME_TABLE}
      WHERE CO_No = @id
    `;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    return result;
  } catch (err) {
    console.log(`MODEL DELETE COLLABORATOR: ${err.message}`);
    throw new Error('Database error during collaborator deletion');
  }
};

export const updateCollaboratorPasswordInDB = async (id, hashedPassword) => {
  try {
    const pool = await getConnection();
    const query = `
      UPDATE ${process.env.DB_USERNAME_TABLE}
      SET CO_Pass = @CO_Pass
      WHERE CO_No = @id
    `;
    const result = await pool.request()
      .input('CO_Pass', sql.NVarChar, hashedPassword)
      .input('id', sql.Int, id)
      .query(query);
    return result;
  } catch (err) {
    console.log(`MODEL UPDATE PASSWORD: ${err.message}`);
    throw new Error('Database error during password update');
  }
};
