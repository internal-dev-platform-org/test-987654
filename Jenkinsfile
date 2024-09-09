#!groovy
podTemplate(cloud: 'dev', inheritFrom: 'dev', namespace: 'jenkins', yaml: '''
    spec:
        imagePullSecrets:
          - name: docker-regcred
        containers:
          - name: kaniko
            image: gcr.io/kaniko-project/executor:v1.13.0-debug
            imagePullPolicy: IfNotPresent
            command:
            - sleep
            args:
            - 99d
          - name: node
            image: node:18-alpine
            imagePullPolicy: IfNotPresent
            command:
            - sleep
            args:
            - 99d
''') {
  node(POD_LABEL) {
        String SYSTEM_CODE = '[=project_key]'
        String PROJECT_NAME = '[=app_name]'
        String SFERA_HOST = '[=SFERA_HOST]'
        String GIT_PATH = "${SFERA_HOST}/app/sourcecode/api/${SYSTEM_CODE}/${PROJECT_NAME}.git"
        String DOCKER_URL = "[=DOCKER_URL]/${SYSTEM_CODE}/${PROJECT_NAME}:${BUILD_ID}".toLowerCase()
        String GIT_URL = "https://${GIT_PATH}"
        stage('git checkout') {
          checkout([$class: 'GitSCM',
                          branches: [[name: "master"]],
                          doGenerateSubmoduleConfigurations: false,
                          extensions: [],
                          gitTool: 'Default',
                          submoduleCfg: [],
                          userRemoteConfigs: [[url: GIT_URL, ,credentialsId:'jenkins-sfera']]
                        ])
    }
    stage('Installing dependencies') {
        container('node') {
            sh(returnStdout: true, script: 'npm i --ignore-scripts')
        }
    }
    stage('run js test') {
        container('node') {
            sh(returnStdout: true, script: 'npm run test')
        }
    }
    stage('run js build') {
        container('node') {
            sh(returnStdout: true, script: 'CI=false npm run build')
        }
    }
    stage('build docker images') {
        container('kaniko') {
              withCredentials([string(credentialsId: 'docker-cfg', variable: 'registry')]) {
                sh(returnStdout: true, script: 'echo "${registry}" > /kaniko/.docker/config.json')
                sh(returnStdout: true, script: "/kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure --skip-tls-verify --destination=$DOCKER_URL  --force")
            }
        }
    }
  }
}
