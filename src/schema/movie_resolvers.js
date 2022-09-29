const { Op } = require("sequelize");
const { Movie } = require('../models')

const movieResolvers = {
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
    const { title, description, releaseYear, duration, rating } = args.input
    return await Movie.create({
      title: title,
      description: description,
      releaseYear: releaseYear,
      duration: duration,
      rating: rating,
      likes: 0
    })
  },

  updateMovie: async (args) => {
    const { title, description, releaseYear, duration, rating, likes } = args.input
    const movie = await Movie.findByPk(args.id)
    if (!movie) return null
    movie.set({
      title: title? title : movie.title,
      description: description? description : movie.description,
      releaseYear: releaseYear? releaseYear : movie.releaseYear,
      duration: duration? duration : movie.duration,
      rating: rating? rating : movie.rating,
      likes: likes? likes : movie.likes
    })
    return await movie.save()
  },

  deleteMovie: async ({ id }) => {
    const movie = await Movie.findByPk(id)
    await movie.destroy()
    return movie
  },

  incrementLikeCount: async ({ id }) => {
    const movie = await Movie.findByPk(id)
    movie.set({
      likes: movie.likes+1
    })
    return await movie.save()
  }
}

module.exports = { movieResolvers }