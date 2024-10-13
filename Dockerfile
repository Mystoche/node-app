# Utiliser une image de base Node.js
FROM node:14

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier le package.json et le package-lock.json depuis la racine du projet
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du projet à la racine
COPY . .

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "app.js"]  # Chemin vers app.js dans la racine
