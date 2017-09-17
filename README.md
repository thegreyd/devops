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

ansible-vault create vars/password.yml
ansible-vault edit vars/password.yml

ansible-playbook -i inventory checkbox.yml --ask-vault-pass [password : pass]

"""
