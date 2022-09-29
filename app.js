const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const { Op } = require("sequelize");

const { PORT } = require('./src/util/config')
const { Movie } = require('./src/models')

const app = express()

app.use(cors())
app.use(express.json())

// TODO: refactor into separate files
const schema = buildSchema(`
  type Movie {
    id: Int
    title: String
    description: String
    releaseYear: Int
    duration: String
    rating: Float
  }
  input MovieInput {
    title: String
    description: String
    releaseYear: Int
    duration: String
    rating: Float
  }
  type Query {
    allMovies: [Movie]!
    findMovies(title: String!): [Movie]
  }
  type Mutation {
    addMovie(input: MovieInput): Movie
    updateMovie(
      id: Int!
      input: MovieInput
    ): Movie
    deleteMovie(id: Int!): Movie
  }
`)

const root = {
  allMovies: async () => {
    return await Movie.findAll()
  },
  findMovies: async ({ title }) => {
    return await Movie.findAll({
      where: {
        title: {
          [Op.iLike]: `%${title}%`
        }
      }
    })
  },
  addMovie: async (args) => {
    return await Movie.create({
      title: args.input.title,
      description: args.input.description,
      releaseYear: args.input.releaseYear,
      duration: args.input.duration,
      rating: args.input.rating
    })
  },
  updateMovie: async (args) => {
    const movie = await Movie.findByPk(args.id)
    if (!movie) return null
    movie.set({
      title: args.input.title? args.input.title : movie.title,
      description: args.input.description? args.input.description : movie.description,
      releaseYear: args.input.releaseYear? args.input.releaseYear : movie.releaseYear,
      duration: args.input.duration? args.input.duration : movie.duration,
      rating: args.input.rating? args.input.rating : movie.rating
    })
    return await movie.save()
  },
  deleteMovie: async (args) => {
    const movie = await Movie.findByPk(args.id)
    await movie.destroy()
    return movie
  }
}

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}))

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, schema, root, server }