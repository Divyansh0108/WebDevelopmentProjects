import React, { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  return gameTurns.length > 0 && gameTurns[0].player === 'X' ? 'O' : 'X';
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    const activePlayer = deriveActivePlayer(gameTurns);

    const updatedBoard = [...gameBoard];
    updatedBoard[rowIndex][colIndex] = activePlayer;

    setGameBoard(updatedBoard);

    setGameTurns(prevTurns => [
      { square: { row: rowIndex, col: colIndex }, player: activePlayer },
      ...prevTurns
    ]);

    // Check for a winner
    let winnerFound = null;

    for (const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = updatedBoard[combination[0].row][combination[0].col];
      const secondSquareSymbol = updatedBoard[combination[1].row][combination[1].col];
      const thirdSquareSymbol = updatedBoard[combination[2].row][combination[2].col];

      if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
        winnerFound = firstSquareSymbol;
        break;
      }
    }

    if (winnerFound) {
      setWinner(winnerFound);
    }
  }

  const activePlayer = deriveActivePlayer(gameTurns);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} initialGameBoard={initialGameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
