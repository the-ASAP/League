// -----------------------моковые данные----------------------------------------------------
const crossData = {
  labels: ["фев 21", "апр 21", "июнь 21", "авг 21", "окт 21", "дек 21"],
  data: [
    [20578, 43934, 58278, 35459, 20224, 45046],
    [30946, 33385, 38935, 42956, 50395, 53835],
    [35846, 37936, 40752, 44982, 48340, 52486],
    [20578, 23934, 28278, 35459, 40224, 45046],
    [30946, 33485, 38935, 72956, 60395, 43835],
  ],
};

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

            const { chart } = context;
            var currentTooltip = context.tooltip.dataPoints[0].dataIndex;
            var keys = Object.keys(context.tooltip.dataPoints[0].dataset.data);

            if (
              window.innerWidth < 500 &&
              (currentTooltip == keys[keys.length - 1] ||
                currentTooltip == keys[keys.length - 2] ||
                currentTooltip == keys[keys.length - 3] ||
                currentTooltip == keys[keys.length - 4])
            ) {
              tooltipEl.style.left = chart.canvas.offsetLeft + context.tooltip.caretX - 100 + "px";
            }
          },
        },
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
              return value / 1000 + " K \u00A0\u00A0\u00A0\u00A0";
            },
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

  // табы для графика CROSS
  const periodArr = document.querySelectorAll(".period-tab");

  for (let btn of periodArr) {
    btn.addEventListener("click", (e) => togglePeriodType(e));
  }

  function togglePeriodType(e) {
    const periodNum = e.target.getAttribute("data-period");

    $.ajax({
      // url: `http://liga.asap-lp.ru/ajax/analytics-graphic.php?dat=${periodNum}`,
      url: `https://liga-pm.ru/ajax/analytics-graphic.php?dat=${periodNum}`,
      type: "post",
      data: { period: e.target.id },
    }).done(function (res) {
      console.log(periodNum);
      console.log(res);
      GraphCross.config.data.datasets[0].data = res.datasetsCross[0];
      GraphCross.config.data.datasets[1].data = res.datasetsCross[1];
      GraphCross.config.data.datasets[2].data = res.datasetsCross[2];
      GraphCross.config.data.datasets[3].data = res.datasetsCross[3];
      GraphCross.config.data.datasets[4].data = res.datasetsCross[4];
      GraphCross.config.data.labels = res.labels;
      GraphCross.update();

      for (let btn of periodArr) {
        btn.classList.remove("active");
      }
      e.target.classList.add("active");
    });
  }
}

$().ready(() => {
  $.ajax({
    // url: `http://liga.asap-lp.ru/ajax/analytics-graphic.php?tag=1&dat=3`,
    url: `https://liga-pm.ru/ajax/analytics-graphic.php?&dat=2`,
    type: "get",
  }).done(function (res) {
    // console.log("1ajax", res);
    createGraphCross(res.labels, res.datasetsCross);
  });
});
// --------------------------------------------------------------------------
