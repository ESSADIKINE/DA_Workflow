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
import additionalRoutes from './routes/additionalRoutes.js'
import config from './config/config.js';
import { sendEmail } from './utils/Emails/Email.js'; // Ensure the path is correct


const app = express();

app.use(cors()); // Enable CORS
app.use(express.json()); // Ensure JSON parsing middleware is used
app.use(cookieParser());

// Define your routes here
app.post('/api/emails/send', async (req, res) => {
  const { to, subject, html } = req.body;
  console.log('Received email send request', { to, subject, html });
  try {
      await sendEmail(to, subject, html);
      res.status(200).send('Email sent successfully');
  } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
      res.status(500).send('Failed to send email');
  }
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', collaboratorRoutes);
app.use('/api/v1', articleRoutes);
app.use('/api/v1', fournisseurRoutes);
app.use('/api/v1', demandesRoutes);
app.use('/api/v1', daRoutes);
app.use('/api/v1', bcRoutes);
app.use('/api/v1', additionalRoutes);


const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
