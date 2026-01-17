import React from 'react';
import PropTypes from 'prop-types';

const ScoreBoard = ({ scores }) => {
  const safeScores = Array.isArray(scores) ? scores : [];
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="scoreboard">
      <h3> Top 5 des Meilleurs Scores</h3>
      
      {safeScores.length === 0 ? (
        <p className="no-scores">Sois le premier à inscrire ton nom !</p>
      ) : (
        <ul className="score-list">
          {safeScores.map((score, index) => (
            <li key={index} className={`score-item rank-${index + 1}`}>
              <div className="score-rank">#{index + 1}</div>
              <div className="score-info">
                <span className="score-pseudo">{score.pseudo}</span>
                <span className="score-date">{formatDate(score.date)}</span>
              </div>
              <div className="score-value">{score.coups} coups</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ScoreBoard.propTypes = {
  scores: PropTypes.array.isRequired
};

export default ScoreBoard;