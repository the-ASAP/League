const ctx = $('#Graph')
const mobile = $(window).width() < 768
console.log(mobile)

const randomDatapoints = (lenghtArr, min, max) => {
    let res = []

    for(let i = 0; i < lenghtArr; i++) {
        let point = Math.round(min - 0.5 + Math.random() * (max - min + 1))
        res.push(point)
    }
    
    return res
}

// const datapoints = [0, 20, 60, 120, 180, 125];
// const labels = ['21.02', '22.02', '23.02', '24.02', '25.02', '26.02',],

const data = {
    labels:['21.02', '22.02', '23.02', '24.02', '25.02', '26.02',],
    datasets: [
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#95B403',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#6C6AE0',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#C05394',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#48BCED',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#BDAD1E',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#C05394',
            fill: false,
            tension: 0.4,
        },
    ],

};
  
const Graph = new Chart(ctx, {
    type: 'line',
    data: data,
    // responsive: true,
    options: {
        showAllTooltips: true,
        responsive: true,
        interaction: {
            mode: 'point'
        },
        plugins: {
            legend: {
              display: false
            },   
            tooltip: {
                backgroundColor: '#000',
                position: 'average',
                callbacks: {
                    title: function (tooltip) {
                        return `${tooltip[0].label}: ${tooltip[0].formattedValue} тыс.руб.`
                    },
                    label: (tool) => '',
                    body: (tool) => '',
                }
            }
        },
        scales: {
            xAxes: {
                display: false
            },
            yAxes: [{
            }]
        },
    },
})

if(mobile) {
    Graph.canvas.parentNode.style.height = '500px';
    Graph.canvas.parentNode.style.width = '100%';
}

const hiddenGraph = (input, id) => {
    if(input.checked) {
        Graph.getDatasetMeta(id).hidden=false;
        Graph.update();
    }
    else {
        Graph.getDatasetMeta(id).hidden=true;
        Graph.update();
    }
}

$('#input_1').change(function() {
    hiddenGraph(this, 0)
})
$('#input_2').change(function() {
    hiddenGraph(this, 1)
})
$('#input_3').change(function() {
    hiddenGraph(this, 2)
})
$('#input_4').change(function() {
    hiddenGraph(this, 3)
})
$('#input_5').change(function() {
    hiddenGraph(this, 4)
})
$('#input_6').change(function() {
    hiddenGraph(this, 5)
})

$(function() {
    $('#date_range').datepicker({
        range: 'period', // режим - выбор периода
        numberOfMonths: 1,
        onSelect: function(dateText, inst, extensionRange) {
            // extensionRange - объект расширения
            $('[name=startDate]').val(extensionRange.startDateText);
            $('[name=endDate]').val(extensionRange.endDateText);
        }
    });

    $('#date_range').datepicker('setDate', ['+4d', '+8d']);

    // // объект расширения (хранит состояние календаря)
    var extensionRange = $('#date_range').datepicker('widget').data('datepickerExtensionRange');
    if(extensionRange.startDateText) $('[name=startDate]').val(extensionRange.startDateText);
    if(extensionRange.endDateText) $('[name=endDate]').val(extensionRange.endDateText);
});

// $('.customInput').click(() => {
//     $('.ui-datepicker').css({'display': 'block !important'})
// })