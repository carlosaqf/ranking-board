/* eslint-disable eqeqeq */
const logger = require('./logger')

const requestLogger = (req,res,next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('---')
    next()
}

// const tokenExtractor = req => {
    
//     const authorization = req.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer')){
//         return authorization.substring(7)
//     }
//     return null
    
// }

const unknownEndpoint = (req,res) => {
    res.status(404).send({
        error: 'Unknown Endpoint'
    })
}

const errorHandler = (error,req,res,next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({
            error: 'Malformatted Id'
        })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
