import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square
 * A single cell in the Tic Tac Toe board.
 * - Accessible button with role="button", aria-pressed state, and keyboard focus outlines.
 * - Shows X or O with retro themed styles.
 */
export default function Square({ value, onClick, disabled = false, isWinning = false, index }) {
  const label = value ? `Cell ${index + 1}, ${value}` : `Cell ${index + 1}, empty`;
  return (
    <button
      type="button"
      className={[
        'square-btn',
        value === 'X' ? 'square-x' : '',
        value === 'O' ? 'square-o' : '',
        isWinning ? 'square-win' : ''
      ].join(' ').trim()}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={!!value}
      data-index={index}
    >
      {value}
    </button>
  );
}
