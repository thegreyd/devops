import subprocess
import os
import sys


cmd = "netstat -tuwanp4 | awk '{print $4}' | grep ':' | cut -d ':' -f 2 | uniq"
#output = subprocess.check_output( '{} | tee /dev/stderr'.format( cmd ), shell = True)
output = subprocess.check_output(cmd , shell = True)
output = output.split('\n')
for o in range(len(output)):
#	print o 
	try:
		int(output[o])
	except:
#		print "Removing tnis"
		output.pop(o)

known = []

for i in output:
	#i = map(int , i)
#	print i , type(i)
	
	if i not in known:
		if int(i) <= 1023:
			print i, "\t Well known port "

		elif int(i) <= 49151 :
			 print i, "\t Registered port"
		
		else :
			 print i, "\t Dynamic port | CLOSE THIS PORT"
	known.append(i)
