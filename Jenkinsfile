
pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Fetching source code from GitHub'
                checkout scm
            }
        }

        stage('Verify Files') {
            steps {
                echo 'Checking website files'

                bat '''
                if not exist index.html (
                    echo ERROR: index.html not found
                    exit /b 1
                )
                echo index.html found successfully
                '''
            }
        }

        stage('Build') {
            steps {
                echo 'Preparing website for deployment'
                echo 'Static website does not require compilation'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing website files'

                powershell '''
                if (!(Test-Path "index.html")) {
                    throw "index.html is missing"
                }

                if ((Get-Item "index.html").Length -eq 0) {
                    throw "index.html is empty"
                }

                Write-Host "Website file validation successful"
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying website to Apache'

                bat '''
                robocopy "%WORKSPACE%" "C:\\Apache24\\htdocs" /E /XD .git .github /XF Jenkinsfile README.md
                if %ERRORLEVEL% LEQ 7 exit /b 0
                exit /b %ERRORLEVEL%
                '''
            }
        }

        stage('Launch Website') {
            steps {
                echo 'Website deployed successfully!'
                echo 'Open http://localhost/ to view your website'

                powershell '''
                Start-Process "http://localhost/"
                '''
            }
        }
    }

    post {
    	success {
        	echo 'CI/CD Pipeline completed successfully!'

	        bat 'schtasks /run /tn "Open IPU Webpage"'
    	}

	failure {
        	echo 'CI/CD Pipeline failed. Check the console output.'
    	}
    }
}
