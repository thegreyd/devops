#!/bin/bash
# Basic while loop
counter=1
while [ $counter -le 15 ]
do
ansible-playbook FuzzerCommit.yml  
echo $counter
((counter++))
sleep 50
done
echo All done

