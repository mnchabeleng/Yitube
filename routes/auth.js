'use strict'
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res, next) => {
    const data = {
        'title': 'Login'
    }
    res.render('pages/auth/login', data)
})

router.post('/login', (req, res, next) => {
    const {
        email,
        password
    } = req.body

    console.log('login')
    res.sendStatus(200)
})

router.get('/signup', (req, res, next) => {
    const data = {
        'title': 'Signup'
    }
    res.render('pages/auth/signup', data)
})

router.post('/signup', (req, res, next) => {
    console.log('signup')
    res.sendStatus(200)
})

module.exports = router