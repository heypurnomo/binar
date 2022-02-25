require('dotenv').config();

module.exports = {
    APP_PORT: process.env.APP_PORT || 3000,
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_DATABASE: process.env.DB_DATABASE || 'pipin_dev',
    DB_PASSWORD: process.env.DB_PASSWORD || 'password',
}