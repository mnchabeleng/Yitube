'use strict'

const regex = {
    username:/^[a-zA-Z0-9_-]+$/,
    email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name:/^[a-zA-Z]+$/,
    password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,1000}$/
}

module.exports.username = (username) => {
    if (reg.test(username))
        return true
    return false
}

module.exports.email = (email, messages) => {
    const reg = regex.email
    if (!email || email == '')
        return messages.required
    else if (!reg.test(email))
        return messages.invalid
    return undefined
}

module.exports.name = (name) => {
    if (reg.test(name))
        return true    
    return false
}

module.exports.passwordOld = (passwordOld, messages) => {
    if (!passwordOld || passwordOld == '')
        return messages.required
    return undefined
}

module.exports.password = (password, passwordRepeat, messages) => {
    if (!password || password == '')
        return messages.required
    else if (password != passwordRepeat && passwordRepeat)
        return messages.match
    else if (password.length < 4)
        return messages.invalid
    return undefined
}

module.exports.passwordRepeat = (password, passwordRepeat, messages) => {
    if (!passwordRepeat || passwordRepeat == '')
        return messages.required
    else if (password != passwordRepeat && password)
        return messages.match
    else if (passwordRepeat.length < 4)
        return messages.invalid    
    return undefined
}

module.exports.image = (image, messages) => {
    if(!image || image === null || image === null)
        return messages.required
    else if(image.mimetype != 'image/png' && image.mimetype != 'image/jpg' && image.mimetype != 'image/jpeg')
        return messages.type
    else if(image.size > 1000000)
        return messages.size
    return undefined
}

module.exports.capitalize = (str) => {
    if(!str)
        return ''
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}