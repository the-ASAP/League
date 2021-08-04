const ctx = $('#Graph')

const data = {
    labels:['21.02', '22.02', '23.02', '24.02', '25.02', '26.02',]
};

const Graph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        }
        }
    },
})

