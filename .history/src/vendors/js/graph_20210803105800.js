const ctx = $('#Graph')

const randomDatapoints = (lenghtArr, min, max) => {
    let res = []

    for(let i = 0; i < lenghtArr; i++) {
        let point = Math.round(min - 0.5 + Math.random() * (max - min + 1))
        res.push(point)
    }
    
    return res
}

const datapoints = [0, 20, 60, 120, 180, 125];
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
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#C05394',
            fill: false,
            tension: 0.4,
        },
        {
            data: randomDatapoints(6,0,225),
            borderColor: '#219653',
            fill: false,
            tension: 0.4,
        }
    ],

};

const Graph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
    },
})

