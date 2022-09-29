require('dotenv').config()

// TODO: change the db based on prod or dev
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001

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

module.exports = { DATABASE_URL, PORT, sequelizeOptions }