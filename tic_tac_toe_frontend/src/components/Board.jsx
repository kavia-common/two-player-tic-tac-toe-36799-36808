import React from 'react';
import Square from './Square';

/**
 * Calculate the winner of a 3x3 Tic Tac Toe board.
 * Returns:
 * - { winner: 'X'|'O', line: [a,b,c] } if a winner exists
 * - null otherwise
 */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Board
 * Renders a 3x3 grid of Square components.
 */
export default function Board({ squares, onSquareClick, winningLine }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((value, i) => {
        const isWinning = winningLine?.includes(i);
        return (
          <div role="gridcell" key={i}>
            <Square
              value={value}
              onClick={() => onSquareClick(i)}
              disabled={false}
              isWinning={isWinning}
              index={i}
            />
          </div>
        );
      })}
    </div>
  );
}
