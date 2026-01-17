const Score = require('../models/Score');
// recupere les 5 meilleures scores
exports.getScores = async (req, res) => {
    try {
        const scores = await Score.find()
        .sort({ coups: 1,date:1 })// du plus recent au plus enciens et du moins au plus de coups
        .limit(5);
        res.status(200).json({ success: true, data: scores });
}
catch (err){
    res.status(500).json({message: 'Erreur serveur impossible de récupérer les scores'});
}
};

// enregistrer un score
exports.addScore = async (req, res) => {
    try{
        const { pseudo, coups } = req.body;
        if(!pseudo || !coups){
            return res.status(400).json({message: 'Veuillez fournir un pseudo et le nombre de coups'});
        }
        const newScore = await Score.create({ pseudo, coups });

        res.status(201).json({ 
            success: true,
            data: newScore 
        });
    }catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({message: messages.join(', ')});
        }
    res.status(500).json({message: 'Erreur serveur impossible d\'enregistrer le score'});
    }

};