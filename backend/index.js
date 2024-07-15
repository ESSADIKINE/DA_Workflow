import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import collaboratorRoutes from './routes/userRoutes.js';
import config from './config/config.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', collaboratorRoutes); // Ajouter cette ligne pour les routes des collaborateurs

const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
