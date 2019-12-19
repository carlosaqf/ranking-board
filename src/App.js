import React, { useState, useEffect } from 'react'
import Player from './Components/Player/Player'
import playerService from './services/players'


const App = () => {

  const [players, setPlayers] = useState([])
  const [newPlayer, setNewPlayer] = useState({})
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  

  // GRABS ALL PLAYERS ON PAGE LOAD
  useEffect(() => {
    playerService
      .getAll()
      .then(initialPlayers => {
        setPlayers(initialPlayers)
      })
  }, [])

  // ADD A PLAYER
  const addPlayer = e => {
    e.preventDefault()
    const playerObject = {
      playerName: {
        firstName: firstName,
        lastName: lastName
      },
      imageUrl: "This is supposed to be the imageURL",
      wins: Math.floor(Math.random() * 10),
      losses: Math.floor(Math.random() * 10),
      games: []
    }
    playerService
      .create(playerObject)
      .then(returnedPlayer => {
        setPlayers(players.concat(returnedPlayer))
        setNewPlayer({})
      })
  }

  const handlefirstNameChange = e => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = e => {
    setLastName(e.target.value)
  }

  // METHOD TO OUTPUT PLAYERS AS <li>'S
  const rows = () => players.map(player => {
    {console.log('This is the player object', player)}
    return (<Player
      player={player}
    />)
  })

  
  return(
    <div>
      <h1>Players</h1>
      <ul>
        {rows()}
      </ul>
      {console.log('These are the players', players)}
      <form onSubmit={addPlayer}>
        <input
          value={firstName}
          onChange={handlefirstNameChange}
          placeholder="First Name"
        />
        <br />
        <br />
        <input
          value={lastName}
          onChange={handleLastNameChange}
          placeholder="Last Name"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App;
