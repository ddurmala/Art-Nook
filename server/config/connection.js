// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/art_nook_db');

// module.exports = mongoose.connection;

const { Sequelize } = require('sequelize');

// Use DATABASE_URL from environment variables or fall back to local database
const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgresql://dana:3rARQtZMmuimTN4o2N10q8D74Mbs1Vo6@dpg-cr8sq8o8fa8c73bnmp9g-a.virginia-postgres.render.com/testing_db_fag7',
    {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false, // You can enable logging for debugging
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? {
                require: true,
                rejectUnauthorized: false, // Required for some Postgres providers like Heroku/Render
            } : false,
        },
    }
);

module.exports = sequelize;