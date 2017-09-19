# csc_519_devops
Repo for CSC 519 - DevOps

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