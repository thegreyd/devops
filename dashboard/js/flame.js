$('#from').change(function () {
	var val = $('#from').val();
	$("#perf").attr('src',"data/perf-kernel_"+val+".svg")
	$("#idle").attr('src',"data/nonidle_"+val+".svg")
})