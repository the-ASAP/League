const ctx = $('#Graph')

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
            borderColor: '#EB5757',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#9B51E0',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#2F80ED',
            fill: false,
            tension: 0.4,
        },
    ],

};
  
const Graph = new Chart(ctx, {
    type: 'line',
    data: data,
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

$(function() {
    $('#date_range').datepicker({
      range: 'period', // режим - выбор периода
      numberOfMonths: 2,
      onSelect: function(dateText, inst, extensionRange) {
          // extensionRange - объект расширения
        $('[name=startDate]').val(extensionRange.startDateText);
        $('[name=endDate]').val(extensionRange.endDateText);
      }
    });
  
    $('#date_range').datepicker('setDate', ['+4d', '+8d']);
  
    // объект расширения (хранит состояние календаря)
    var extensionRange = $('#date_range').datepicker('widget').data('datepickerExtensionRange');
    if(extensionRange.startDateText) $('[name=startDate]').val(extensionRange.startDateText);
    if(extensionRange.endDateText) $('[name=endDate]').val(extensionRange.endDateText);
  });