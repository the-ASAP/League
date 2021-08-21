const ctx = $('#Graph')

const datapoints = [0, 20, 60, 120, 180, 125];
const data = {
    labels:['21.02', '22.02', '23.02', '24.02', '25.02', '26.02',],
    datasets: [
        {
            data: datapoints,
            borderColor: 'red',
            fill: true,
            tension: 0.4,
        }
    ]
};

const Graph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
    },
})

