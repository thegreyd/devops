$(document).ready(function() {
	$.ajax({
		url: "http://localhost:3002/ping",
		method: 'get',
		dataType: 'json',
		success: function(data) {
			alert(data);
		}
	});
	// alert("Ready");
});