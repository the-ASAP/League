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

const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
  
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
  
      const table = document.createElement('table');
      table.style.margin = '0px';
  
      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }
  
    return tooltipEl;
  };
  
  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const {chart, tooltip} = context;
    const tooltipEl = getOrCreateTooltip(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
  
    // Set Text
    if (tooltip.body) {
    //   const titleLines = tooltip.title || [];
    //   const bodyLines = tooltip.body.map(b => b.lines);
  
    //   const tableHead = document.createElement('thead');
  
    //   titleLines.forEach(title => {
    //     const tr = document.createElement('tr');
    //     tr.style.borderWidth = 0;
  
    //     const th = document.createElement('th');
    //     th.style.borderWidth = 0;
    //     const text = document.createTextNode(title);
  
    //     th.appendChild(text);
    //     tr.appendChild(th);
    //     tableHead.appendChild(tr);
    //   });
  
    //   const tableBody = document.createElement('tbody');
    //   bodyLines.forEach((body, i) => {
    //     const colors = tooltip.labelColors[i];
  
    //     const span = document.createElement('span');
    //     span.style.background = colors.backgroundColor;
    //     span.style.borderColor = colors.borderColor;
    //     span.style.borderWidth = '2px';
    //     span.style.marginRight = '10px';
    //     span.style.height = '10px';
    //     span.style.width = '10px';
    //     span.style.display = 'inline-block';
  
    //     const tr = document.createElement('tr');
    //     tr.style.backgroundColor = 'inherit';
    //     tr.style.borderWidth = 0;
  
    //     const td = document.createElement('td');
    //     td.style.borderWidth = 0;
  
    //     const text = document.createTextNode(body);
  
    //     td.appendChild(span);
    //     td.appendChild(text);
    //     tr.appendChild(td);
    //     tableBody.appendChild(tr);
    //   });
  
    //   const tableRoot = tooltipEl.querySelector('table');
  
      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }
  
      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

const Graph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
              display: false
            },
            tooltip: {
                enabled: false,
                external: externalTooltipHandler
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

