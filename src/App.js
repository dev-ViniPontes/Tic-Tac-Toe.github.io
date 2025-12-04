import React, { useState, useEffect } from 'react';
import Board from './Board';
import { findBestMove } from './ai';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('Sua vez (X)');
  const [gameOver, setGameOver] = useState(false);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function isBoardFull(squares) {
    return squares.every(square => square !== null);
  }

  function handleClick(i) {
    if (gameOver || squares[i]) {
      return;
    }
    if (!xIsNext) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setXIsNext(false);
  }

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setStatus(winner === 'X' ? 'Você venceu!' : 'IA venceu!');
      setGameOver(true);
      return;
    }
    if (isBoardFull(squares)) {
      setStatus("Empate!");
      setGameOver(true);
      return;
    }
    if (!xIsNext && !gameOver) {
      setStatus('IA está pensando...');
      const timer = setTimeout(() => {
        const bestMove = findBestMove(squares);
        if (bestMove !== -1) {
          const newSquares = squares.slice();
          newSquares[bestMove] = 'O';
          setSquares(newSquares);
          setXIsNext(true);
          setStatus('Sua vez (X)');
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setStatus('Sua vez (X)');
    }
  }, [squares, xIsNext, gameOver]);

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus('Sua vez (X)');
    setGameOver(false);
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <Board squares={squares} onSquareClick={handleClick} disabled={gameOver || !xIsNext} />
      <button className="restart-button" onClick={handleRestart}>Reiniciar Jogo</button>
    </div>
  );
}

export default App;
