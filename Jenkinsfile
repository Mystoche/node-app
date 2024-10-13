pipeline {
    agent any


    environment {
        SCANNER_HOME = tool 'sonar-scanner'
        APP_NAME = "my-node-app"
        RELEASE = "1.0.0"
        DOCKER_USER = "dulcinee"
        DOCKER_PASS = 'DockerHub-Token'
        IMAGE_NAME = "${DOCKER_USER}" + "/" + "${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
	    
    }

    stages {
        stage('clean workspace') {
            steps {
                cleanWs()
            }

            

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
                    // Construire l'image Docker
                    echo 'Building Docker image...'
                    sh 'docker build -t my-node-app .'
                }
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Placeholder pour l'exécution des tests
                    echo 'Running tests...'
                    // Ajouter ici des commandes pour exécuter des tests (par exemple, `npm test`)
                }
            }
        }
        stage("Sonarqube Analysis") {
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
                    // Exécuter le conteneur Docker
                    echo 'Deploying application...'
                    sh 'docker run -d -p 3000:3000 my-node-app'
                }
            }
        }
    }
}
