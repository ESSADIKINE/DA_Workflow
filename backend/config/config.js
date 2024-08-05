// config.js
import dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_COOKIE_EXPIRES_IN: process.env.JWT_COOKIE_EXPIRES_IN,
  HASH_SALT: process.env.HASH_SALT,
  COOKIE_JWT: process.env.COOKIE_JWT,
  NODE_ENV: process.env.NODE_ENV,
  ID_LENGTH: process.env.ID_LENGTH,
  ID_ALPHABET: process.env.ID_ALPHABET,
  MONGO_URI: process.env.MONGO_URI,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_SERVER: process.env.DB_SERVER,
  DB_DATABASE: process.env.DB_DATABASE,
  EMAIL: process.env.EMAIL,
  PASS: process.env.PASS,
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']
};
