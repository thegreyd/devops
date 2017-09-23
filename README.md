# csc_519_devops
Repo for CSC 519 - DevOps

## MILESTONE1 REPORT

```
The project was easy to split up, since each part could be developed individually. We took ownership of one task each, and finally integrated everything together. The report below explains our experiences at each step, and at Integration

1. Provisioning and configuring an jenkins server, automatically using ansible.
	- The installation steps were similar to the tasks we did for HW1, and was pretty straight forward 
	- We had issues setting up Jenkins user credentials. By default, Jenkins creates a password for user 'admin' which is stored in the file system. We did not want to get the password from the file system, and use it subsequently in the scripts, as it might print it out in Standard Output or logs
	- To resolve this, we created an init groovy script (which is a feature in Jenkins), to create a new user (whose credentials we pass in the ansible vault file - vars/password.yml)

2. Setup up the build jobs in Jenkins for the two applications, using ansible. - A nodejs web application checkbox.io.
	- Jenkins was pretty user friendly, and we were able to setup the tasks on the UI easily! 
	- From there, we could export the XML file for the jobs, and use it in our ansible scripts 
	- We took some time to discuss the various ways to access Jenkins through Ansible. We finally decided to go ahead with Jenkins CLI, since it was suggested by the TA, and it covered all the functionality we wanted to acheive.

3. Setup up the build jobs in Jenkins for the two applications, using ansible. - A software "enterprise" Java system iTrust
	- Similar to task 2

4. Setup up a post-build action that runs ansible scripts to provision and configure a VM for running each application.
	- The post build action was a little confusing, specially for iTrust, since the documentation was for doing the same from the UI. 
	- We had to go through the documentation, and find out parallel steps, to acheive the same stuff from the command line 
	- Finally, we found it was easier to create a WAR file (through maven package command), and deploy that on Apache Tomcat
	- Additionally, MYSQL required some more installation steps (like update user credentials for root user, and disable case-sensitivity.) It was easy to automate these on ansible, once we found the way to do them through command line on an ubuntu server. 

5. Integration
	- To avoid exposing any sort of credentials on the Repo, we stored all the crendentials that we use in an ansible-vault file. (vars/password.yml). We then stored the password for the ansible vault in the home directory of the host machine, and executed stuff from there. We found this to be pretty secure, since only we have access to the machines. 

```

## Steps 
- Clone repo
- Install latest ansible `pip install --user git+git://github.com/ansible/ansible.git@devel`
- Make an `inventory` file with hosts
- Run `ansible-playbook main.yml --ask-vault-pass`

## Jobs
- `checkbox.xml` - normal Checkbox.io job which builds on host
- `checkbox_pipeline.xml` - multibranch Checkbox.io pipeline job which builds in a docker container using Jenkinsfile
- `itrust_pipeline.xml` - multibranch iTrust pipeline job 

## Jenkins info
+ Home: `/var/lib/jenkins`
+ Init file: `/etc/default/jenkins`
+ default password location
    * `/Users/Shared/Jenkins/Home/secrets/initialAdminPassword` (Mac OS X)
    * `/var/lib/jenkins/secrets/initialAdminPassword` (Ubuntu)
+ jenkins-cli url: `http://localhost:8080/jnlpJars/jenkins-cli.jar`

## jenkins-cli
- `java -jar jenkins-cli.jar -s http://localhost:8080 help`
- `java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:<password> help`
- `java -jar jenkins-cli.jar -s http://localhost:8080 help --username admin --password <password>`
- `java -jar jenkins-cli.jar -s http://localhost:8080 -auth admin:<password> get-job checkbox > checkbox.xml`

## ansible-vault
- `ansible-vault create vars/password.yml`
- `ansible-vault edit vars/password.yml`
- `ansible-playbook -i inventory checkbox.yml --ask-vault-pass`
