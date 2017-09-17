# csc_519_devops
Repo for CSC 519 - DevOps

"""

Password Location : 
	/Users/Shared/Jenkins/Home/secrets/initialAdminPassword (Mac OS X)
	/var/lib/jenkins/secrets/initialAdminPassword (Ubuntu)

java -jar jenkins-cli.jar -s http://localhost:8080 help

java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:<password> help
java -jar jenkins-cli.jar -s http://localhost:8080 help --username admin --password <password>

java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:<password> get-job checkbox > checkbox.xml

"""
