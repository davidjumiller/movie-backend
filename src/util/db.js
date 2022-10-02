const { Sequelize } = require('sequelize')
const { DATABASE_URL, sequelizeOptions } = require('./config')

let sequelize
if (DATABASE_URL) {
  sequelize = new Sequelize(DATABASE_URL, sequelizeOptions)
} else {
  // This is for connecting to a new postgres instance created through github actions
  sequelize = new Sequelize('postgres', 'postgres', 'password', {
    host: 'localhost',
    port: 5432,
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