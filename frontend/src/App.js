import React, { useState, useEffect } from 'react';
import { useMemoryGame } from './hooks/useMemoryGame';
import GameOver from './components/GameOver';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import WelcomeScreen from './components/WelcomScreen';
import './styles.css';  
import axios from 'axios';

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [difficulty, setDifficulty] = useState(8);
    const { 
        cards, 
        turns, 
        handleChoice, 
        choiceOne, 
        choiceTwo, 
        disabled, 
        isWon, 
        shuffleCards 
    } = useMemoryGame(difficulty);

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
    const handleStartGame = (level) => {
        setDifficulty(level);
        setGameStarted(true);
        shuffleCards(); 
    };

    const handleQuit = () => {
        setGameStarted(false);
        setDifficulty(8); 
    };

    const handleSaveScore = async (pseudo) => {
        try {
            await axios.post('http://localhost:5000/scores', { pseudo, coups: turns });
            await fetchScores();
            shuffleCards(false);
        } catch (error) {
            alert("Erreur lors de l'enregistrement du score");
        }
    };

    return (
        <div className="app-container">
            {!gameStarted ? (
                // accueil
                <div className="menu-container">
                    <WelcomeScreen onStart={handleStartGame} />
                    <div className="scoreboard-container home-scoreboard">
                         {/* On affiche aussi les scores sur l'accueil, c'est sympa */}
                        {loading ? <p>Chargement...</p> : <ScoreBoard scores={scores} />}
                    </div>
                </div>
            ) : (
                // ecran de jeu
                <>
                    <header>
                        <div className="header-top">
                            <button className="btn-back" onClick={handleQuit}>⬅ Menu</button>
                            <h1>Memory Game</h1>
                        </div>
                        <div className="stats">
                            <p>Coups: <strong>{turns}</strong></p>
                            <button className="restart" onClick={shuffleCards}>Recommencer</button>
                        </div>
                    </header>
                    
                    <div className={`game-board level-${difficulty}`}>
                        <Board 
                            cards={cards}
                            handleChoice={handleChoice}
                            choiceOne={choiceOne}
                            choiceTwo={choiceTwo}
                            disabled={disabled}
                        />
                    </div>
                    
                    {isWon && <GameOver turns={turns} onSave={handleSaveScore} />}
                </>
            )}
        </div>
    );
}

export default App;