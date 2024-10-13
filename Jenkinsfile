pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        APP_NAME = "my-node-app"
        RELEASE = "1.0.0"
        DOCKER_USER = "dulcinee"
        DOCKER_PASS = 'DockerHub-Token'
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone') {
            steps {
                // Cloner la branche main de GitHub
                git branch: 'main', url: 'https://github.com/Mystoche/node-app'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Construire l'image Docker
                    echo 'Building Docker image...'
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Placeholder pour l'exécution des tests
                    echo 'Running tests...'
                    // Ajouter ici des commandes pour exécuter des tests (par exemple, npm test)
                }
            }
        }

        stage("SonarQube Analysis") {
            steps {
                withSonarQubeEnv('SonarQube-Server') {
                    sh '''$SCANNER_HOME/bin/sonar-scanner -Dsonar.projectName=my-node-app \
                    -Dsonar.projectKey=my-node-app'''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    // Vérifier le Quality Gate
                    echo 'Checking SonarQube Quality Gate...'
                    timeout(time: 5, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Quality Gate failed: ${qg.status}. Check SonarQube for details."
                        } else {
                            echo "Quality Gate passed with status: ${qg.status}."
                        }
                    }
                }
            }
        }

        stage('TRIVY FS SCAN') {
            steps {
                script {
                    // Exécuter une analyse de vulnérabilités avec Trivy
                    echo 'Running Trivy filesystem scan...'
                    sh "trivy fs . > trivyfs.txt"
                    // Vérifier les résultats de l'analyse
                    sh "cat trivyfs.txt"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Vérifier si le conteneur existe et le supprimer s'il est en cours d'exécution
                    def containerName = "my-node-app-container"

                    // Arrêter et supprimer le conteneur existant si nécessaire
                    def existingContainer = sh(script: "docker ps -q -f name=${containerName}", returnStdout: true).trim()
                    if (existingContainer) {
                        echo "Stopping existing container: ${containerName}"
                        sh "docker stop ${existingContainer}"
                        sh "docker rm ${existingContainer}"
                    }

                    // Lancer le nouveau conteneur
                    echo 'Deploying application...'
                    sh "docker run -d --name ${containerName} -p 3000:3000 ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
}
