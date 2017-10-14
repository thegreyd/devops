#!/bin/bash -e
for ((i=1;i<=100;i+=1)
do
    commit_message="$1"
    git add . -A
    git commit -m "$commit_message"
done