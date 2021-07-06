const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.use('/', require('./routes/index'))
app.use('/browse', require('./routes/browse'))
app.use('/movies', require('./routes/movies'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))
app.use('/signup', require('./routes/signup'))
app.use('/profile', require('./routes/profile'))

app.use(session({
  secret: 'Hello World!',
  resave: false,
  saveUninitialized: true
}))

// Flash messaging
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_message')
    res.locals.error_msg = req.flash('error_message')
    res.locals.warning_msg = req.flash('warning_message')
    res.locals.error = req.flash('error')
    next()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error'  )
})

module.exports = app
