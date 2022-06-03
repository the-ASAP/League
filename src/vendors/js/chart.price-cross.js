// табы для графика, временное решение
const productTypeArr = document.querySelectorAll("#product-tab");
const periodArr = document.querySelectorAll("#period-tab");

for (let btn of productTypeArr) {
  btn.addEventListener("click", (e) => toggleProductType(e));
}

function toggleProductType(e) {
  for (let btn of productTypeArr) {
    btn.classList.remove("active");
  }
  e.target.classList.add("active");
}

for (let btn of periodArr) {
  btn.addEventListener("click", (e) => togglePeriodType(e));
}

function togglePeriodType(e) {
  for (let btn of periodArr) {
    btn.classList.remove("active");
  }
  e.target.classList.add("active");
}

// -----------------------моковые данные----------------------------------------------------
const mockLabels = ["фев 21", "апр 21", "июнь 21", "авг 21", "окт 21", "дек 21"];
const mockData = [
  {
    pointsArr: [30, 33, 35, 40, 37, 35],
  },
  {
    pointsArr: [37, 39, 45, 42, 35, 30],
  },
  {
    pointsArr: [27, 29, 25, 27, 25, 23],
  },
  {
    pointsArr: [57, 59, 55, 58, 60, 62],
  },
  {
    pointsArr: [12, 25, 37, 39, 45, 50],
  },
];

// ------------------график для страницы price-index-cross ------------------------------
function createGraphCross(arrLabels, arrData) {
  const ctx = document.getElementById("Graph-Cross").getContext("2d");

  const data = {
    labels: arrLabels,
    datasets: [
      {
        data: arrData[0].pointsArr,
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#9A57DD",
        borderColor: "#9A57DD",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },

      {
        data: arrData[1].pointsArr,
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#20DAB8",
        borderColor: "#20DAB8",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[2].pointsArr,
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#FEC859",
        borderColor: "#FEC859",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[3].pointsArr,
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#1172D3",
        borderColor: "#1172D3",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[4].pointsArr,
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#FD7B1E",
        borderColor: "#FD7B1E",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
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
        tooltip: {
          titleColor: "#40CE50",
          backgroundColor: "#252525",
          yAlign: "bottom",
          padding: {
            x: 10,
            y: 5,
          },
          callbacks: {
            title: function (tooltip) {
              return `${tooltip[0].formattedValue}`;
            },
            label: (tool) => "",
            body: (tool) => "",
          },
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
            borderDash: [3, 4],
          },
        },
      },
    },
  };

  const GraphCross = new Chart(ctx, config);

  // чекбоксы переключения
  const hiddenGraph = (input, id) => {
    if (input.checked) {
      GraphCross.getDatasetMeta(id).hidden = false;
      GraphCross.update();
    } else {
      GraphCross.getDatasetMeta(id).hidden = true;
      GraphCross.update();
    }
  };

  $("#checkbox__1").change(function () {
    hiddenGraph(this, 0);
  });
  $("#checkbox__2").change(function () {
    hiddenGraph(this, 1);
  });
  $("#checkbox__3").change(function () {
    hiddenGraph(this, 2);
  });
  $("#checkbox__4").change(function () {
    hiddenGraph(this, 3);
  });
  $("#checkbox__5").change(function () {
    hiddenGraph(this, 4);
  });
}

// ----------------------------------------------------

$().ready(() => {
  createGraphCross(mockLabels, mockData);
});
