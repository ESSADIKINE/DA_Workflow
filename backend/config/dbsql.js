import sql from 'mssql';
import config from './config.js';

const dbConfig = {
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    server: config.DB_SERVER,
    database: config.DB_DATABASE,
    options: {
        encrypt: true, // Enable encryption
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    requestTimeout: 300000 // Set the timeout to 5 minutes (300000 ms)

  };

let pool;

const getConnection = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(dbConfig);
      console.log('Connected to SQL Server')
    }
    return pool;
  } catch (err) {
    console.error(`Database connection error: ${err.message}`);
    throw new Error('Database connection error');
  }
};

export default getConnection;
