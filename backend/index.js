import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import config from './config/config.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});