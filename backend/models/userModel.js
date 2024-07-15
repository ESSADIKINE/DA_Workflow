import getConnection from '../config/db.js';

export const createUser = async ({ id, email, password }) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `INSERT INTO ${process.env.DB_USERNAME_TABLE} (CO_No, CO_EMail, CO_Matricule) VALUES ('${id}', '${email}', '${password}')`
      );
    return result;
  } catch (err) {
    console.log(`MODEL CREATE USER: ${err.message}`);
    throw new Error('Database error during user creation');
  }
};

export const findCollaboratorByEmail = async (email) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `SELECT * FROM ${process.env.DB_USERNAME_TABLE} WHERE CO_EMail = '${email}'`
      );
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL FIND USER: ${err.message}`);
    throw new Error('Database error during user lookup');
  }
};

export const findCollaboratorById = async (id) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `SELECT * FROM ${process.env.DB_USERNAME_TABLE} WHERE CO_No = '${id}'`
      );
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL FIND USER BY ID: ${err.message}`);
    throw new Error('Database error during user lookup by ID');
  }
};

export const getAllCollaborators = async () => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(
          `SELECT * FROM ${process.env.DB_USERNAME_TABLE}`
        );
      return result.recordset;
    } catch (err) {
      console.log(`MODEL GET ALL USERS: ${err.message}`);
      throw new Error('Database error during fetching all users');
    }
  };


  export const createCollaborator = async (collaborator) => {
    try {
        const { CO_No, CO_Nom, CO_Prenom, CO_EMail } = collaborator;
        const pool = await getConnection();
        const result = await pool.request().query(
            `INSERT INTO ${process.env.DB_USERNAME_TABLE} (CO_No, CO_Nom, CO_Prenom, CO_EMail) VALUES ('${CO_No}', '${CO_Nom}', '${CO_Prenom}', '${CO_EMail}')`
        );
        return result;
    } catch (err) {
        console.log(`MODEL CREATE COLLABORATOR: ${err.message}`);
        throw new Error('Database error during collaborator creation');
    }
};

export const updateCollaboratorById = async (id, collaborator) => {
    try {
        const { CO_Nom, CO_Prenom, CO_EMail } = collaborator;
        const pool = await getConnection();
        const result = await pool.request().query(
            `UPDATE ${process.env.DB_USERNAME_TABLE} SET CO_Nom = '${CO_Nom}', CO_Prenom = '${CO_Prenom}', CO_EMail = '${CO_EMail}' WHERE CO_No = '${id}'`
        );
        return result;
    } catch (err) {
        console.log(`MODEL UPDATE COLLABORATOR: ${err.message}`);
        throw new Error('Database error during collaborator update');
    }
};

export const findCollaboratorByName = async (key) => {
    try {
        let search = key.replace(/\n/g, '');
        const pool = await getConnection();
        var query = "SELECT * FROM " + process.env.DB_USERNAME_TABLE + " WHERE CO_Nom LIKE '%" + search + "%' OR CO_Prenom LIKE '%" + search + "%' OR CO_Email LIKE '%" + search + "%'";
        const result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.log(`MODEL FIND COLLABORATOR: ${err.message}`);
        throw new Error('Database error during collaborator lookup');
    }
};