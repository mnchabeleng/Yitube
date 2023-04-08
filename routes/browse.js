'use strict'

const express = require('express')
const router = express.Router()
const axios = require('axios')
const paginate = require('express-paginate')

// Express pagination middleware
const limitPerPage = 36
router.use(paginate.middleware(limitPerPage, 50))

router.all('/', async (req, res, next) => {
  let search = req.query.search ? req.query.search : null
  let order = req.query.order ? req.query.order : null

  let page = req.query.page ? req.query.page : 1
  const limit = limitPerPage
  let pageCount = 0;

  search = req.body.search ? req.body.search : search
  order = req.body.order ? req.body.order : order
  
  let movies = []

  if(search == null){
    // Get movies without search keyword
    movies = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${ page }&limit=${ limit }&sort_by=${ order }`, { timeout: 3000 })
           .then(result => result.data)
           .catch(e => null)
  }else{
    // Get movies with search keyword
    movies = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${ page }&limit=${ limit }&query_term=${ encodeURIComponent(search) }&sort_by=${ order }`, { timeout: 3000 })
           .then(result => result.data)
           .catch(e => null)
  }

  // Create pagination pages
  pageCount = Math.ceil(movies.data.movie_count / limit)
  const pages = paginate.getArrayPages(req)(3, pageCount, page)

  if(movies.data.movie_count > 0 && movies != null)
    movies = movies.data.movies

  const data = {
    'user': req.session.user ? req.session.user : null,
    'title': 'Browse',
    'page': page,
    'search': search,
    'order': order,
    'movies': movies,
    'pages': pages,
    'limit': limit,
    'pageCount': pageCount
  }

  res.render('browse', data)
})

module.exports = router
