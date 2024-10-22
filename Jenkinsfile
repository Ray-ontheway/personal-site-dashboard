pipeline {
    agent  any
    
    tools {nodejs "21.4.0"}
    
    environment {
        NPM_CONFIG_REGISTRY = 'https://registry.npmmirror.com'
        DEPLOY_DIR = "/var/www/rayc/top/dev"
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
        stage("Deploy") {
            steps {
                sh '''
                    echo "Start Deploy ${DEPLOY_DIR}"
                    if [ ! -d "${DEPLOY_DIR}" ]; then
                        sudo mkdir -p ${DEPLOY_DIR}
                    fi
                    rm -rf $DEPLOY_DIR/*
                    cp -r ./dist/* "${DEPLOY_DIR}/"
                    chmod -R 744 ${DEPLOY_DIR}
                '''
            }
        }
    }
    
    post {
        success {
            echo "Build and Deployment Successful"
        }
        failure {
            echo "Build and Deployment Failed"
        }
    }
}
