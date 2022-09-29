const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')

const { PORT } = require('./src/util/config')
const { movieSchema } = require('./src/schema/movie_schema')
const { movieResolvers } = require('./src/schema/movie_resolvers')
require('./src/models')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/graphql', graphqlHTTP({
  schema: movieSchema,
  rootValue: movieResolvers,
  graphiql: true,
}))

// Health check for github actions CD
app.get('/health', (_, res) => {
  res.status(200).end()
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { server }