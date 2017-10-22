# csc_519_devops
Repo for CSC 519 - DevOps

## Team
- Zubin Thampi (zsthampi) - Analysis Components
- Meghav Desai (mpdesai) - Useless test detector
- Shishir Nagendra (sbnagend) - Ansible scripts and Build on commit
- Siddharth Sharma (ssharm24) - Fuzzer
- Kshitija Murudi (kmurudi) - Analysis Components & Jenkins Setup

Integration of different parts. Done by all team members together in multiple meetings.

## MILESTONE 2 REPORT

The project was easy to split up, since each part could be developed individually. We took ownership of one task each, and finally integrated everything together. The report below explains our experiences at each step, and at Integration

### ANALYSIS COMPONENTS 

We extended the code from HW2 to create an analysis component using JS and Esprima. </br>
The file is called `analysis.js`

If we detect a violation, we print a FAILED statement on the console. </br>
Ex : `MESSAGE CHAINS : FAILED` </br>
Later, we use this console output to fail the Jenkins build. (It is failed is the keyword `FAILED` is present in console output)

To integrate with Jenkins, we pushed our detection code to checkbox.io GITHUB repository. </br>
We updated the Jenkins job XML file to run some additional steps during the deploy step. </br>
The Jenkins setup would be done automatically then. </br>

```
export wc=`nodejs analysis.js | grep FAILED | wc -l`
if [ $wc -gt 0 ]; then exit 1; fi;
```
#### Detected Items
- Long method : function ProcessTokens in checkbox.io/server-side/site/marqdown.js failed the Long Method validation
- Sync calls : checkbox.io/server-side/site/marqdown.js failed validation for Sync calls as the function loadJadeTemplates has more than 1 Sync call. (readFileSync)
- Message chains : 
Below are the items that failed validation for message chains 
1. Line 173 on checkbox.io/server-side/site/routes/study.js (req.files.files.length)
2. Line 122 on checkbox.io/server-side/site/marqdown.js (return text.replace() ... )
- The Big O : We DID NOT find any violations for this validation
