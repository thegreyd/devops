#### Detected Items

Below we have listed the items/conditions detected that will fail the build job for checkbox , we detected 3/4 conditions in the server-side code of checkbox.io repository, all except the 'Big O' condition.


- Long method : function ProcessTokens in checkbox.io/server-side/site/marqdown.js failed the Long Method validation
- Sync calls : checkbox.io/server-side/site/marqdown.js failed validation for Sync calls as the function loadJadeTemplates has more than 1 Sync call. (readFileSync)
- Message chains : 
Below are the items that failed validation for message chains 
    + Line 173 on checkbox.io/server-side/site/routes/study.js (req.files.files.length)
    + Line 122 on checkbox.io/server-side/site/marqdown.js (return text.replace() ... )
- The Big O : We DID NOT find any violations for this validation

