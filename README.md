csc_519_devops
Repo for CSC 519 - DevOps

# Special Milestone
We are integrating our special milestone work with the Checkbox server that we deployed on this CI/CD pipeline project.
Steps to access the portal hosted on Checkbox server (ec2 IP) ->
[Portal Link]()

The idea of our special milestone is to build a UI portal which displays/consists the following to the user :-

+ Dependency Checker (Health check)
  - Most of the build failures happen due to failure of dependency checks. Thus, we thought it is an important parameter to consider and user can know when dependency checks fail, and rectify code to prevent build failure.

+ Usage Statistic (Graph) 
  - This will monitor CPU/Memory usage and plot a graph

+ Network Stats 
  - This functionality does port scanning and lets the user know which all ports are in use. This could help a developer/implementor to decide which ports to not use for adding extra functions.

+ Flame Graph 
  - We have added flame graph to our UI which will help in letting the developer/user to know about the stack usage. 
  //(meghav add more here and in the next implementation section)

## Implementation - Flame Graph


## Implementation - Monitoring Dashboard 

### Dependency Checker

To implement this function we are using the 'npm-check' npm module and using a Node.js script to implement this function - [check.js](https://github.ncsu.edu/zsthampi/csc_519_devops/blob/milestone4/check.js).

It checks if all the modules/packages needed (dependencies) have been installed and latest or not.
We are using the earlier mentioned script and the UI uses that to display details of dependency checking.

Steps to run the dependency checker separately -
- `git clone git@github.com:thegreyd/checkbox.io.git`
- `cd checkbox.io/server-side/site`
- `npm install`
- `node check.js`

![check.js output](./screen2.png)
![npm-check output](./screen1.png)

### Usage Statistics

To implement this feature we have used the 'express-king' npm module. We have integrated our code for this in the server.js of Checkbox server-side code and this provides us with an end-point - http://host:3000/ping where we get all the required parameters.
Now, we did not need all the parameters and information, so we extracted the important ones and plot a graph to be displayed on our UI portal.

For usage statistics we have plotted garphs of CPU usage and Memory usage against time. 

### Network Statistics - Port Scanning

We have used a python script - [port.py](https://github.ncsu.edu/zsthampi/csc_519_devops/blob/milestone4/port.py) to implement this functionality. The script lists down all the open/listening ports and lists down the processes using them. This is helpful when we have to choose a port for another application/process. This is also integrated with back-end UI code and our UI displays this. 
