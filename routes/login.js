const express = require('express')
const router = express.Router()

router.all('/', function(req, res, next) {
    const data = {
        'title': 'Login'
    }

    if(req.method === 'POST'){
        const { email, password } = req.body
        
        if(!email)
            data.email_error = 'Email is required.'
        
        if(!password)
            data.password_error = 'Password is required.'
        
        if(data.email_error || data.password_error){
            data.email = email
            data.password = password
            data.warning_message = 'Complete required fields.'
        }else{
            data.success_message = 'Login success.'
        }
    }
    
    res.render('login', data)
})

module.exports = router
