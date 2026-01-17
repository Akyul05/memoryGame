import React from 'react';

export default function Card({ card, handleChoice, flipped, disabled }) {
  
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
      <div className="front">
        {card.emoji}
      </div>
      <div className="back"></div>
    </div>
  );
}