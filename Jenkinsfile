pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:20.10.0'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -al
                    node --version
                    npm --version
                    npm config set registry http://registry.npm.taobao.org
                    npm install
                    npm run build
                    ls -al
                '''
            }
        }
    }
}