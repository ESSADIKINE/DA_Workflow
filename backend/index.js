import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import collaboratorRoutes from './routes/userRoutes.js';
import articleRoutes from './routes/articleRoutes.js';
import fournisseurRoutes from './routes/fournisseurRoutes.js';
import demandesRoutes from './routes/demandesRoutes.js';
import daRoutes from './routes/daRoutes.js';
import bcRoutes from './routes/bcRoutes.js';
import config from './config/config.js';

const app = express();

app.use(cors({ credentials: true, origin: 'YOUR_CLIENT_ORIGIN' })); // Enable CORS with credentials
app.use(express.json()); // Ensure JSON parsing middleware is used
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', collaboratorRoutes);
app.use('/api/v1', articleRoutes);
app.use('/api/v1', fournisseurRoutes);
app.use('/api/v1', demandesRoutes);
app.use('/api/v1', daRoutes);
app.use('/api/v1', bcRoutes);

const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
