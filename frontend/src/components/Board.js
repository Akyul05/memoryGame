import React from 'react';
import Card from './Card';

export default function Board({ cards, handleChoice, choiceOne, choiceTwo, disabled }) {
  return (
    <div className="card-grid">
      {cards.map(card => (
        <Card 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  );
}