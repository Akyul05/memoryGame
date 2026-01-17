import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="welcome-screen">
      <h1> Memory Game</h1>
      <p>Exerce ta mémoire en t'amusant !</p>
      
      <div className="difficulty-selection">
        <h3>Choisis ton niveau :</h3>
        <div className="buttons-container">
          <button className="btn-level easy" onClick={() => onStart(6)}>
            Facile (12 cartes)
          </button>
          <button className="btn-level medium" onClick={() => onStart(8)}>
            Moyen (16 cartes)
          </button>
          <button className="btn-level hard" onClick={() => onStart(12)}>
            Difficile (24 cartes)
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;