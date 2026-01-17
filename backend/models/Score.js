const mongoose = require('mongoose');
const ScoreSchema = new mongoose.Schema({
    pseudo:{
        type: String,
        required:[true, 'Veuillez ajouter un pseudo'],
        trim: true,
        maxlength: [15, 'Le pseudo ne peut pas dépasser 15 caractères']
    },
    coups:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },

});
module.exports = mongoose.model('Score', ScoreSchema);
