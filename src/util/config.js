require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL
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

module.exports = { DATABASE_URL, PORT, sequelizeOptions }