#!/bin/bash

i="0"

while [ $i -lt 2 ]
do

curl http://54.201.183.218/studies.html
curl http://54.201.183.218/developers.html
curl http://54.201.183.218/researchers.html

sleep 300
done

