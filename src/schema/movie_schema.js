const { buildSchema } = require('graphql')

// Schema for graphql
const movieSchema = buildSchema(`
  type Movie {
    id: Int
    title: String
    description: String
    releaseYear: Int
    duration: String
    rating: Float
    likes: Int
  }

  input MovieInput {
    title: String
    description: String
    releaseYear: Int
    duration: String
    rating: Float
    likes: Int
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
    incrementLikeCount(id: Int!): Movie
  }

`)

module.exports = { movieSchema }