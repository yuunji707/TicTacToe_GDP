// src/Board.js

import React from 'react';
import './Board.css';

const Board = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <div key={index} className="square" onClick={() => onClick(index)}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default Board;
