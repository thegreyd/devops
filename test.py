import sys
import pickle
import os
import xml.etree.ElementTree as ET

def uselesstest():
        res_dict = pickle.load(open('res_dict', 'rb+'))
        for i in res_dict :
#               print i , res_dict[i]
                if res_dict[i] == 0 :
                        print "Useless Test", i

#fd = open("/var/lib/jenkins/jobs/iTrust/builds/15/junitResult.xml", 'r')
def checktest():

#for i in range (1 , 101):
        res_dict = pickle.load(open('res_dict', 'rb+'))
        cases = []
        suites = []
        fd = ET.parse('/var/lib/jenkins/jobs/iTrust/builds/15/junitResult.xml')
        root = fd.getroot()
        #print root.getchildren()
        i = 0
        for j in root.getchildren():
                if j.tag == "suites":
                        suites.append(j)
        #               print "match"
        suites = suites[0]
        for Suite in suites.getchildren():
                parts = Suite.getchildren()
                for j in parts:
                        if j.tag == "cases":
                                cases.append(j)
        #                       print "match"

                if len(cases)!=0:
                        cases = cases[0]
#               print testcases

                for case in cases:

                        for j in case :
                        #       print x, x.tag
                                if j.tag == "testName":
                                        testName = j.text
                                        print testName
                                elif j.tag == "skipped":
                                        skipped = j.text
                                        print skipped
                                elif j.tag == "failedSince":
                                        failed = j.text
                                        print failed
                        i += 1
                        if int (failed) !=  0:
                         #       print "match found. Failure value", failed
                                res_dict[testName] = 1
        pickle.dump(res_dict, open("res_dict" , "rb+"))
#               print i

if sys.argv[1] == 'uselesstest':
        uselesstest()
        sys.exit()
elif sys.argv[1] == 'checktest':
        checktest()
        sys.exit()
