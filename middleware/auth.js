'use strict'

exports.guest = (req, res, next) => {
    if(req.session.user) {
        const previousURL = req.session.previousURL || '/'
        return res.redirect(previousURL)
    }
    return next()
}