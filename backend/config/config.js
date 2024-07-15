import dotenv from 'dotenv';
dotenv.config();

export default {
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SERVER: process.env.DB_SERVER,
  DB_DATABASE: process.env.DB_DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  HASH_SALT: parseInt(process.env.HASH_SALT, 10),
  COOKIE_JWT: process.env.COOKIE_JWT,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  
  DB_USERNAME_TABLE:process.env.DB_USERNAME_TABLE,
};
