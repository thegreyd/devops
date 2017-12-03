import subprocess
import os
import sys


port = "netstat -tuwanp4 | awk '{print $4}' | grep ':' | cut -d ':' -f 2"
#output = subprocess.check_output( '{} | tee /dev/stderr'.format( cmd ), shell = True)
port_out = subprocess.check_output(port , shell = True)
port_out = port_out.split('\n')
for o in range(len(port_out)):
#       print o
        try:
                int(port_out[o])
        except:
#               print "Removing tnis"
                port_out.pop(o)

pro = "netstat -tuwanp4 | awk '{print $7}' | grep / | cut -d '/' -f 2"
pro_out = subprocess.check_output(pro , shell = True)
pro_out = pro_out.split('\n')

print len(port_out), len (pro_out)

for i in range (min(len (port_out) , len(pro_out))):
        #i = map(int , i)
#       print i , type(i)
        print port_out[i], "\t" , pro_out[i]

if len(port_out) > len (pro_out):
        for i in range (len(port_out) - len (pro_out) , len (port_out)):
                print port_out[i] , "\t", "---"
