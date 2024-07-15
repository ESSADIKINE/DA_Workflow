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

export const findUserByEmail = async (email) => {
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

export const findUserById = async (id) => {
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


export const getAllUsers = async () => {
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