#!groovy
podTemplate(cloud: 'dev', inheritFrom: 'dev', namespace: 'jenkins', yaml: '''
    spec:
        imagePullSecrets:
          - name: docker-regcred
        containers:
          - name: kaniko
            image: docker-infra.sfera.org/docker-group/kaniko-project/executor:v1.13.0-debug
            imagePullPolicy: IfNotPresent
            command:
            - sleep
            args:
            - 99d
          - name: node
            image: docker-infra.sfera.org/docker-group/node:16
            imagePullPolicy: IfNotPresent
            command:
            - sleep
            args:
            - 99d
''') {
  node(POD_LABEL) {
        String systemCode = '[=system_code]'
        String projectName = '[=project_name]'
        String sferaHost = 'https://ppch-infra.sfera.org'
        String gitPath = "${sferaHost}/app/sourcecode/api/${systemCode}/${projectName}.git"
        String dockerUrl = "docker-infra.sfera.org/docker-snapshot/${systemCode}/${projectName}:${BUILD_ID}"
        echo "dockerUrl = $dockerUrl"
    stage('git checkout') {
        checkout([$class: 'GitSCM',
                          branches: [[name: "${params.BRANCH}"]],
                          doGenerateSubmoduleConfigurations: false,
                          extensions: [],
                          gitTool: 'Default',
                          submoduleCfg: [],
                          userRemoteConfigs: [[url: gitUrl, ,credentialsId:'jenkins-sfera']]
                        ])
    }
    stage('Installing dependencies') {
        container('node') {
            withCredentials([string(credentialsId: 'jenkins-base')]){
                sh(returnStdout: true, script: 'npm ci --ignore-scripts')
            }
        }
    }
    stage('run js test') {
        container('node') {
            sh(returnStdout: true, script: 'npm run test')
        }
    }
    stage('run build') {
        container('node') {
            withCredentials([string(credentialsId: 'jenkins-base')]){
                sh(returnStdout: true, script: 'CI=false npm run build')
            }
        }
    }
    stage('build docker images') {
        container('kaniko') {
            withCredentials([string(credentialsId: 'docker-cfg', variable: 'registry')]){
                sh(returnStdout: true, script: 'echo "${registry}" > /kaniko/.docker/config.json')
                sh(returnStdout: true, script: "/kaniko/executor -f `pwd`/Dockerfile -c `pwd` --insecure --skip-tls-verify --destination=$dockerUrl  --force")
            }
        }
    }
  }
}