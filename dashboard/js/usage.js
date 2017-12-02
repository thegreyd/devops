$(function() {

    Morris.Area({
        element: 'usage-chart',
        data: [{
            period: '00:00',
            cpu: 60
        }, {
            period: '01:00',
            cpu: 70
        }, {
            period: '02:00',
            cpu: 90
        }, {
            period: '03:00',
            cpu: 40
        }, {
            period: '04:00',
            cpu: 60
        }],
        xkey: 'period',
        // ykeys: ['iphone', 'ipad', 'itouch'],
        ykeys: ['cpu'],
        // labels: ['iPhone', 'iPad', 'iPod Touch'],
        labels: ['CPU Usage'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
    
});
