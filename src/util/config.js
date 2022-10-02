require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || 5432
const DB_NAME = process.env.DB_NAME || 'postgres'
const DB_USER = process.env.DB_USER || 'postgres'
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres'
const PORT = process.env.PORT || 3001

// Certain options are necessary for deployment to heroku
let sequelizeOptions = {}
if (process.env.NODE_ENV === 'production') {
  sequelizeOptions = {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  }
}

module.exports = { 
  DATABASE_URL, 
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  PORT, 
  sequelizeOptions 
}