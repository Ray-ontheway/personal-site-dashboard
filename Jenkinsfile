pipeline {
    agent  any
    
    tools {nodejs "21.4.0"}
    
    environment {
        NPM_CONFIG_REGISTRY = 'https://registry.npmmirror.com'
    }

    stages {
        stage('Check tool version') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm config ls
                '''
            }
        }
        stage("Build Preparation") {
            steps {
                sh '''
                    npm install -g pnpm --force
                    pnpm --version
                    pnpm install
                '''
            }
        }
        stage("Build") {
            steps {
                sh '''
                    echo "Start Build"
                    pnpm build
                '''
            }
        }
    }
    
    post {
        success {
            echo "Build Successful"
        }
    }
}
