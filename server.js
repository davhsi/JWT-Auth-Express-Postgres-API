// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/db'); // Import the sequelize instance
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Connect to the database and sync models
const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to PostgreSQL database');

        await sequelize.sync({ alter: true }); // Sync models with the database
        console.log('PostgreSQL models synchronized');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit the application if database connection fails
    }
};

// Start the server
const startServer = async () => {
    await connectToDatabase();

    const PORT = process.env.SERVER_PORT || 5000; // Use SERVER_PORT for the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Run the server
startServer();
