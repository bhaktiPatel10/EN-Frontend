pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
    }

    stages {
        stage('Checkout Backend Code') {
            steps {
                // Clone your backend repository
                git branch: 'master', url: 'https://github.com/WSMaan/examNinja-backend'
            }
        }

        stage('Checkout Frontend Code') {
            steps {
                // Clone your frontend repository into a separate directory
                dir('frontend') {
                    git branch: 'main', url: 'https://github.com/WSMaan/examNinja_frontend'
                }
            }
        }

        stage('Build Backend (Spring Boot)') {
            steps {
                dir('backend') {
                    // Use Maven to build the Spring Boot app
                    sh 'mvn clean package'
                }
            }
        }

        stage('Build Frontend (React)') {
            steps {
                dir('frontend') {
                    // Use npm to install dependencies and build the React app
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build Docker images for both frontend and backend
                    dir('backend') {
                        sh 'docker build -t examninja123/backend-app .'
                    }
                    dir('frontend') {
                        sh 'docker build -t examninja123/frontend-app .'
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    // Log in to DockerHub and push the images
                    sh "docker login -u ${examninja123} -p ${ExamNinja@123}"
                    sh 'docker push examninja123/backend-app'
                    sh 'docker push examninja123/frontend-app'
                }
            }
        }

        // stage('Deploy to AWS EC2') {
        //     steps {
        //         script {
        //             // Use SSH to connect to your EC2 instance and deploy using Docker Compose
        //             sh 'ssh -i your-ec2-key.pem ec2-user@your-ec2-public-ip "docker-compose -f /path/to/docker-compose.yml up -d"'
        //         }
        //     }
        // }
    }

    post {
        always {
            // Clean up after build
            cleanWs()
        }
    }
}
