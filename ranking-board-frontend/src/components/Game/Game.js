import React from 'react'
import { StyledGame } from './Game.styled'

const Game = ({ game }) => {

    return(
        <StyledGame>
            Game 1
            {game}
        </StyledGame>
    )
}

export default Game