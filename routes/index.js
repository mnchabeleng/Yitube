const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res, next) => {
  let recentlyAddeedMovies = []
  let popularMovies = []
  let topRatedMovies = []
  
  // Get recently added movies
  recentlyAddeedMovies = await axios.get('https://yts.mx/api/v2/list_movies.json?limit=6&sort_by=date_added')
         .then(result => result.data.data.movies)
         .catch(e => null)

  // Get popular movies
  popularMovies = await axios.get('https://yts.mx/api/v2/list_movies.json?limit=6&sort_by=download_count')
         .then(result => result.data.data.movies)
         .catch(e => null)

  // Get top rated movies
  topRatedMovies = await axios.get('https://yts.mx/api/v2/list_movies.json?limit=6&sort_by=rating')
         .then(result => result.data.data.movies)
         .catch(e => null)

  const data = {
    'title': 'Yitube',
    'recently_added_movies': recentlyAddeedMovies,
    'popular_movies': popularMovies,
    'top_rated_movies': topRatedMovies
  }

  res.render('home', data)
})

module.exports = router
