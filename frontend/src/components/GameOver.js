import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const GameOver = ({ turns, onSave }) => {
  const [pseudo, setPseudo] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Petit feu d'artifice à l'ouverture
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pseudo.trim()) return;
    
    setIsSaving(true);
    await onSave(pseudo);
    setIsSaving(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🎉 Victoire !</h2>
        <p>Tu as gagné en <strong>{turns}</strong> coups.</p>
        <p style={{fontSize: '0.9rem', color: '#666', marginTop: '-10px'}}>Entre ton nom pour la gloire éternelle</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Ton pseudo de champion..." 
            value={pseudo} 
            onChange={(e) => setPseudo(e.target.value)} 
            maxLength="15"
            required 
            autoFocus
          />
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Sauvegarde..." : "Enregistrer mon score 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameOver;