// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/db'); // Import the sequelize instance
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Sync database models and ensure tables are up-to-date
sequelize.authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL database');
        return sequelize.sync({ alter: true });  // Sync models with the database (alter=true adjusts schema)
    })
    .then(() => {
        console.log('PostgreSQL models synchronized');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Start server
const PORT = process.env.SERVER_PORT || 5000; // Use SERVER_PORT for the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
