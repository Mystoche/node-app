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
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Analyser le code avec SonarQube
                    echo 'Running SonarQube analysis...'
                    sh 'sonar-scanner -v'
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner -Dsonar.projectKey=my-node-app -Dsonar.sources=. -Dsonar.host.url=http://172.22.0.2:9000 -Dsonar.login=squ_1a114a20bbfedabe17113904d9196aa48c05f4ef'
                    }
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
