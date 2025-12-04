import React from 'react';
import Square from './Square';

function Board({ squares, onSquareClick, disabled }) {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={disabled || value !== null}
        />
      ))}
    </div>
  );
}

export default Board;
