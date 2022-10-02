const { Sequelize } = require('sequelize')
const { DATABASE_URL, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, sequelizeOptions } = require('./config')

let sequelize
if (DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, sequelizeOptions)
} else {
  // This is for connecting to a new postgres instance created through github actions
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres'
  }, sequelizeOptions)
}

// Connect to postgreSQL through sequelize
const connectToDB = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDB, sequelize }