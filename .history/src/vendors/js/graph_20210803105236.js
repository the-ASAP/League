const ctx = $('#Graph')

const randomDatapoints = (lenghtArr, min, max) => {
    let res = []

    for(let i = 0; i < lenghtArr; i++) {
        let point = Math.round(min - 0.5 + Math.random() * (max - min + 1))
        res.push(point)
    }
    
    return res
}
console.log(randomDatapoints(6,0,225))

const datapoints = [0, 20, 60, 120, 180, 125];
const data = {
    labels:['21.02', '22.02', '23.02', '24.02', '25.02', '26.02',],
    datasets: [
        {
            data: datapoints,
            borderColor: 'red',
            fill: false,
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
    title: false
})

