const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    winner: String,
    // setsPlayed: Number,
    // user1SetsWon: Number,
    // user2SetsWon: Number,
    date: Date,
    // ranked: Boolean,
    opponent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

gameSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Game', gameSchema)

