import subprocess
import os
import sys

port = "netstat -tuwanp4 | awk '{print $4}' | grep ':' | cut -d ':' -f 2"
#output = subprocess.check_output( '{} | tee /dev/stderr'.format( cmd ), shell = True)
port_out = subprocess.check_output(port , shell = True)
port_out = port_out.split('\n')
for o in range(len(port_out)):
    try:
        int(port_out[o])
    except:
        port_out.pop(o)

pro = "netstat -tuwanp4 | awk '{print $7}' | grep / | cut -d '/' -f 2"
pro_out = subprocess.check_output(pro , shell = True)
pro_out = pro_out.split('\n')

known = []

for i in range (min(len (port_out) , len(pro_out))):
    if port_out[i] not in known:
	    print port_out[i], "\t" , pro_out[i]
	    known.append(port_out[i])

if len(port_out) > len (pro_out):
    for i in range (len(port_out) - len (pro_out) , len (port_out)):
    	if port_out[i] not in known:
	    	print port_out[i], "\t" , "N/A"
	    	known.append(port_out[i])
    	
