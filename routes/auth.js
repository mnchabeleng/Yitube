'use strict'

const express = require('express')
const router = express.Router()
const { guest } = require('../middleware/auth')

router.get('/login', guest, (req, res) => {
    const fullURL = req.protocol + '://' + req.get('host') + req.originalUrl
    
    if(fullURL != req.header('Referer')) {
        req.session.previousURL = req.header('Referer') || '/'
    }
    
    const data = {
        'user': req.session.user ? req.session.user : null,
        'title': 'Login'
    }

    res.render('auth/login', data)
})

router.post('/login', guest, (req, res) => {
    const {email, password} = req.body
    const previousURL = req.header('Referer') || '/login'
    
    // At this point your welcome to use any auth provider
    if(email == process.env.EMAIL && password == process.env.PASSWORD) {
        req.session.user = { username: process.env.EMAIL }
        req.session.save(function (err) {
            if (err) return next(err)
            res.redirect(req.session.previousURL)
        })
    } else {
        const data = {
            'user': req.session.user ? req.session.user : null,
            'title': 'Login',
            'email': email,
            'formResponse': 'Invalid login attempt'
        }
    
        res.render('auth/login', data)
    }

})

router.get('/signup', guest, (req, res) => {
    const data = {
        'user': req.session.user ? req.session.user : null,
        'title': 'Signup'
    }
    res.render('auth/signup', data)
})

router.post('/signup', guest, (req, res) => {
    const data = {
        'user': req.session.user ? req.session.user : null,
        'title': 'Signup'
    }
    res.render('auth/signup', data)
})

router.get('/logout', (req, res) => {
    req.session.user = null
    
    req.session.save(function (err) {
        if (err) next(err)
        
        req.session.regenerate(function (err) {
            if (err) next(err)
            
            const previousURL = req.header('Referer') || '/login'
            res.redirect(previousURL)
        })
    })
})

module.exports = router