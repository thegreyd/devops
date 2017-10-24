# csc_519_devops
Repo for CSC 519 - DevOps

## ScreenCast 
[Analysis Components](https://youtu.be/FPh9yERc7F8)

[Testing Comaponent](https://youtu.be/-On7yzNOh_k)

## Team
- Zubin Thampi (zsthampi) - Analysis Components
- Meghav Desai (mpdesai) - Useless test detector
- Shishir Nagendra (sbnagend) - Ansible scripts and Build on commit
- Siddharth Sharma (ssharm24) - Fuzzer
- Kshitija Murudi (kmurudi) - Analysis Components & Jenkins Setup

Integration of different parts. Done by all team members together in multiple meetings.

## MILESTONE 2 REPORT

The project was easy to split up, since each part could be developed individually. We took ownership of one task each, and finally integrated everything together. The report below explains our experiences at each step, and at Integration

### FUZZER 

#### Setup Fuzzer
- `npm install`
- `node_modules/pegjs/bin/pegjs -o javaparser.js java.pegjs`

#### Run Fuzzer
- `node fuzzer.js`

#### Revert back changes
- `git checkout iTrust/src/*`

#### What's happening
- `java.pegjs` is a grammar file which has all the grammar rules to parse a Java program
- `pegjs` is an npm module which takes a grammar file and outputs a parser program `javaparser.js` in this case
- Where did this `java.pegjs` file come from? From another npm module called [java-parser](https://github.com/mazko/jsjavaparser)
- Why are we not using that module as is? See [this issue](https://github.com/mazko/jsjavaparser/issues/7). It basically means that there's currently no support for getting position of parsed nodes in the source code. And we absolutely need that to modify the source code. 
- So we cooked our own version of grammar file ([not really](https://github.com/mazko/jsjavaparser/issues/7#issuecomment-286941614)), and added support for node positions.
- Okay we have a parser. Now we select some `.java` files randomly and modify them:
    + In conditions, swap '<' with '>'
    + In conditions, swap '==' with '!='
    + In Numbers, swap 0 with 1
    + In Strings, replace all chars with 'z's

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
**NOTE** - 
The report for Analysis Components is present in a separate markdown file - [AnalysisComponents.md](https://github.ncsu.edu/zsthampi/csc_519_devops/blob/milestone2/AnalysisComponents.md)

#### Detected Items
- Long method : function ProcessTokens in checkbox.io/server-side/site/marqdown.js failed the Long Method validation
- Sync calls : checkbox.io/server-side/site/marqdown.js failed validation for Sync calls as the function loadJadeTemplates has more than 1 Sync call. (readFileSync)
- Message chains : 
Below are the items that failed validation for message chains 
    + Line 173 on checkbox.io/server-side/site/routes/study.js (req.files.files.length)
    + Line 122 on checkbox.io/server-side/site/marqdown.js (return text.replace() ... )
- The Big O : We DID NOT find any violations for this validation
