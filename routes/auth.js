'use strict'

const express = require('express')
const router = express.Router()
const { guest } = require('../middleware/auth')
const app = require('../app')

const user = {
    id: 1,
    name: 'john doe',
    email: 'john.doe@mail.com'
}

router.get('/login', guest, (req, res) => {
    req.session.previousURL = req.header('Referer') || '/'
    const data = {
        'user': req.session.user ? req.session.user : null,
        'title': 'Login'
    }
    res.render('auth/login', data)
})

router.post('/login', guest, (req, res) => {
    const {email, password} = req.body
    const previousURL = req.header('Referer') || '/login'
    req.session.user = user
    
    req.session.save(function (err) {
        if (err) return next(err)
        res.redirect(req.session.previousURL)
    })
})

router.get('/signup', guest, (req, res) => {
    const data = {
        'user': req.session.user ? req.session.user : null,
        'title': 'Signup'
    }
    res.render('auth/signup', data)
})

router.post('/signup', guest, (req, res) => {
    const previousURL = req.header('Referer') || '/signup'
    console.log(previousURL)
    res.redirect(previousURL)
})

router.get('/logout', (req, res) => {
    req.session.user = null
    const previousURL = req.header('Referer') || '/login'
    
    req.session.save(function (err) {
        if (err) {
            next(err)
        }

        req.session.regenerate(function (err) {
          if (err) {
            next(err)
          }

          res.redirect(previousURL)
        })
    })
})

module.exports = router