const jwt = require('../lib/jwt')

function auth (request, response, next){
    try {
        const authorization = request.headers.authorization || ''

        const token = authorization.replace('Bearer ', '')

        const isTokenValid = jwt.verify(token)
        console.log(isTokenValid)
        next()
    } catch (error) {
        response.status(401)
        response.json({
            ok: false,
            error: error.message
        })
    }
}
    

module.exports = auth