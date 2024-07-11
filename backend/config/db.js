const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Connect to SQL Server
const poolPromise = sql.connect(config)
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('SQL Server connection error: ', err);
        throw err;
    });

// Handling disconnection and connection errors
sql.on('error', err => {
    console.error('SQL Server error: ', err);
});

module.exports = {
    sql,
    poolPromise
};
