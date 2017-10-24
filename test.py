import sys
import pickle
import os
import xml.etree.ElementTree as ET

def uselesstest():
        res_dict = pickle.load(open('res_dict', 'rb+'))
	count = 0 
        for i in res_dict :
                if res_dict[i] == 0 :
                        print "Useless Test", i
			count +=1
#		else : 
#			print "Not useless", i 
#			count +=1 
	print count
#fd = open("/var/lib/jenkins/jobs/iTrust/builds/15/junitResult.xml", 'r')
def checktest():

        for i in range (34 , 148):
                res_dict = pickle.load(open('res_dict', 'rb+'))
                cases = []
                suites = []
                try:
                        fd = ET.parse('/var/lib/jenkins/jobs/iTrust/builds/%s/junitResult.xml'%str(i))
                except:
			print "in here"
                        continue
                root = fd.getroot()
                #print root.getchildren()
                count2 = 0
                for j in root.getchildren():
                        if j.tag == "suites":
                                suites.append(j)
                #               print "match"
                if (len(suites) != 0):
                        suites = suites[0]
                        for Suite in suites.getchildren():
                                parts = Suite.getchildren()
        			cases = filter (lambda x:x.tag=="cases", parts)       
	   #              for j in parts:
                  #                      if j.tag == "cases":
                  #                              cases.append(j)
                        #                       print "match"

                                if len(cases)!=0:
                                        cases = cases[0]
                #               print testcases

                                for case in cases:
                                        for j in case :
                                        #       print x, x.tag
                                                if j.tag == "testName":
                                                        testName = j.text
#                                                        print testName
                                                elif j.tag == "skipped":
                                                        skipped = j.text
#                                                        print skipped
                                                elif j.tag == "failedSince":
                                                        failed = j.text
#                                                        print failed
                                        count2 += 1
                                	if int (failed) !=  0 or str(skipped) != "false":
#                                        	print "match found. Failure value", failed, testName
                                        	res_dict[testName] = 1
        	pickle.dump(res_dict, open("res_dict" , "rb+"))
 #       	print count2


def reset():
        res_dict = pickle.load(open('res_dict', 'rb+'))
        for i in res_dict:
                res_dict[i] = 0
                pickle.dump(res_dict , open ('res_dict', 'rb+'))

if sys.argv[1] == 'uselesstest':
        uselesstest()
        sys.exit()

elif sys.argv[1] == 'checktest':
        checktest()
        sys.exit()

elif sys.argv[1] == 'reset':
        reset()
        sys.exit()
