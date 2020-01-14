import React, { useState, useEffect } from 'react'
import { StyledLoginForm, StyledGameForm } from './Form.styled'
import gameService from '../../services/games'
import loginService from '../../services/login'
import Toggable from '../Toggable';

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [loginVisible, setLoginVisible] = useState(false)

    // HOOK - ASSIGNS TOKEN TO LOGGED IN USER
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedRankingBoardAppUser')
        if (loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            gameService.setToken(user.token)
        }
    }, [])

    // USER HITS LOGIN
    const handleLogin = async e => {
        e.preventDefault()
        console.log('Logging in with username', username, password)
    
        try {
    
          const user = await loginService.login({
            username, password
          })
    
          window.localStorage.setItem(
            'loggedRankingBoardAppUser', JSON.stringify(user)
          )
    
          gameService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
    
        } catch(exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    }

    // USER HITS LOGOUT
    const handleLogOut = async e => {
        e.preventDefault()
        window.localStorage.removeItem('loggedRankingBoardAppUser')
        console.log('Logging user off')
    }

    const hideWhenVisible = { display: loginVisible ? 'none' : ''}
    const showWhenVisible = { display: loginVisible ?  '' : 'none'}

    return(
        <StyledLoginForm>

            {user === null ?
                <h2>Login</h2> :
                <h2>Welcome, {user.name}</h2>
            }

            <div style={hideWhenVisible}>
                <button onClick={() => setLoginVisible(true)}>Login</button>
            </div>

            {user !== null ?
                <div>
                    <p>{user.name} logged in</p>
                    <button onClick={handleLogOut}>Log Out</button>
                    {console.log('user info', user)}
                </div> :
                

            <div style={showWhenVisible}>
            
                <form onSubmit={handleLogin}>
                    <div>
                        Username:
                        <input 
                            type='text'
                            value={username}
                            name='Username'
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>

                    <div>
                        Password:
                        <input
                            type='password'
                            value={password}
                            name='Password'
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
        
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                </form>
                <button onClick={() => setLoginVisible(false)}>Cancel</button>

            </div>

            }
        </StyledLoginForm>
    )

}

const GameForm = ({ onSubmit, handleChange, value }) => {
    return(
        <StyledGameForm>
            <h2>Add a new game</h2>

            <Toggable buttonLabel='New Game'>
                <form onSubmit={onSubmit}>
                    <input
                        value={value}
                        onChange={handleChange}
                        />
                    <button type='submit'>Save</button>
                </form>
            </Toggable>
            
        </StyledGameForm>
    )

}

export {
    LoginForm,
    GameForm
}



// const loginForm = () => (
//     <form onSubmit={handleLogin}>
//         <div>
//           username
//           <input
//             type='text'
//             value={username}
//             name='Username'
//             onChange={({ target }) => setUsername(target.value)}
//           />
//         </div>

//         <div>
//           password
//           <input
//             type='password'
//             value={password}
//             name='Password'
//             onChange={({ target }) => setPassword(target.value)}
//           />
//         </div>

//         <div>
//           <button type='submit'>Login</button>
//         </div>
//       </form>
//   )