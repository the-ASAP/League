// табы для графика, временное решение
const productTypeArr = document.querySelectorAll(".product-tab");
const periodArr = document.querySelectorAll(".period-tab");

for (let btn of productTypeArr) {
  btn.addEventListener("click", (e) => toggleProductType(e));
}

for (let btn of periodArr) {
  btn.addEventListener("click", (e) => togglePeriodType(e));
}

function toggleProductType(e) {
  // console.log(e.target.id.slice(e.target.id.length - 1));
  $.ajax({
    url: "http://liga.asap-lp.ru/analytics/",
    type: "post",
    data: { product: e.target.id },
  }).done(function (res) {
    for (let btn of productTypeArr) {
      btn.classList.remove("active");
    }
    e.target.classList.add("active");
  });
}

function togglePeriodType(e) {
  $.ajax({
    url: "http://liga.asap-lp.ru/analytics/",
    type: "post",
    data: { period: e.target.id },
  }).done(function (res) {
    for (let btn of periodArr) {
      btn.classList.remove("active");
    }
    e.target.classList.add("active");
  });
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
    [20578, 23934, 28278, 35459, 40224, 45046, 47485, 49245, 52678, 54234, 50764, 49356, 47467],
    [30946, 33385, 38935, 42956, 50395, 53835, 48935, 42926, 39935, 44568, 47935, 57853, 59457],
    [35846, 37936, 40752, 44982, 48340, 52486, 55497, 54123, 58345, 57556, 55348, 57654, 55458],
  ],
};

const crossData = {
  labels: ["фев 21", "апр 21", "июнь 21", "авг 21", "окт 21", "дек 21"],
  data: [
    [30, 33, 35, 40, 37, 35],
    [37, 39, 45, 42, 35, 30],
    [27, 29, 25, 27, 25, 23],
    [57, 59, 55, 58, 60, 62],
    [12, 25, 37, 39, 45, 50],
  ],
};

// ------------------график для ГЛАВНОЙ страницы price-index ------------------------------
function createGraphIndex(arrLabels, arrData) {
  console.log("createGraphIndex work");
  const ctx = document.getElementById("myChart").getContext("2d");

  // gradient 1
  const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient1.addColorStop(0, "rgba(107, 87, 221, 0.5)");
  gradient1.addColorStop(1, "rgba(154, 87, 221, 0)");

  // gradient 2
  const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient2.addColorStop(0, "rgba(17, 114, 211, 0.5)");
  gradient2.addColorStop(1, "rgba(17, 114, 211, 0)");

  // gradient 3
  const gradient3 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient3.addColorStop(0, "rgba(254, 200, 89, 0.8)");
  gradient3.addColorStop(1, "rgba(254, 200, 89, 0)");

  const data = {
    labels: arrLabels,
    datasets: [
      {
        data: arrData[0],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#9A57DD",
        borderColor: "#9A57DD",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },

      {
        data: arrData[1],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#1172D3",
        borderColor: "#1172D3",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[2],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
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
        // custom tooltip--------------------------------
        tooltip: {
          // Disable the on-canvas tooltip
          enabled: false,

          external: function (context) {
            // Tooltip Element
            let tooltipEl = document.getElementById("chartjs-tooltip");

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement("div");
              tooltipEl.id = "chartjs-tooltip";
              tooltipEl.classList.add("tooltip");
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            const tooltipModel = context.tooltip;
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove("above", "below", "no-transform");
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add("no-transform");
            }

            if (tooltipModel.body) {
              let innerHtml = "";
              let allValues = tooltipModel.dataPoints[0].dataset.data;
              let currentIndex = tooltipModel.dataPoints[0].dataIndex;
              let curValue = allValues[currentIndex];
              let diffPercent = "";
              let dynamics = "";
              let tooltipText = "";

              if (currentIndex > 0) {
                const prevValue = allValues[currentIndex - 1];

                if (prevValue > curValue) {
                  diffPercent = ((prevValue - curValue) * 100) / prevValue;
                  dynamics = "down";
                }

                if (prevValue < curValue) {
                  diffPercent = ((curValue - prevValue) * 100) / curValue;
                  dynamics = "up";
                }

                // Set Text
                tooltipText = `<span class='tooltip__title'> ${curValue} ₽ 
               <span class='tooltip__diff ${dynamics}'>  ${diffPercent.toFixed(1)}% 
               </span>
                </span>`;
              } else if (currentIndex === 0) {
                tooltipText = `<span class='tooltip__title'> ${curValue} ₽ </span>`;
              }

              innerHtml += tooltipText;

              tooltipEl.innerHTML = innerHtml;
            }

            const position = context.chart.canvas.getBoundingClientRect();
            const bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = "absolute";
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + "px";
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + "px";
            tooltipEl.style.font = bodyFont.string;
            tooltipEl.style.padding = tooltipModel.padding + "px " + tooltipModel.padding + "px";
            tooltipEl.style.pointerEvents = "none";
          },
        },
        // ------------------------------------------------
      },

      scales: {
        y: {
          grid: {
            borderWidth: 0,
          },
          suggestedMin: 10000,
          suggestedMax: 70000,
          ticks: {
            callback: function (value) {
              return value / 1000 + " K";
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

  Chart.defaults.font.family = "Jost";
  const GraphIndex = new Chart(ctx, config);
  console.log(GraphIndex);

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

  // чекбоксы проверка на градиент
  function checkGradient() {
    const idArr = [
      { id: "#checkbox__1", ind: 0, gradient: [gradient1] },
      { id: "#checkbox__2", ind: 1, gradient: [gradient2] },
      { id: "#checkbox__3", ind: 2, gradient: [gradient3] },
    ];
    const checkedCount = [];

    idArr.forEach((item) => {
      document.querySelector(item.id).checked && checkedCount.push(item);
    });

    if (checkedCount.length === 1) {
      const { ind, gradient } = checkedCount[0];

      GraphIndex.data.datasets[ind].fill = true;
      GraphIndex.data.datasets[ind].backgroundColor = gradient;
      GraphIndex.update();
    } else {
      idArr.forEach((item) => {
        GraphIndex.data.datasets[item.ind].fill = false;
      });
      GraphIndex.update();
    }
  }

  $("#checkbox__1").change(function () {
    hiddenGraph(this, 0);
    checkGradient();
  });
  $("#checkbox__2").change(function () {
    hiddenGraph(this, 1);
    checkGradient();
  });
  $("#checkbox__3").change(function () {
    hiddenGraph(this, 2);
    checkGradient();
  });
}

// ------------------график для страницы CROSS price-index-cross  ------------------------------
function createGraphCross(arrLabels, arrData) {
  const ctx = document.getElementById("Graph-Cross").getContext("2d");

  const data = {
    labels: arrLabels,
    datasets: [
      {
        data: arrData[0],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#9A57DD",
        borderColor: "#9A57DD",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },

      {
        data: arrData[1],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#20DAB8",
        borderColor: "#20DAB8",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[2],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#FEC859",
        borderColor: "#FEC859",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[3],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#1172D3",
        borderColor: "#1172D3",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[4],
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
  createGraphIndex(priceIndexData.labels, priceIndexData.data);
});

$().ready(() => {
  createGraphCross(crossData.labels, crossData.data);
});
