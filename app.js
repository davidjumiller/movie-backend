const express = require('express')
const { PORT } = require('./src/util/config')
const { Movie } = require('./src/models')

const app = express()

app.get('/api/movies', async (req, res) => {
  const movies = await Movie.findAll()
  res.json(movies)
})

app.post('/api/movies', async (req, res) => {
  await Movie.create({
    title: "Test",
    description: "TestDesc",
    releaseYear: 2022,
    duration: "00:00:00",
    rating: 4.2
  })
  res.status(201).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})