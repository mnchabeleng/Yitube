const express = require('express')
const router = express.Router()
const validate = require('../helpers/validate')

router.all('/', function(req, res, next) {
    const data = {
        'title': 'Signup'
    }
    
    if(req.method === 'POST'){
        const { email, password, confirm_password } = req.body

        const email_error = validate.email(email, {
            required: 'Email required.',
            invalid: `"${email}" is not valid email address.`
        })

        const password_error = validate.password(password, confirm_password, {
            required: 'Password required.',
            invalid: 'Password should be at least 4 characters.',
            match: 'Password match error.'
        })

        const confirm_password_error = validate.confirmPassword(password, confirm_password, {
            required: 'Confirm password.',
            invalid: 'Password should be at least 4 characters.',
            match: 'Password match error.'
        })

        if(email_error || password_error || confirm_password_error){
            data.warning_message = 'Complete required fields.'
            data.email = email
            data.password = password
            data.confirm_password = confirm_password

            if(email_error)
                data.email_error = email_error
            
            if(password_error)
                data.password_error = password_error

            if(confirm_password_error)
                data.confirm_password_error = confirm_password_error
        }
    }

    res.render('signup', data)
})

module.exports = router
