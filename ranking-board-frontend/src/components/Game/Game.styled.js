import styled from 'styled-components'

const StyledGame = styled.div`
    color: green;
    // height: 10vh;
    width: 90vw;
    margin: 0 auto;
    border: 1px solid black;
`

const GameContainer = styled.div`
    display: grid;
    grid-direction: column;
    grid-gap: 10px;
    padding: 5px;
    margin: 5px;
    border: 1px solid red;
`

export {
    StyledGame,
    GameContainer
}