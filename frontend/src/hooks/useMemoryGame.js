//ce fichier contiens la logique du jeu , app.js ne s'occupe que de l'affichage
import { useState, useEffect } from 'react';

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐸"];

export const useMemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choice1, setChoice1] = useState(null);
  const [choice2, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isWin, setIsWin] = useState(false);

  // mellanger les cartes
  const shuffleCards = () => {
    const shuffled = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ emoji, id: Math.random(), matched: false }));

    setChoice1(null);
    setChoice2(null);
    setCards(shuffled);
    setTurns(0);
    setIsWin(false);
    setDisabled(false);
  };

  // choix des cartes
  const handleChoice = (card) => {
    if(!disabled) {
      choice1 ? setChoice2(card) : setChoice1(card);
    }
  };

  // Comparer 
  useEffect(() => {
    if (choice1 && choice2) {
      setDisabled(true);
      if (choice1.emoji === choice2.emoji) {
        setCards(prev => prev.map(card => 
          card.emoji === choice1.emoji ? { ...card, matched: true } : card
        ));
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choice1, choice2]);

  // Vérifier victoire
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setIsWin(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(prev => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return { cards, turns, handleChoice, choice1, choice2, disabled, isWin, shuffleCards };
};