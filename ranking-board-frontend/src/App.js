import React, { useState, useEffect } from 'react'
import  Footer  from './components/Footer'
import Game from './components/Game'
import gameService from './services/games'

const App = () => {
  
  const [games, setGames] = useState([])
  const [newGame, setNewGame] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    gameService
      .getAll()
      .then(initialGames => setGames(initialGames))
  }, [])
  
  const handleLogin = e => {
    e.preventDefault()
    console.log('Logging in with username', username, password)
  }

  const handleGameChange = e => {
    setNewGame(e.target.value)
  }

  const addGame = e => {
    e.preventDefault()
    const gameObj = {
      
    }

    gameService
      .create(gameObj)
      .then(data => {
        setGames(games.concat(data))
        setNewGame('')
      })
  }

  return (
    <div>
      <Game />
      <Footer />
    </div>
  )

}

export default App
