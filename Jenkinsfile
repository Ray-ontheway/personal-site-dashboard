pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                sh '''
                    echo "Without docker"
                    ls -al
                '''
            }
        }
    }
}