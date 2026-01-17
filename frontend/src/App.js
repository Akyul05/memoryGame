import React, { useState, useEffect } from 'react';
import { useMemoryGame } from './hooks/useMemoryGame';
import GameOver from './components/GameOver';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import './styles.css';  
import axios from 'axios';

function App() {
    // CORRECTION MAJEURE ICI : On récupère choiceOne, choiceTwo et isWon
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
            console.log("données reçues du back :", response.data);
            
            // Sécurité : on s'assure que c'est bien un tableau
            setScores(Array.isArray(response.data) ? response.data : []);
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
            
            {/* CORRECTION ICI : On passe les bonnes props (choiceOne={choiceOne}) au Board */}
            <Board 
                cards={cards}
                handleChoice={handleChoice}
                choiceOne={choiceOne}
                choiceTwo={choiceTwo}
                disabled={disabled}
            />
            
            {/* CORRECTION ICI : On utilise isWon */}
            {isWon && <GameOver turns={turns} onSave={handleSaveScore} />}
            
            <div className="scoreboard">
                <h2>Classement</h2>
                {loading ? <p>Chargement...</p> : <ScoreBoard scores={scores} />}
            </div>
        </div>
    );
}

export default App;