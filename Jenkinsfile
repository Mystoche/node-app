pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                // Cloner la branche main
                git branch: 'main', url: 'https://github.com/Mystoche/node-app.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t my-node-app .'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Ajoute ici des tests si nécessaire
                    echo 'Running tests...'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Exécuter le conteneur Docker
                    sh 'docker run -d -p 3000:3000 my-node-app'
                }
            }
        }
    }
}
