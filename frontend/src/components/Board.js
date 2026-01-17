import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const Board = ({ cards, handleChoice, choiceOne, choiceTwo, disabled }) => {
  return (
    <div className="board">
      {cards.map((card) => (
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
};

Board.propTypes = {
  cards: PropTypes.array.isRequired,
  handleChoice: PropTypes.func.isRequired,
  choiceOne: PropTypes.object,
  choiceTwo: PropTypes.object,
  disabled: PropTypes.bool.isRequired
};

export default Board;