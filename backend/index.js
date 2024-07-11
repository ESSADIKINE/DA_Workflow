require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const articleRoutes = require('./routes/articleRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use article routes
app.use('/articles', articleRoutes);

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
