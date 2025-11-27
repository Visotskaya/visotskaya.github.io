var chart = new Chartist.Line('#level-chart', {
    labels: [2002,2004, 2006, 2009, 2010, 2012, 2013, 2014, 2015 , 2016, 2017],
    series: [
        [
            {meta: null, value: null},
            {meta: 10, value: 10},
            {meta: 18, value: 18},
            {meta: 24, value: 24},
            {meta: 31, value: 31},
            {meta: 32, value: 32},
            {meta: 36, value: 36},
            {meta: 46, value: 46},
            {meta: 56, value: 56},
            {meta:75, value: 75},
            {meta: 85, value: 85}
        ],
        [
            {meta: '2002 - Основание компании', value: 0},
            {meta: '2002 - Основание компании', value: 60},
            {meta: '2006 - Запуск Ecocard', value: 80},
            {meta: '2009 - Резиденты ПВТ', value:90},
            {meta: '2009 - Резиденты ПВТ', value:95},
            {meta: '2012 - Ребрендинг', value: 100},
            {meta: '2013 - Начало проекта со Swiss Re', value: 105},
            {meta: '2013 - Silver Partnership с Microsoft', value:110},
            {meta: '2015 - Запуск ecoVoucher', value:115},
            {meta: '2016 - Gartner присвоил Infolio звание Cool Vendor', value:120},
            {meta: null, value: null}
        ]
    ]
}, {
    showArea: false,
    showLine: true,
    showPoint: true,
    fullWidth: true,
    seriesBarDistance: 1,
    axisX: {
        showLabel: true,
        showGrid: false
    },
    axisY: {
        showLabel: false,
        labelInterpolationFnc: function(value, index) {
            return value;
        }
    },
    plugins: [
        Chartist.plugins.ctPointLabels({
            textAnchor: 'middle'
        }),
        Chartist.plugins.tooltip()
    ],
    chartPadding: {
        right: 20,
        left:0
    }
});

var chart2 = new Chartist.Line('#level-chart2', {
    series: [[
        { x: 2002, y: 18 },
        { x: 2004, y:20 },
        { x: 2006, y:22 },
        { x: 2009, y:28 },
        { x: 2012, y: 30},
        { x: 2013, y: 35 },
        { x: 2015, y: 42 },
        { x: 2016, y: 55 },
        { x: 2017, y: 65}
    ]]
    },{
    seriesBarDistance: 10,
    axisX: {
        showLabel: false,
        showGrid: false
    },
    axisY: {
        showLabel: false,
        offset: 80,
        divisor: 1
    },
    plugins: [
        Chartist.plugins.ctPointLabels({
            textAnchor: 'middle'
        })
    ]
});

// Let's put a sequence number aside so we can use it in the event callbacks
var seq = 0,
    delays = 80,
    durations = 500;

// Once the chart is fully created we reset the sequence
chart.on('created', function() {
    seq = 0;
});

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
chart.on('draw', function(data) {
    seq++;

    if(data.type === 'line') {
        // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
        data.element.animate({
            opacity: {
                // The delay when we like to start the animation
                begin: seq * delays + 1000,
                // Duration of the animation
                dur: durations,
                // The value where the animation should start
                from: 0,
                // The value where it should end
                to: 1
            }
        });
    } else if(data.type === 'label' && data.axis === 'x') {
        data.element.animate({
            y: {
                begin: seq * delays,
                dur: durations,
                from: data.y + 100,
                to: data.y,
                // We can specify an easing function from Chartist.Svg.Easing
                easing: 'easeOutQuart'
            }
        });
    } else if(data.type === 'label' && data.axis === 'y') {
        data.element.animate({
            x: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 100,
                to: data.x,
                easing: 'easeOutQuart'
            }
        });
    } else if(data.type === 'point') {
        data.element.animate({
            x1: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
            },
            x2: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
            },
            opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
            }
        });
    } else if(data.type === 'grid') {
        // Using data.axis we get x or y which we can use to construct our animation definition objects
        var pos1Animation = {
            begin: seq * delays,
            dur: durations,
            from: data[data.axis.units.pos + '1'] - 30,
            to: data[data.axis.units.pos + '1'],
            easing: 'easeOutQuart'
        };

        var pos2Animation = {
            begin: seq * delays,
            dur: durations,
            from: data[data.axis.units.pos + '2'] - 100,
            to: data[data.axis.units.pos + '2'],
            easing: 'easeOutQuart'
        };

        var animations = {};
        animations[data.axis.units.pos + '1'] = pos1Animation;
        animations[data.axis.units.pos + '2'] = pos2Animation;
        animations['opacity'] = {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'easeOutQuart'
        };

        data.element.animate(animations);
    }
});

// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
chart.on('created', function() {
    if(window.__exampleAnimateTimeout) {
        clearTimeout(window.__exampleAnimateTimeout);
        window.__exampleAnimateTimeout = null;
    }
    window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
});