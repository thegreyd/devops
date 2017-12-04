$(function() {
    var content = $('#json').text();
    Morris.Area({
        element: 'disk-chart',
        data: JSON.parse(content),
        xkey: 'timestamp',
        // ykeys: ['iphone', 'ipad', 'itouch'],
        ykeys: ['disk'],
        // labels: ['iPhone', 'iPad', 'iPod Touch'],
        labels: ['Disk Usage'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
    Morris.Area({
        element: 'memory-chart',
        data: JSON.parse(content),
        xkey: 'timestamp',
        // ykeys: ['iphone', 'ipad', 'itouch'],
        ykeys: ['memory'],
        // labels: ['iPhone', 'iPad', 'iPod Touch'],
        labels: ['Memory Usage'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
    Morris.Area({
        element: 'cpu-chart',
        data: JSON.parse(content),
        xkey: 'timestamp',
        // ykeys: ['iphone', 'ipad', 'itouch'],
        ykeys: ['cpu'],
        // labels: ['iPhone', 'iPad', 'iPod Touch'],
        labels: ['CPU Usage'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
});
