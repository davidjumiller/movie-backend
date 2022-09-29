# Movie Backend

Live Deployment: https://peaceful-depths-73716.herokuapp.com/graphql

A simple CRUD API built with Node, express, graphql, sequelize, and postgreSQL

After connecting a suitable database, start the application with:
```
npm run dev
```
---

Available Queries:
```
type Query {
  allMovies: [Movie]!
  findMovies(title: String!): [Movie]
}
```

Available Mutations:
```
type Mutation {
  addMovie(input: MovieInput): Movie
  updateMovie(id: Int!, input: MovieInput): Movie
  deleteMovie(id: Int!): Movie
  incrementLikeCount(id: Int!): Movie
}
```

Currently no front end application available.
