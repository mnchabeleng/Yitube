const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res, next) => {
    let search = req.query.search ? req.query.search : null
    let order = req.query.order ? req.query.order : null

    let page = req.query.page ? req.query.page : 1
    const limit = 10
    let pageCount = 0;

    search = req.body.search ? req.body.search : search
    order = req.body.order ? req.body.order : order
  
    let movies = []

    if(search == null){
        // Get movies without search keyword
        movies = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${ page }&limit=${ limit }&sort_by=${ order }`)
                .then(result => result.data)
                .catch(e => null)
    }else{
        // Get movies with search keyword
        movies = await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${ page }&limit=${ limit }&query_term=${ encodeURIComponent(search) }&sort_by=${ order }`)
                .then(result => result.data)
                .catch(e => null)
    }

    if(movies.data.movie_count > 0 && movies != null)
        movies = movies.data.movies
    else
        movies = []

    res.status(200).json(movies)
})

module.exports = router