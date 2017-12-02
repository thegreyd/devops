#i="0"
#while [ $i -lt 2 ]
#do 
#git clone https://github.com/brendangregg/FlameGraph
#alias p='cd FlameGraph'
cd /root/FlameGraph/
perf record -F 99 -a -g -- sleep 60
perf script | ./stackcollapse-perf.pl > out.perf-folded
./flamegraph.pl out.perf-folded > perf-kernel.svg
mv perf-kernel.svg  /home/mpdesai/svg_files/perf-kernel.svg_$(date +%F-%T)
#mv "perf-kernel.svg" "/home/mpdesai/svg_files$(date -r "perf-kernel" +"%Y%m%d_%H%M%S").jpg"


perf script | ./stackcollapse-perf.pl > out.perf-folded
grep -v cpu_idle out.perf-folded | ./flamegraph.pl > nonidle.svg
grep ext4 out.perf-folded | ./flamegraph.pl > ext4internals.svg
#egrep 'system_call.*sys_(read|write)' out.perf-folded | ./flamegraph.pl > rw.svg

mv nonidle.svg  /home/mpdesai/svg_files/nonidle_$(date +%F-%T)
mv ext4internals.svg  /home/mpdesai/svg_files/ext4internals_$(date +%F-%T)
mv rw.svg  /home/mpdesai/svg_files/rw_$(date +%F-%T)

#i=$[$i+1]
#done
