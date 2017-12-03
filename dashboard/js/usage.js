$(function() {
    var content = $('#json').text();
    Morris.Area({
        element: 'usage-chart',
        data: JSON.parse(content),
        xkey: 'timestamp',
        // ykeys: ['iphone', 'ipad', 'itouch'],
        ykeys: ['cpu','memory','disk'],
        // labels: ['iPhone', 'iPad', 'iPod Touch'],
        labels: ['CPU Usage','Memory Usage', 'Disk Usage'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
    
});
