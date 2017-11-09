## What's happening
- `provision.yaml` : provisions 3 ec2 instances and creates an inventory file
    * jenkins: our build server for itrust and checkbox
    * itrust: deployment server for itrust
    * checkbox: deployment server for checkbox
- `jenkins.yaml` : using inventory
    + setup jenkins server
    + add checkbox and itrust jobs
    + trigger checkbox and itrust builds (and deploy) on first setup
    + builds and deploys are automatically triggered when repos are pushed to

## More
- `checkbox_deploy.yml` : using inventory, deploys checkbox. Automatically run by jenkins.
- `itrust_deploy.yml` : using inventory, deploys itrust. Automatically run by jenkins.
- `vars/password.yml` : ansible vault file with all credentials
- `~/password.txt` File with your vault password

## steps
- clone repo
- `pip install --user git+git://github.com/ansible/ansible.git@devel` install latest ansible
- Provision `ansible-playbook provision.yaml --vault-password-file ~/password.txt`
- Setup Jenkins `ansible-playbook jenkins.yaml -i inventory --vault-password-file ~/password.txt`

## Check
- `ip:8080` access jenkins
- `ip` access checkbox
- `ip:9090/iTrust` access iTrust

## Debug
- `ssh -i <pem_file> ubuntu@ip` ssh into ec2
- `/var/lib/jenkins` files on jenkins server - deployment playbooks and jobs
- `ansible-vault view <vault_file>`
- `ansible-vault edit <vault_file>`
- `awseducate.com/login` manage aws

## Trigger Build & Deploy on Push
Manual setup to add git hooks to build jobs.

### pre-requisites
- repos should be hosted on github/enterprise github
- GitHub plugin should be installed

### step 1: create tokens
- tokens should be created by the owner of the repo
- create github api token with hooks and repo permissions
- create github enterprise api token with hooks and repo permissions

### step 2: configure jenkins
- In Add credentials, add (api tokens) as "secret text" credential type.
- In manage jenkins
    - `https://api.github.com` add github server with credentials
    - `https://github.ncsu.edu/api/v3` add github enterprise server with credentials
    - leave the name blank

### step 3: configure jobs
- in trigger builds, select `poll github scm` for checkbox and itrust
