const {DB_USERNAME, DB_PASSWORD, DB_DATABASE} = require('./myConfig')
module.exports = 
{
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_DATABASE,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postges"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
