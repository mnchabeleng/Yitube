const express = require('express')
const router = express.Router()
const axios = require('axios')
const paginate = require('express-paginate')
const db = require('../helpers/dbConnect')

router.use(paginate.middleware(18, 50))

router.all('/', async (req, res, next) => {
  let search = req.query.search ? req.query.search : null
  let order = req.query.order ? req.query.order : null

  let page = req.query.page ? req.query.page : 1
  const limit = 18
  let pageCount = 0;

  search = req.body.search ? req.body.search : search
  order = req.body.order ? req.body.order : order
  
  let movies = []

  if(search == null){
    movies = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${ page }&limit=${ limit }&sort_by=${ order }`)
           .then(result => result.data)
           .catch(e => null)
  }else{
    movies = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${ page }&limit=${ limit }&query_term=${ encodeURIComponent(search) }&sort_by=${ order }`)
           .then(result => result.data)
           .catch(e => null)
  }

  pageCount = Math.ceil(movies.data.movie_count / limit)
  const pages = paginate.getArrayPages(req)(3, pageCount, page)

  if(movies.data.movie_count > 0 && movies != null)
    movies = movies.data.movies

  const data = {
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
