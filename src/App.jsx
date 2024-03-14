import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log.jsx";
import Player from "./components/Player.jsx";
import {useState} from 'react';

const initialGameBoard = [ 
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer (prevTurns){
  let currentPlayer = 'X';
  if(prevTurns.length > 0 && prevTurns[0].player == 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function checkForWinner(board,playerX,playerO) {
  // Check rows
  let symbol = null;
  let winner = null;

  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      symbol = board[i][0]; 
    }
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] &&
      board[0][j] === board[1][j] &&
      board[0][j] === board[2][j]
    ) {
      symbol = board[0][j]; 
    }
  }
  // Check diagonals
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    symbol = board[0][0]; 
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    symbol = board[0][2]; 
  }
  if(symbol!= null){
    if(symbol == 'X'){
      winner = playerX;
    }
    else{
      winner = playerO;
    }
    return `${winner} wygrał!`
  }
  else if (board.flat().every((cell) => cell !== null)) {
    return "Remis";
  }
  else{
    return null;
  }
}

function App() {
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  let winner;

  const [gameTurn, setGameTurn] = useState([]);
  const [currentNameX, setCurrentNameX] = useState('Player 1')
  const [currentNameO, setCurrentNameO] = useState('Player 2')

  const changeNameX = (event) => {
    setCurrentNameX(event.target.value);
  }
  const changeNameO = (event) => {
    setCurrentNameO(event.target.value);
  }

  const handleRematch = () =>{
    setGameTurn([]);
  }

  const activePlayer = deriveActivePlayer(gameTurn);

  function SwitchPlayer(rowIndex,colIndex){
    setGameTurn((prevTurns) => {
      const updatedTurns = [{square:{ row: rowIndex, col: colIndex }, player: activePlayer }, ...prevTurns];
      
      return updatedTurns;
    })
  }
  
  for(const turn of gameTurn){
    const {square , player} = turn;
    const {row, col} = square;
    
    gameBoard[row][col] = player;
  }

  winner = checkForWinner(gameBoard, currentNameX, currentNameO);


  return (
    <>
      <div id = "game-container">
        <ol id = "players" className="highlight-player">
          <Player name = {currentNameX} symbol = "X" isActive={activePlayer == 'X'} changeNameEvent = {changeNameX}/>
          <Player name = {currentNameO} symbol = "O" isActive={activePlayer == 'O'} changeNameEvent = {changeNameO}/>
        </ol>
        <GameBoard onSquareSelect = {SwitchPlayer} turns = {gameTurn} board = {gameBoard}/>
        {winner && <GameOver winner = {winner} handleRematch = {handleRematch}/>}
      </div>
      <Log nameX = {currentNameX} nameO = {currentNameO} turns = {gameTurn}/>
      
    </>
  )
}

export default App
