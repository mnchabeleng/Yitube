'use strict'

exports.guest = (req, res, next) => {
    if(req.session.user) {
        return res.redirect('/')
    }
    return next()
}