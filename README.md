csc_519_devops
Repo for CSC 519 - DevOps

# Milestone 3 Deployment Pipeline

## Screencasts
- [Deployment Pipeline](https://youtu.be/kcN8ciJH8ds)
- Nomad
- [Redis Feature Flag](https://youtu.be/g3hLF5k6qgA)
- [Canary](https://youtu.be/WTktuxFEHDk)
- [Rolling](https://youtu.be/zt511jRmMhs)

## Team
- Zubin Thampi (zsthampi) 
- Meghav Desai (mpdesai) 
- Shishir Nagendra (sbnagend) 
- Siddharth Sharma (ssharm24)
- Kshitija Murudi (kmurudi) 

## Deployment - Phase 1

### What's what
- `provision.yaml` : provisions 6 ec2 instances and creates an inventory file
    * jenkins: our build server for itrust and checkbox
    * itrust: deployment server for itrust
    * checkbox: deployment server for checkbox
- `jenkins.yaml`
    + setup jenkins server
    + add checkbox and itrust jobs
    + trigger checkbox and itrust builds (and deploy) on first setup
    + builds and deploys are automatically triggered when repos are pushed to
- `bootstrap_cluster.yml` install python to run ansible on nomad instances
- `install_nomad.yml` install nomad on nomad instances
- `checkbox_deploy.yml` deploys checkbox. Automatically run by jenkins.
- `itrust_deploy.yml` deploys itrust. Automatically run by jenkins.
- `vars/password.yml` Ansible vault file with all credentials
- `~/password.txt` File with your vault password

### Setup + Provisioning
- clone repo
- `pip install --user git+git://github.com/ansible/ansible.git@devel` install latest ansible
- Provision `ansible-playbook provision.yaml --vault-password-file ~/password.txt`

### Nomad Cluster Run
- `ansible-playbook bootstrap_cluster.yaml -i inventory`
- `ansible-playbook install_nomad.yaml -i inventory`

### Jenkins Setup (Build+Deploy) Run
- `ansible-playbook jenkins.yaml -i inventory --vault-password-file ~/password.txt`
- Check
    - `ip:8080` access jenkins
    - `ip` access checkbox
    - `ip:9090/iTrust` access iTrust
- Debug
    - `ssh -i <pem_file> ubuntu@ip` ssh into ec2
    - `/var/lib/jenkins` files on jenkins server - deployment playbooks and jobs
    - `ansible-vault view <vault_file>`
    - `ansible-vault edit <vault_file>`
    - `awseducate.com/login` manage aws

### Trigger Build & Deploy on Push
Manual setup to add git hooks to build jobs.
- pre-reqs
    - repos should be hosted on github/enterprise github
    - GitHub plugin should be installed
- step 1: create tokens
    - tokens should be created by the owner of the repo
    - create github api token with hooks and repo permissions
    - create github enterprise api token with hooks and repo permissions
- step 2: configure jenkins
    - In Add credentials, add (api tokens) as "secret text" credential type.
    - In manage jenkins > configure system
        - `https://api.github.com` add github server with credentials
        - `https://github.ncsu.edu/api/v3` add github enterprise server with credentials
        - leave the name blank
- step 3: configure jobs
    - in trigger builds, select `poll github scm` for checkbox and itrust


## INFRASTRUCTURE UPGRADE 
### REDIS FEATURE FLAG SERVER FOR CHECKBOX.IO

``` In this part we have created one redis-master and two redis-slaves to demonstrate. Two servers constantly get the changed key values from the master.
The feature that we are demoing is a new route that we have created -> "<host_ip>:3002/getPic"
When our "key1" is set to 1 - a picture will be displayed and when set to 0 - NULL will be displayed.
Slaves would not be able to SET keys, only a master can GET/SET both, but the 2 slaves would be getting values of key as they change via master, thus making possible the local mirroring from master to all other instances.
Change has been made in the server.js for adding a route and this is done in our main checkbox.io repo itself. 

```
## CANARY RELEASE
```
All the ansible scripts and code for Canary release are contained in the canary folder. 
The ansible scripts do the following 
1. Provision an EC2 instance, to act as a load balancer. 
The load balancer code is included in canary/load_balancer folder 
2. Provision an EC2 instance, which acts as the production instance. 
(The github repo for the production instance is configured in checkbox_deploy_v1.yml) 
3. Provision an EC2 instance, which acts as the new version. 
(The github repo for the new version is configured in checkbox_deploy_v2.yml). 
In the demo, I'm using the same repository, but a different branch called v2. 

Both v1 and v2 point to the same database (which is hosted on v1 host) 

The load balancer is a node app, which routes traffic 30% of the time to the new version, 
and rest of the time to the production version. 

The load balancer also has a route called /alert, which can be called by the new version, 
based on any metric that it is monitoring. 
We can also have an additional monitor script, 
which checks the status of the servers in the new version. 
For the demo, I call the route directly, 
and show that the app then routes completely to the production instance alone. 

The ratio of trafffic between production, 
and new instance can be easily altered by altering the load balancer code. 
It can even be passed as an attribute (or as a separate route). 
But this was not part of the milestone requirements. 

Internally, I use a redis server to store the alert flag. 
```
## Rolling Update
```
All the ansible scripts and code for Canary release are contained in the Rolling folder.
The ansible scripts do the following

1. Configure and install jenkins
2. Build jobs for iTrust
3. Script to provision iTrust on production servers
4. Script to redeploy iTrust on a git push

Microsoft azure is used for deploying production servers. Sql database of instance one is shared by all the 5 iTrust instances.
'''
