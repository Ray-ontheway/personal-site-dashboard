pipeline {
    agent any

    stages {
        stage('w/o docker') {
            steps {
                sh '''
                    echo "Without docker"
                    ls -al
                    touch container-no.txt
                '''
            }
        }
        
        stage('w/ docker') {
            agent {
                docker {
                    image 'node:18-alpine'
                }
            }
            steps {
                sh '''
                    echo "With docker"
                    npm --version
                    ls -al
                    touch container-yes.txt
                '''
            }
        }
    }
}