const createError = require('http-errors')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'b121c24de8a5a4b7dcda63a0afa56d2d72fa7c8b83adbd6bcbe72858552621ac',
  resave: false,
  saveUninitialized: true
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/index'))
app.use('/browse', require('./routes/browse'))
app.use('/movies', require('./routes/movies'))

// auth routes
app.use('/', require('./routes/auth'))

// api routes
app.use('/api/movies', require('./routes/api/movies'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render 404
  if(err.status === 404){
    const data = {
      'title': 404
    }
    res.render('404', data)
  }

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
