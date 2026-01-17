import React, { useState, useEffect } from 'react';
import { useMemoryGame } from './hooks/useMemoryGame';
import GameOver from './components/GameOver';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import './styles.css';  
import axios from 'axios';

function App() {
    const { 
        cards, 
        turns, 
        handleChoice, 
        choiceOne, 
        choiceTwo, 
        disabled, 
        isWon, 
        shuffleCards 
    } = useMemoryGame();

    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchScores = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/scores');
        
            if (response.data && response.data.data) {
                setScores(response.data.data);
            } else {
                setScores([]);
            }
        } catch (error) {
            console.error("Erreur :", error);
            setScores([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchScores();
    }, []);

    const handleSaveScore = async (pseudo) => {
        try {
            await axios.post('http://localhost:5000/scores', { pseudo, coups: turns });
            await fetchScores();
            shuffleCards();
        } catch (error) {
            alert("Erreur lors de l'enregistrement du score");
        }
    };

    return (
        <div className="app-container">
            <header>
                <h1>Memory Game</h1>
                <div className="stats">
                    <p>Nombre de coups: <strong>{turns}</strong></p>
                    <button className="restart" onClick={shuffleCards}>Recommencer</button>
                </div>
            </header>

            <Board 
                cards={cards}
                handleChoice={handleChoice}
                choiceOne={choiceOne}
                choiceTwo={choiceTwo}
                disabled={disabled}
            />
            {isWon && <GameOver turns={turns} onSave={handleSaveScore} />}
            
            <div className="scoreboard-container">
                
                {loading ? <p>Chargement...</p> : <ScoreBoard scores={scores} />}
            </div>
        </div>
    );
}

export default App;