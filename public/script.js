document.getElementById('sendButton').addEventListener('click', () => {
    const userInput = document.getElementById('userInput');
    const userResponse = userInput.value;

    if (userResponse) {
        // Afficher la réponse de l'utilisateur
        const responseArea = document.getElementById('responseArea');
        responseArea.innerHTML += `<div>User: ${userResponse}</div>`;
        
        // Envoyer la réponse au serveur
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `userResponse=${encodeURIComponent(userResponse)}`,
        })
        .then(response => response.json())
        .then(data => {
            // Afficher la réponse du serveur (fictif pour l'instant)
            responseArea.innerHTML += `<div>Bot: ${data.reply}</div>`;
            userInput.value = ''; // Réinitialiser le champ de saisie
        })
        .catch(error => console.error('Erreur:', error));
    }
});
