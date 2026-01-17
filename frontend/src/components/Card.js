import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="card-scene">
      <div className={`card ${flipped ? "flipped" : ""}`} onClick={handleClick}>
        <div className="card-face card-front">❓</div>
        <div className="card-face card-back">{card.emoji}</div>
      </div>
    </div>
  );
};
Card.propTypes = {
  card: PropTypes.object.isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Card;