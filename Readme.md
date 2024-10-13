# node-app

### Projet CI/CD avec Docker, GitHub et Jenkins

#### Prérequis
- **Docker** : installé sur ta machine.
- **Jenkins** : installé et configuré (localement ou sur un serveur).
- **GitHub** : un compte pour héberger ton code.
- **Node.js** : installé sur ta machine pour le développement.

### Étape 1 : Créer un projet Node.js

1. **Initialiser le projet** :
   - Crée un nouveau répertoire pour ton projet.
   - Navigue dans le répertoire et exécute les commandes suivantes :
     ```bash
     mkdir my-node-app
     cd my-node-app
     npm init -y
     ```

2. **Installer une dépendance** (par exemple, Express) :
   ```bash
   npm install express
   ```

3. **Créer un fichier `app.js`** :
   ```javascript
   // app.js
   const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 3000;

   app.get('/', (req, res) => {
       res.send('Hello, World!');
   });

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });
   ```

4. **Ajouter un fichier `.gitignore`** pour ignorer les fichiers et répertoires inutiles :
   ```
   node_modules
   ```

### Étape 2 : Créer un Dockerfile

1. **Créer un fichier `Dockerfile`** à la racine du projet :
   ```Dockerfile
   # Dockerfile
   FROM node:14

   # Set the working directory
   WORKDIR /usr/src/app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the application code
   COPY . .

   # Expose the application port
   EXPOSE 3000

   # Command to run the application
   CMD ["node", "app.js"]
   ```

### Étape 3 : Pousser le projet sur GitHub

1. **Initialiser un dépôt Git** :
   ```bash
   git init
   ```

2. **Ajouter et valider les fichiers** :
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

3. **Créer un nouveau dépôt sur GitHub** et suivre les instructions pour le lier à ton projet local :
   ```bash
   git remote add origin https://github.com/ton-utilisateur/mon-node-app.git
   git push -u origin main
   ```

### Étape 4 : Configurer Jenkins

1. **Installer les plugins nécessaires** dans Jenkins :
   - Accède à **Manage Jenkins** > **Manage Plugins** et installe les plugins suivants :
     - **Docker Pipeline**
     - **Git**
     - **Blue Ocean** (optionnel pour une interface utilisateur améliorée)

2. **Configurer Docker dans Jenkins** :
   - Va dans **Manage Jenkins** > **Configure System**.
   - Fais défiler jusqu'à **Docker** et configure le chemin vers l'exécutable Docker sur ton serveur.

### Étape 5 : Créer un pipeline Jenkins

1. **Créer un nouveau job Jenkins** :
   - Clique sur **New Item** et sélectionne **Pipeline**.
   - Donne un nom à ton pipeline (par exemple, `my-node-app-pipeline`).

2. **Configurer le pipeline** :
   Dans la section Pipeline, assure-toi de choisir Pipeline script from SCM.
   Sélectionne Git et entre l’URL de ton dépôt GitHub, par exemple https://github.com/ton-utilisateur/my-node-app.git.
   Dans Branch Specifier, mets */main pour indiquer que Jenkins doit suivre la branche mai

### Étape 6 : Lancer le pipeline Jenkins

1. **Cliquer sur **Build Now** pour exécuter le pipeline.
2. **Observer les étapes** dans Jenkins, chaque étape du pipeline sera exécutée (clonage, construction de l'image Docker, exécution des tests, déploiement).

### Étape 7 : Accéder à l'application

1. **Ouvre ton navigateur** et accède à `http://localhost:3000` pour voir l'application en cours d'exécution.

### Gestion des versions


Pour gérer les versions de ton code, tu peux utiliser les tags Git :
- Crée un tag pour chaque version :
  ```bash
  git tag -a v1.0 -m "Version 1.0"
  git push origin v1.0
  ```

