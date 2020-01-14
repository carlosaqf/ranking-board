import React, { useState, useEffect } from 'react'
import  Footer  from './components/Footer'
import Game from './components/Game'
import { GameContainer } from './components/Game/Game.styled'
import gameService from './services/games'
import loginService from './services/login'
import { LoginForm, GameForm } from './components/Form'

const App = () => {
  
  const [games, setGames] = useState([])
  const [newGame, setNewGame] = useState('')

  // HOOK - GRABS ALL GAMES IN DB
  useEffect(() => {
    gameService
      .getAll()
      .then(initialGames => setGames(initialGames))

  }, [])

  // DISPLAY ALL GAMES
  const displayGames = () => games.map(game => (
    <Game key={game.id} {...game} />
  ))

  const displayUserGames = (user) => {

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
      
      <LoginForm />

      <GameForm />

      <GameContainer>
        {displayGames()}
      </GameContainer>

      {console.log(games)}

      <Footer />

    </div>
  )

}

export default App



{/* 
  {user === null ?
    <h2>Login</h2> :
    <h2>Welcome, {user.name}</h2>
  }
*/}

{/*
  {user === null ?
    loginForm() : 
    <div>
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>Log Out</button>
      {console.log('user info', user)}
    </div>
  }
*/}

{/*
  {user !== null && gameForm()} 
*/}

{/* 
  CAN MAKE CONDITIONAL
  {user === null ? loginForm() : gameForm()}
*/}