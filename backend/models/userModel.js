import getConnection from '../config/dbsql.js';
import sql from 'mssql';

export const findUserByEmail = async (email) => {
  try {
    const pool = await getConnection();
    const query = `
      SELECT User_id, Nom, Prenom, Email, Role, Date_De_Creation, Pass
      FROM DA_USERS
      WHERE Email = @Email
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

export const findUserById = async (id) => {
  try {
    const pool = await getConnection();
    const query = `
      SELECT * FROM DA_USERS
      WHERE User_id = @id
    `;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    return result.recordset[0];
  } catch (err) {
    console.log(`MODEL FIND USER BY ID: ${err.message}`);
    throw new Error('Database error during user lookup by ID');
  }
};

export const getAllUsers = async () => {
  try {
    const pool = await getConnection();
    const query = `
      SELECT User_id, Nom, Prenom, Email, Role, Date_De_Creation
      FROM DA_USERS
    `;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.log(`MODEL GET ALL USERS: ${err.message}`);
    throw new Error('Database error during fetching all users');
  }
};

export const createUser = async (user) => {
  try {
    const { User_id, Nom, Prenom, Email, Role, Pass } = user;
    const pool = await getConnection();
    const query = `
      INSERT INTO DA_USERS (Nom, Prenom, Email, Pass, Role)
      VALUES (@Nom, @Prenom, @Email, @Pass, @Role)
    `;
    const result = await pool.request()
      .input('Nom', sql.NVarChar, Nom)
      .input('Prenom', sql.NVarChar, Prenom)
      .input('Email', sql.NVarChar, Email)
      .input('Pass', sql.NVarChar, Pass)
      .input('Role', sql.NVarChar, Role)
      .query(query);
    return result;
  } catch (err) {
    console.log(`MODEL CREATE USER: ${err.message}`);
    throw new Error('Database error during user creation');
  }
};

export const updateUserById = async (id, user) => {
  try {
    const { Nom, Prenom, Email, Role, Pass } = user;
    const pool = await getConnection();
    const query = `
      UPDATE DA_USERS
      SET Nom = @Nom, Prenom = @Prenom, Email = @Email, Role = @Role, Pass = @Pass
      WHERE User_id = @id
    `;
    const result = await pool.request()
      .input('Nom', sql.NVarChar, Nom)
      .input('Prenom', sql.NVarChar, Prenom)
      .input('Email', sql.NVarChar, Email)
      .input('Role', sql.NVarChar, Role)
      .input('Pass', sql.NVarChar, Pass)
      .input('id', sql.Int, id)
      .query(query);
    return result;
  } catch (err) {
    console.log(`MODEL UPDATE USER: ${err.message}`);
    throw new Error('Database error during user update');
  }
};

export const findUserBySearch = async (key) => {
  try {
    let Search = key.replace(/\n/g, '');
    const pool = await getConnection();
    const query = `
      SELECT User_id, Nom, Prenom, Email, Role, Date_De_Creation
      FROM DA_USERS
      WHERE Nom LIKE @Search OR Prenom LIKE @Search OR Email LIKE @Search
    `;
    const result = await pool.request()
      .input('Search', sql.NVarChar, `%${Search}%`)
      .query(query);
    return result.recordset;
  } catch (err) {
    console.log(`MODEL FIND USER: ${err.message}`);
    throw new Error('Database error during user lookup');
  }
};

export const deleteUserById = async (id) => {
  try {
    const pool = await getConnection();
    const query = `
      DELETE FROM DA_USERS
      WHERE User_id = @id
    `;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(query);
    return result;
  } catch (err) {
    console.log(`MODEL DELETE USER: ${err.message}`);
    throw new Error('Database error during user deletion');
  }
};

export const updateUserPasswordInDB = async (id, hashedPassword) => {
  try {
    const pool = await getConnection();
    const query = `
      UPDATE DA_USERS
      SET Pass = @Pass
      WHERE User_id = @id
    `;
    const result = await pool.request()
      .input('Pass', sql.NVarChar, hashedPassword)
      .input('id', sql.Int, id)
      .query(query);
    return result;
  } catch (err) {
    console.log(`MODEL UPDATE PASSWORD: ${err.message}`);
    throw new Error('Database error during password update');
  }
};
