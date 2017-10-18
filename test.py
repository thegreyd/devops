import os
import sys
import pickle
import xml.etree.ElementTree as ET

#fd = open("/var/lib/jenkins/jobs/iTrust/builds/15/junitResult.xml", 'r')
fd = ET.parse('/var/lib/jenkins/jobs/iTrust/builds/15/junitResult.xml')
root = fd.getroot()
#print root.getchildren()
i = 0
tests = filter(lambda x: x.tag=="suites", root.getchildren())
#print tests[0]
allcases = {}
tests = tests[0]
for testSuite in tests.getchildren():
	suiteElements = testSuite.getchildren()
	testcases = filter(lambda x: x.tag=="cases", suiteElements)
#	print testcases
	
	if len(testcases)!=0:
        	testcases = testcases[0]
#		print testcases

		for case in testcases:

            		testName = filter(lambda x: x.tag=="testName", case)
			print "testName is :", testName
			testName = testName[0].text
               		skippedStatus = filter(lambda x: x.tag == "skipped", case)[0].text
               		failureStatus = filter(lambda x: x.tag == "failedSince", case)[0].text
         		i += 1    
			print "testname: ", testName , "\nskipped:", skippedStatus ,"\n failed:", failureStatus
			allcases[testName] = 0
			pickle.dump(allcases , open("res_dict" , "rb+"))
		print i


