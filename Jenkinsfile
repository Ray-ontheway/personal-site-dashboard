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
                    npm i -g pnpm
                    pnpm --version
                    pnpm ci
                    pnpm build
                    ls -al
                '''
            }
        }
    }
}