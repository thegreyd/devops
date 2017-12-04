#!/bin/bash
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/ubuntu/

i="0"

while [ $i -lt 1 ]
do

name=$(date +%F-%T)
echo $name >> /home/ubuntu/csc_519_devops/dashboard/data/timestamps.txt
cd /home/ubuntu/FlameGraph
perf record -F 99 -a -g -- sleep 90
perf script | ./stackcollapse-perf.pl > out.perf-folded
./flamegraph.pl out.perf-folded > perf-kernel.svg
mv perf-kernel.svg  /home/ubuntu/csc_519_devops/dashboard/data/perf-kernel_$name.svg

perf script | ./stackcollapse-perf.pl > out.perf-folded
grep -v cpu_idle out.perf-folded | ./flamegraph.pl > nonidle.svg
mv nonidle.svg  /home/ubuntu/csc_519_devops/dashboard/data/nonidle_$name.svg

sleep 150
done
