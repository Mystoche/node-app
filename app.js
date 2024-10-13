const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour analyser le corps des requêtes
app.use(bodyParser.urlencoded({ extended: true }));

// Servir des fichiers statiques (HTML, CSS, JS)
app.use(express.static('public'));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve the HTML file
});

// Route pour traiter les réponses (ajoute le traitement du chatbot ici plus tard)
app.post('/chat', (req, res) => {
    const userResponse = req.body.userResponse;
    console.log('User Response:', userResponse);
    
    // Traitement de la réponse (intégrer ici le chatbot)

    // Réponse fictive pour l'instant
    res.send({ reply: 'Votre réponse a été reçue: ' + userResponse });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
