# Movie Backend

Live Deployment: https://peaceful-depths-73716.herokuapp.com/graphql

A simple GraphQL API built with Node, Express, Sequelize, and PostgreSQL. It Supports basic CRUD operations, and currently has no front end interface.

After connecting a suitable database, start the application with:
```
npm run dev
```
---

Available Queries:
```
type Query {
  allMovies: [Movie]!
  findMovies(title: String!): [Movie]!
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

Sample Movie Input:
```
title: "Sample Title"
description: "A description of the movie"
releaseYear: 2022
duration: "00:00:00"
rating: 4.1
```
