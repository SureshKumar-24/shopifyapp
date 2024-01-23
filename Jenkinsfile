pipeline{
    agent any 
    
    stages{
        stage("Code"){
            steps{
                echo "Cloning the Code"
                git url : "https://github.com/SureshKumar-24/shopifyapp.git", branch:"main"
            }
        }
        stage("Build"){
            steps{
                echo "Building the Code"
                sh "docker build -f DockerFile  -t node_app1 ." 
            }
        }
        stage("Push to Docker Hub"){
            steps{
                echo "Pushing the image to docker hub"
                withCredentials([usernamePassword(credentialsId:"dockerHub",passwordVariable:"dockerHubPass",usernameVariable:"dockerHubUser")]){
                  sh "docker tag node_app ${env.dockerHubUser}/node_app:latest"
                  sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"  
                  sh "docker push ${env.dockerHubUser}/node_app:latest"
                }
                
            }
        }
        stage("Deploy"){
            steps{
                echo "Deploying the Container"
                sh "docker-compose down && docker-compose up -d"
            }
        }
    }
}