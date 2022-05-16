const ctx = document.getElementById("myChart").getContext("2d");

// gradient 1
const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
gradient1.addColorStop(0, "rgba(254, 200, 89, 0.8)");
gradient1.addColorStop(1, "rgba(254, 200, 89, 0)");

// gradient 2
const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
gradient2.addColorStop(0, "green");
gradient2.addColorStop(1, "black");

const labels = [
  "",
  "Янв 21",
  "фев 21",
  "мар 21",
  "апр2 21",
  "май 21",
  "июнь 21",
  "июнь 21",
  "авг 21",
  "сен 21",
  "окт 21",
  "ноя 21",
  "дек 21",
];

const data = {
  labels: labels,
  datasets: [
    {
      data: [30, 33, 38, 42, 50, 53, 48, 42, 39, 44, 47, 57],
      label: "variant1",
      fill: true,
      backgroundColor: gradient1,
      radius: 12,
      hoverRadius: 19,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 4,
      pointBorderColor: "#FEC859",
      tension: 0.4,
    },

    //  {
    //    data: [20, 15, 17, 19, 21, 23, 20, 18, 16, 19, 22, 24],
    //    label: "variant2",
    //    fill: true,
    //    // backgroundColor: gradient2,
    //    radius: 12,
    //    hoverRadius: 19,
    //    pointBackgroundColor: "#fff",
    //    pointBorderWidth: 4,
    //    pointBorderColor: "#FEC859",
    //    tension: 0.4,
    //  },
  ],
};

const config = {
  type: "line",
  data: data,

  options: {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        grid: {
          borderWidth: 0,
        },
        suggestedMin: 10,
        suggestedMax: 70,
        ticks: {
          callback: function (value) {
            return value + "k";
          },
          // padding: 20, //отступ по вертикали у меток
          // stepSize: 10,  шаг оси
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);
