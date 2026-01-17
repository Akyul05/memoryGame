// Ce fichier contient la logique du jeu App.js ne s'occupe que de l'affichage
import { useState, useEffect ,useCallback} from 'react';

const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐸",
  "🐯", "🦁", "🐮", "🐷", "🐙", "🐵", "🦄", "🐞"];

export const useMemoryGame = (nbPairs) => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoice1] = useState(null);
  const [choiceTwo, setChoice2] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [isWon, setIsWon] = useState(false); 

  // Mélanger les cartes
  const shuffleCards = useCallback(() => {
    const selectedEmojis = EMOJIS.slice(0, nbPairs);
    const shuffled = [...selectedEmojis, ...selectedEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ emoji, id: Math.random(), matched: false }));

    setChoice1(null);
    setChoice2(null);
    setCards(shuffled);
    setTurns(0);
    setIsWon(false);
    setDisabled(false);
  }, [nbPairs]);

  // Choix des cartes
  const handleChoice = (card) => {
    if(!disabled) {
      choiceOne ? setChoice2(card) : setChoice1(card);
    }
  };

  // Comparer 
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards(prev => prev.map(card => 
          card.emoji === choiceOne.emoji ? { ...card, matched: true } : card
        ));
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Vérifier victoire
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setIsWon(true);
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
  }, [shuffleCards]);

 
  return { cards, turns, handleChoice, choiceOne, choiceTwo, disabled, isWon, shuffleCards };
};