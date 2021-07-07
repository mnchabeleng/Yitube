const express = require('express')
const router = express.Router()
const axios = require('axios')
const torrentStream = require('torrent-stream')
const path = require('path')

router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  
  // Get movie by ID
  let movie = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${ id }&with_images=true&with_cast=true`)
         .then(result => result.data)
         .catch(err => null)
  
  // Get similar movies
  let relatedMovies = await axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${ id }`)
         .then(result => result.data)
         .catch(err => null)
  
  movie = movie ? movie.data.movie : null

  if(relatedMovies.data.movie_count > 0 && relatedMovies != null)
    relatedMovies = relatedMovies.data.movies

  const data = {
    'title': movie ? movie.title : 'Movie',
    'movie': movie,
    'related_movies': relatedMovies
  }

  res.render('movies/movie', data)
})

router.get('/:id/stream', async (req, res, next) => {
  const id = req.params.id
  let magnet = null
  
  // Get movie by ID
  let movie = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${ id }`)
         .then(result => result.data)
         .catch(err => null)

  movie = movie ? movie.data.movie : null
  
  // Create magnet link from movie torrent link
  if(movie){
    movie.torrents.forEach(torrent => {
      if(torrent.quality == '720p')
        magnet = `magnet:?xt=urn:btih:${ torrent.hash }&dn=${ encodeURIComponent(movie.title) }&tr=http://track.one:1234/announce&tr=udp://track.two:80`
    })
  }

  // Movie folder
  const movieFolder = `${ movie.title.replace(/\s+/g, '-').toLowerCase() }.720p`

  // Download movie to server
  const engine = torrentStream(magnet, {
    connections: 100,
    uploads: 10,
    path: `./movies/${ movieFolder }`,
    verify: true,
    dht: true,
    tracker: true,
    trackers: [
      'udp://tracker.openbittorrent.com:80',
      'udp://tracker.ccc.de:80'
    ],
  })

  // Create streamable link
  engine.on('ready', () => {
    
    engine.files = engine.files.sort(function (a, b) {
      return b.length - a.length
    }).slice(0, 1)
    
    const file = engine.files[0]
    const fileSize = file.length
    const ext = path.extname(file.name)

    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
      const chunksize = (end - start) + 1
      const stream = file.createReadStream({start, end})
      const head = {
        'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': `video/${ (ext === '.webm' || ext === '.mp4') ? ext : 'webm' }`,
      }
      res.writeHead(206, head)
      stream.pipe(res)
    } else {
      const stream = file.createReadStream()
      const head = {
        'Content-Length': fileSize,
        'Content-Type': `video/${ (ext === '.webm' || ext === '.mp4') ? ext : 'webm' }`,
      }
      res.writeHead(200, head)
      stream.pipe(res)
    }

  })
})

module.exports = router
