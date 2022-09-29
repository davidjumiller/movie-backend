const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Movie = sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  releaseYear: {
    type: DataTypes.INTEGER
  },
  duration: {
    type: DataTypes.TIME
  },
  rating: {
    type: DataTypes.FLOAT
  }
}, { initialAutoIncrement: 1 })

module.exports = Movie