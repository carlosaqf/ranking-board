import React from 'react'

const Player = ({ player }) => {
    return(
        <div style={{border: '1px solid black'}}>
            <h3>{player.playerName.firstName ? player.playerName.firstName : 'Default'} {player.playerName.lastName ? player.playerName.lastName : 'Name'}</h3>
            <ul style={{listStyle: 'none'}}>
                <li>Wins: {player.wins}</li>
                <li>Losses: {player.losses}</li>
            </ul>
        </div>
    )
}

export default Player