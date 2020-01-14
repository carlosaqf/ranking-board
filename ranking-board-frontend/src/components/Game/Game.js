import React from 'react'
import { StyledGame } from './Game.styled'

const Game = (props) => {
    //console.log(game)
    return(
    
        <StyledGame>
            {console.log('PROPS passed', props)}
            {console.log('winner value', props.winner)}
            {/* {props.winner !== undefined ? props.winner : 'no winner'} */}

            <p>Game played: {props.date}</p>
            {/* User: {props.user.username} */}
            <p>Opponent: {props.opponent}</p>
            <p>Winner: {props.winner}</p>

        </StyledGame>
        
    )
}

export default Game