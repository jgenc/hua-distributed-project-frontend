pipeline {
    agent any

    environment {
            DOCKER_TOKEN = credentials('docker-push-secret')
            DOCKER_USER = 'jgenc'
            DOCKER_SERVER = 'ghcr.io'
            DOCKER_PREFIX = 'ghcr.io/jgenc/distributed-frontend'
    }

    stages {
      stage("Clone") {
        steps {
          git branch: 'main', url : 'git@github.com:jgenc/hua-distributed-project-frontend.git'
        }
      }

      stage("Modify .env") {
        steps {
          sh '''
            cp ./.env.example ./.env
          '''
          
          sh '''
            DEVICE_IP=$(curl --silent --fail ifconfig.me/ip)
            sed -i "s/^VITE_SOLID_BACKEND=.*/VITE_SOLID_BACKEND=$TEST_IP/" .env
            cat ./.env
          '''
        }
      }

      stage("Docker Build") {
        steps {
          sh '''
            HEAD_COMMIT=$(git rev-parse --short HEAD) 
            TAG=$HEAD_COMMIT-$BUILD_ID
            docker build --rm -t $DOCKER_PREFIX:$TAG -t $DOCKER_PREFIX:latest -f production.dockerfile .
          '''
        }
      }
      
      stage("Docker Push") {
        steps {
          sh '''
            echo $DOCKER_TOKEN | docker login $DOCKER_SERVER -u $DOCKER_USER --password-stdin
            docker push $DOCKER_PREFIX --all-tags
          '''
        }
      }

      stage("Deploy to Target VM") {
        steps {
          sh '''
            ansible-playbook -i ~/workspace/devops-project/hosts.yml -l azure-deploy-1 ~/workspace/devops-project/playbooks/frontend-docker-jenkins.yml 
          '''
        }
      }

  }
}