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
const priceIndexData = {
  labels: [
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
  ],
  data: [
    {
      pointsArr: [20, 23, 28, 35, 40, 45, 47, 49, 52, 54, 50, 49],
    },
    {
      pointsArr: [30, 33, 38, 42, 50, 53, 48, 42, 39, 44, 47, 57],
    },
    {
      pointsArr: [35, 37, 40, 44, 48, 52, 55, 54, 58, 57, 55, 57],
    },
  ],
};

// ------------------график для ГЛАВНОЙ страницы price-index ------------------------------
function createGraphIndex(arrLabels, arrData) {
  console.log("createGraphIndex work");
  const ctx = document.getElementById("myChart").getContext("2d");

  // gradient 1
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, "rgba(254, 200, 89, 0.8)");
  gradient1.addColorStop(1, "rgba(254, 200, 89, 0)");

  // gradient 2
  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, "green");
  gradient2.addColorStop(1, "black");

  const data = {
    labels: arrLabels,
    datasets: [
      {
        data: arrData[0].pointsArr,
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        // fill: true,
        // backgroundColor: gradient1,
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
        // fill: true,
        // backgroundColor: gradient2,
        pointBorderColor: "#1172D3",
        borderColor: "#1172D3",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[2].pointsArr,
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        fill: true,
        backgroundColor: gradient1,
        pointBorderColor: "#FEC859",
        borderColor: "#FEC859",
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

  const GraphIndex = new Chart(ctx, config);

  // чекбоксы переключения
  const hiddenGraph = (input, id) => {
    if (input.checked) {
      GraphIndex.getDatasetMeta(id).hidden = false;
      GraphIndex.update();
    } else {
      GraphIndex.getDatasetMeta(id).hidden = true;
      GraphIndex.update();
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
}
// ----------------------------------------------------

$().ready(() => {
  createGraphIndex(priceIndexData.labels, priceIndexData.data);
});
