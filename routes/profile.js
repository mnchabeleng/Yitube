const express = require('express')
const router = express.Router()

router.all('/', function(req, res, next) {
    const data = {
        'title': 'Profile'
    }
    
    res.render('profile/index', data)
})

router.all('/email', function(req, res, next) {
    const data = {
        'title': 'Email'
    }
    
    res.render('profile/email', data)
})

router.all('/image', function(req, res, next) {
    const data = {
        'title': 'Image'
    }
    
    res.render('profile/image', data)
})

router.all('/password', function(req, res, next) {
    const data = {
        'title': 'Password'
    }
    
    res.render('profile/password', data)
})

router.all('/preferences', function(req, res, next) {
    const data = {
        'title': 'Password'
    }
    
    res.render('profile/password', data)
})

module.exports = router