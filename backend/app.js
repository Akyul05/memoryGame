require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Connexion à la base de données
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//les Routes:
app.use('/scores', require('./routes/scores'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));