const EasyGraphQLTester = require('easygraphql-tester')
const { schema, server, root } = require('../app')
const { Movie } = require('../src/models')
const moviesExample = require('./data_examples/movies_example')

const tester = new EasyGraphQLTester(schema)

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
    const response = await tester.graphql(query, root, undefined)
    expect(response.data.allMovies.length).toBe(2)
  })

  test('findMovies correctly returns one match', async () => {
    const query = `
      query TEST($title: String!) { 
        findMovies(title: $title) {
          title 
        }
      }`
    const response = await tester.graphql(query, root, undefined, { title: "#1"})
    console.log(response.data)
    expect(response.data.findMovies.length).toBe(1)
    expect(response.data.findMovies[0].title).toBe("Test Movie #1")
  })
})

describe('Mutations', () => {
  test('addMovie successfully adds', async () => {
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
      rating: 2.4
    }
    const response = await tester.graphql(mutation, root, undefined, { input: newMovie })
    expect(response.data.addMovie.title).toBe("TestTitle")
  })

  test('updateMovie successfully modifies existing movie', async () => {
    const query = `
      { 
        allMovies {
          id
        }
      }`
    let response = await tester.graphql(query, root, undefined)
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
    response = await tester.graphql(mutation, root, undefined, { id: id, input: newMovie })
    expect(response.data.updateMovie.title).toBe("Modified")
  })

  test('deleteMovie correctly returns deleted movie', async () => {
    const query = `
    { 
      allMovies {
        id
      }
    }`
    let response = await tester.graphql(query, root, undefined)
    const id = response.data.allMovies[0].id

    const mutation = `
      mutation TEST($id: Int!) {
        deleteMovie(id: $id) {
          id
        }
      }`

    response = await tester.graphql(mutation, root, undefined, { id: id})
    expect(response.data.deleteMovie.id).toBe(id)
  })
})