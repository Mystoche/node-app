pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                // Cloner la branche main de GitHub
                git branch: 'main', url: 'https://github.com/Mystoche/node-app'
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
                    echo 'Running tests...'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Analyser le code avec SonarQube
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner -Dsonar.projectKey=my-node-app -Dsonar.sources=. -Dsonar.host.url=http://192.168.100.6:9000 -Dsonar.login=squ_1a114a20bbfedabe17113904d9196aa48c05f4ef'
                    }
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
