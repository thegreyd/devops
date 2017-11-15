# csc_519_devops
Repo for CSC 519 - DevOps

[Canary Screencast](https://youtu.be/WTktuxFEHDk)

[Rolling Screencast](https://youtu.be/zt511jRmMhs)

[Redis Feature Flag Screencast]()


## INFRASTRUCTURE UPGRADE 
### REDIS FEATURE FLAG SERVER FOR CHECKBOX.IO

``` In this part we have created one redis-master and two redis-slaves to demonstrate. Two servers constantly get the changed key values from the master. 

The feature that we are demoing is a new route that we have created -> <host_ip>:3002/getPic

When our "key1" is set to 1 - a picture will be displayed and when set to 0 - NULL will be displayed.

Slaves would not be able to SET keys, only a master can GET/SET both, but the 2 slaves would be getting values of key as they change via master.

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
