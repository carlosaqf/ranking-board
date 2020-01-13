/* eslint-disable no-unused-vars */
const gamesRouter = require('express').Router()
const Game = require('../models/game')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// GET TOKEN
const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')){
        return authorization.substring(7)
    }
    return null
}


// GET ALL GAMES
gamesRouter.get('/', async (req,res) => {
    const games = await Game
        .find({}).populate('user', { username: 1, name: 1, record: 1 })
    
    res.json(games.map(game => game.toJSON()))

})

// GET SINGLE GAME
gamesRouter.get('/:id', async (req,res,next) => {
    
    try {
        const game = await Game.findById(req.params.id)
        
        if (game) {
            res.json(game.toJSON())
        } else {
            res.status(404).end()
        }

    } catch(exception) {
        next(exception)
    }

})

// ADD SINGLE GAME
gamesRouter.post('/', async (req,res,next) => {

    const body = req.body

    const token = getTokenFrom(req)

    try {

        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id){
            return res.status(401).json({
                error: 'token missing or invalid'
            })
        }

        const user = await User.findById(decodedToken.id)
    
        // Winner: String,
        // setsPlayed: Number,
        // user1SetsWon: Number,
        // user2SetsWon: Number,
        // date: Date,
        // ranked: Boolean,
        // opponent: String,
        // user: user._id

        const game = new Game({
            winner: body.winner,
            date: new Date(),
            opponent: body.opponent,
            user: user._id
        })

            const savedGame = await game.save()
            user.games = user.games.concat(savedGame._id)
            await user.save()
            res.json(savedGame.toJSON())

    } catch(exception) {

        next(exception)
    
    }
})

// DELETE SINGLE GAME
gamesRouter.delete('/:id', async (req,res,next) => {
    try {

        await Game.findByIdAndRemove(req.params.id)
        res.status(204).end()

    } catch(exception) {

        next(exception)

    }
})

// UPDATE SINGLE GAME
gamesRouter.put('/:id', async (req,res,next) => {
    const body = req.body
    const user = await User.findById(body.userId)

    const game = {
        winner: body.winner,
        opponent: body.opponent
    }

    Game.findByIdAndUpdate(req.params.id, game, { new: true })
        .then(updatedGame => {
            res.json(updatedGame.toJSON())
        })
        .catch(error => next(error))

})

module.exports = gamesRouter