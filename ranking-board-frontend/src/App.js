import React, { useState, useEffect } from 'react'
import  Footer  from './components/Footer'
import Game from './components/Game'
import { GameContainer } from './components/Game/Game.styled'
import gameService from './services/games'
import loginService from './services/login'
import { LoginForm, GameForm } from './components/Form'
import { useField } from './hooks'

const App = () => {
  
  const [games, setGames] = useState([])
  const [newGame, setNewGame] = useState('')
  const [opponent, setOpponent] = useState('')
  const [winner, setWinner] = useState('')

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
  const handleWinnerChange = e => {
    setWinner(e.target.value)
  }
  const handleOpponentChange = e => {
    setOpponent(e.target.value)
  }

  const addGame = e => {
    e.preventDefault()
    console.log('This is the winner value being passed', newGame)
    const gameObj = {
        date: new Date(),
        winner: winner,
        id: games.length + 1,
        // opponent: opponent
    }

    gameService
      .create(gameObj).then(returnedGame => {
        setGames(games.concat(returnedGame))
        setNewGame('')
        setWinner('')
        setOpponent('')
      })
  }


  return (
    <div>    
      
      <LoginForm />
      
      <GameForm
        addGame={addGame}
        winner={winner}
        // opponent={opponent}
        handleChange={handleGameChange}      
        handleWinnerChange={handleWinnerChange}      
        // handleOpponentChange={handleOpponentChange}      
      />

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