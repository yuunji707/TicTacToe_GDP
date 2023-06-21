// src/Game.js

import React, { useState, useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [playerSymbol, setPlayerSymbol] = useState('');
  const [computerSymbol, setComputerSymbol] = useState('');
  const [winner, setWinner] = useState(null);
  const [showSymbolSelection, setShowSymbolSelection] = useState(true);

  useEffect(() => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const checkWinner = () => {
      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          setWinner(squares[a]);
          break;
        }
      }
    };

    checkWinner();

    if (!winner && !isPlayerX && playerSymbol !== '' && computerSymbol !== '') {
      const availableSquares = squares.reduce((acc, curr, index) => {
        if (!curr) {
          return [...acc, index];
        }
        return acc;
      }, []);

      if (availableSquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSquares.length);
        const computerChoice = availableSquares[randomIndex];

        const updatedSquares = [...squares];
        updatedSquares[computerChoice] = computerSymbol;
        setSquares(updatedSquares);
        setIsPlayerX(true);
      }
    }
  }, [squares, isPlayerX, winner, playerSymbol, computerSymbol]);

  const handleClick = (index) => {
    if (squares[index] || winner || playerSymbol === '' || computerSymbol === '') {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = playerSymbol;
    setSquares(updatedSquares);
    setIsPlayerX(!isPlayerX);
    setShowSymbolSelection(false);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(''));
    setIsPlayerX(true);
    setWinner(null);
    setPlayerSymbol('');
    setComputerSymbol('');
    setShowSymbolSelection(true);
  };

  const handleSymbolChange = (symbol) => {
    if (symbol === 'X') {
      setPlayerSymbol('X');
      setComputerSymbol('O');
    } else {
      setPlayerSymbol('O');
      setComputerSymbol('X');
    }
  };

  const isBoardFull = squares.every((square) => square !== '');

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "It's a draw!";
  } else {
    status = `Next Player: ${isPlayerX ? playerSymbol : computerSymbol}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      {showSymbolSelection ? (
        <div className="symbol-selection">
          <span>Select your symbol: </span>
          <button className="symbol-button" onClick={() => handleSymbolChange('X')}>
            X
          </button>
          <button className="symbol-button" onClick={() => handleSymbolChange('O')}>
            O
          </button>
        </div>
      ) : null}
      <div className="status">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button className="restart" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};

export default Game;
