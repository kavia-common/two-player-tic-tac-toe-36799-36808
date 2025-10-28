import React, { useMemo, useState } from 'react';
import './App.css';
import './styles/theme.css';
import Board, { calculateWinner } from './components/Board';

/**
 * PUBLIC_INTERFACE
 * App
 * Two-player Tic Tac Toe game with retro theme.
 * - Centered layout and 3x3 grid
 * - Current player indicator
 * - Win/draw detection with messages
 * - Restart button
 * - Accessible status via ARIA live region
 */
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = useMemo(() => calculateWinner(squares), [squares]);
  const isBoardFull = useMemo(() => squares.every(Boolean), [squares]);
  const hasWinner = !!result?.winner;
  const winningLine = result?.line || null;
  const currentPlayer = xIsNext ? 'X' : 'O';

  const statusText = hasWinner
    ? `Winner: ${result.winner}`
    : isBoardFull
    ? 'Draw game!'
    : `Next player: ${currentPlayer}`;

  function handleSquareClick(i) {
    // Do not allow move if already filled or game over
    if (squares[i] || hasWinner) return;
    const next = squares.slice();
    next[i] = currentPlayer;
    setSquares(next);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Dynamic status chip styling
  const statusClass =
    hasWinner ? 'status-chip success' : isBoardFull ? 'status-chip error' : 'status-chip primary';

  return (
    <div className="app-shell">
      <main className="card" role="region" aria-label="Tic Tac Toe game area">
        <h1 className="app-title" aria-label="Game title">Tic Tac Toe</h1>
        <p className="app-subtitle">Two Players • One Device</p>

        <div className="status-bar" aria-live="polite" aria-atomic="true">
          <span className={statusClass}>{statusText}</span>
        </div>

        <Board
          squares={squares}
          onSquareClick={handleSquareClick}
          winningLine={winningLine}
        />

        <div className="controls">
          <button
            type="button"
            onClick={resetGame}
            className="btn btn-primary"
            aria-label="Start a new game"
          >
            ↻ New Game
          </button>
        </div>

        <div className="footer-note">Tip: Use mouse or keyboard to play. Focus a cell and press Enter/Space.</div>
      </main>
    </div>
  );
}

export default App;
