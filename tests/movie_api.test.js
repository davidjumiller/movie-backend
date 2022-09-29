const EasyGraphQLTester = require('easygraphql-tester')
const { server } = require('../app')
const { Movie } = require('../src/models')
const { movieSchema } = require('../src/schema/movie_schema')
const { movieResolvers } = require('../src/schema/movie_resolvers')
const moviesExample = require('./data_examples/movies_example')

const tester = new EasyGraphQLTester(movieSchema)

beforeAll(async () => {
  await Movie.destroy({
    where: {},
    truncate: true
  })
  for (let movie of moviesExample) {
    await Movie.create(movie)
  }
})

afterAll(() => {
  return server.close()
})

describe('Queries', () => {
  test('allMovies returns 2 movies', async () => {
    const query = `{ 
      allMovies {
        title 
      }
    }`
    const response = await tester.graphql(query, movieResolvers, undefined)
    expect(response.data.allMovies.length).toBe(2)
  })

  test('findMovies correctly returns one match', async () => {
    const query = `
      query TEST($title: String!) { 
        findMovies(title: $title) {
          title 
        }
      }`
    const response = await tester.graphql(query, movieResolvers, undefined, { title: "#1"})
    expect(response.data.findMovies.length).toBe(1)
    expect(response.data.findMovies[0].title).toBe("Test Movie #1")
  })
})

describe('Mutations', () => {
  test('addMovie successfully', async () => {
    const mutation = `
      mutation TEST($input: MovieInput) {
        addMovie(input: $input) {
          title
        }
      }`
    const newMovie = {
      title: "TestTitle",
      description: "TestDesc",
      releaseYear: 2022,
      duration: "00:00:00",
      rating: 2.4,
      likes: 0
    }
    const response = await tester.graphql(mutation, movieResolvers, undefined, { input: newMovie })
    expect(response.data.addMovie.title).toBe("TestTitle")
  })

  test('updateMovie successfully modifies existing movie', async () => {
    const query = `
      { 
        allMovies {
          id
        }
      }`
    let response = await tester.graphql(query, movieResolvers, undefined)
    const id = response.data.allMovies[0].id
    const mutation = `
      mutation TEST($id: Int!, $input: MovieInput) {
        updateMovie(id: $id, input: $input) {
          title
        }
      }`
    const newMovie = {
      title: "Modified",
      description: "TestDesc",
      releaseYear: 2022,
      duration: "00:00:00",
      rating: 2.4
    }
    response = await tester.graphql(mutation, movieResolvers, undefined, { id: id, input: newMovie })
    expect(response.data.updateMovie.title).toBe("Modified")
  })

  test('deleteMovie correctly returns deleted movie', async () => {
    const query = `
    { 
      allMovies {
        id
      }
    }`
    let response = await tester.graphql(query, movieResolvers, undefined)
    const id = response.data.allMovies[0].id

    const mutation = `
      mutation TEST($id: Int!) {
        deleteMovie(id: $id) {
          id
        }
      }`

    response = await tester.graphql(mutation, movieResolvers, undefined, { id: id})
    expect(response.data.deleteMovie.id).toBe(id)
  })

  test('increment like count', async () => {
    const query = `
    { 
      allMovies {
        id
        likes
      }
    }`
    let response = await tester.graphql(query, movieResolvers, undefined)
    const id = response.data.allMovies[0].id
    const prevLikeCount = response.data.allMovies[0].likes
    const mutation = `
      mutation TEST($id: Int!) {
        incrementLikeCount(id: $id) {
          id
          likes
        }
      }`

    response = await tester.graphql(mutation, movieResolvers, undefined, { id: id })
    expect(response.data.incrementLikeCount.likes).toBe(prevLikeCount+1)
  })
})