// models/Post.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Post.belongsTo(User, { foreignKey: 'author' });

module.exports = Post;
