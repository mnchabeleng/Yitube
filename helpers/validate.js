const regex = {
    username:/^[a-zA-Z0-9_-]+$/,
    email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    name:/^[a-zA-Z]+$/,
    password:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{4,1000}$/
}

module.exports.username = (username, messages) => {
    const reg = regex.username
    if (!username || username == '')
        return messages.required
    else if (!reg.test(username))
        return messages.invalid
    return undefined
}

module.exports.email = (email, messages) => {
    const reg = regex.email
    if (!email || email == '')
        return messages.required
    else if (!reg.test(email))
        return messages.invalid
    return undefined
}

module.exports.name = (name, messages) => {
    const reg = regex.name
    if (!name || name == '')
        return messages.required
    else if (!reg.test(name))
        return messages.invalid    
    return undefined
}

module.exports.oldPassword = (oldPassword, messages) => {
    if (!oldPassword || oldPassword == '')
        return messages.required
    return undefined
}

module.exports.password = (password, confirmPassword, messages) => {
    if (!password || password == '')
        return messages.required
    else if (password != confirmPassword && confirmPassword)
        return messages.match
    else if (password.length < 4)
        return messages.invalid
    return undefined
}

module.exports.confirmPassword = (password, confirmPassword, messages) => {
    if (!confirmPassword || confirmPassword == '')
        return messages.required
    else if (password != confirmPassword && password)
        return messages.match
    else if (confirmPassword.length < 4)
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