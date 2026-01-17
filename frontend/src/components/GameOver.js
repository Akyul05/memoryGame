import React,{useState, useEffect} from 'react';
import conffeti from 'canvas-confetti';

const GameOver = ({turns,onSave})=>{
    const[pseudo,setPseudo]=useState("");
    const[isSaving,setIsSaving]=useState(false);

    useEffect(()=>{
        conffeti({
            particleCount:200,
            spread:70,
            origin:{y:0.6}
        });
    },[]);
    const handleSubmit =async(e)=>{
        e.preventDefault();
        if(!pseudo.trim()) return;
        setIsSaving(true);
        await onSave(pseudo);
        setIsSaving(false);
    };

    return(
        <div className = "modal-overlay">
            <div className = "modal-content">
                <h2>Félicitations ! Vous avez gagné en <strong>{turns}</strong> coups.</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Ton pseudo"
                        value={pseudo}
                        onChange={(e)=>setPseudo(e.target.value)}
                        maxLength="20"
                        required
                        autoFocus
                    />
                    <button type="submit" disabled={isSaving}>
                        {isSaving ? "Enregistrement..." : "Enregistrer le score"}
                    </button>

                </form>
            </div>

        </div>
    );
};

export default GameOver;
