'use strict'
const { use } = require('passport')
const localStrategy = require('passport-local').Strategy

module.exports = (passport) => {
    passport.use(
        new localStrategy({usernameField: 'email'}, async (email, password, done) =>  {
            const user = {
                id: 1,
                name: 'john doe',
                email: 'john.doe@mail.com'
            }

            if(!user) {
                return done(
                        null,
                        false,
                        {
                            'status': false,
                            'message': 'Invalid login attempt'
                        }
                    )
            } else {
                return done(
                        null,
                        false,
                        {
                            'status': true,
                            'message': 'You are logged in'
                        }
                    )
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
      
    passport.deserializeUser((id, done) => {
        userModel.findById(id, (err, user) => {
            if(err) return done(err)
            done(err, user)
        })
    })
}