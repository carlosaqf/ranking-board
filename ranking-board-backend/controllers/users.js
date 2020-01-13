const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// CREATE A USER
usersRouter.post('/', async (req,res,next) => {
    try {
        const body = req.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
            record: {
                wins: body.record.wins,
                losses: body.record.losses
            }
        })

        const savedUser = await user.save()

        res.json(savedUser)

    } catch(exception) {
        next(exception)
    }
})

// RETURN LIST OF USERS
usersRouter.get('/', async (req,res) => {
    const users = await User
        .find({}).populate('games')
    
    res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter