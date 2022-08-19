// function scrollToElement() {
//   let top = document.getElementById("anchor").getBoundingClientRect().top - 40;
//   window.scrollTo(0, top);
//   console.log(top);
// }

// список чекбоксов
const checkboxContent = new Map();
checkboxContent
  .set(1, [])
  .set(2, ["Гофрокартон товарный бурый Т-23", "Гофроящик 4-х клапанный бурый Т23", "Крахмал"])
  .set(3, [
    "Тестлайнер К1 140-150 г/м2",
    "Топ-лайнер (белёный) К1 140-150 г/м2",
    "Крафтлайнер К1 140-150 г/м2",
    "Флютинг целлюлозный Б1 110-112г/м2",
    "Флютинг макулатурный Б1 110-112г/м2",
  ]);

// функция для создания чекбоксов
function createCheckboxes(tag, checkboxListen) {
  const checkboxesContainer = document.querySelector(".product__checkboxes");
  checkboxesContainer.textContent = "";

  const checkboxContentCase = checkboxContent.get(Number(tag));
  checkboxContentCase.forEach((item, ind) => {
    checkboxesContainer.innerHTML += `<label class="checkbox__wrapper" for="checkbox__${ind + 1}">
    <input
      class="checkbox__input checkbox__input__${ind + 1}"
      type="checkbox"
      id="checkbox__${ind + 1}"
      checked
    />
    <span class="checkbox__fake">
      <svg
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 3.5L5 8L11 1"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span class="checkbox__text" id="checkbox__text__${ind + 1}">${item}</span>
  </label>`;
  });

  checkboxListen();
}

// функция чекбоксы переключения
const hiddenGraph = (input, id, GraphIndex) => {
  if (input.checked) {
    GraphIndex.getDatasetMeta(id).hidden = false;
    GraphIndex.update();
  } else {
    GraphIndex.getDatasetMeta(id).hidden = true;
    GraphIndex.update();
  }
};

// функция чекбоксы проверка на градиент
function checkGradient(gradients, GraphIndex) {
  const chartLinesArray = GraphIndex.config._config.data.datasets;

  const idArr = chartLinesArray.map((item, index) => {
    return { id: `#checkbox__${index + 1}`, ind: index, gradient: gradients[index] };
  });
  const checkedCount = [];

  idArr.forEach((item) => {
    const checkboxItem = document.querySelector(item.id);
    checkboxItem && checkboxItem.checked && checkedCount.push(item);
  });

  if (checkedCount.length === 1) {
    const { ind, gradient } = checkedCount[0];

    GraphIndex.data.datasets[ind].fill = true;
    GraphIndex.data.datasets[ind].backgroundColor = gradient;
    GraphIndex.update();
  } else if (checkedCount.length === 0) {
    GraphIndex.data.datasets[0].fill = true;
    GraphIndex.data.datasets[0].backgroundColor = gradients[0];
    GraphIndex.update();
  } else {
    idArr.forEach((item) => {
      GraphIndex.data.datasets[item.ind].fill = false;
    });
    GraphIndex.update();
  }
}

//функция  табы преключение ПРОДУКТА
function toggleProductType(
  e,
  GraphIndex,
  createCheckboxes,
  productTypeArr,
  checkboxListen,
  gradients
) {
  const productNum = e.target.getAttribute("data-product");
  const periodNum = $('input[name="period__radio"]:checked').val();
  checkboxListen();

  $.ajax({
    // url: `http://liga.asap-lp.ru/ajax/analytics-graphic.php?tag=${productNum}&dat=${periodNum}`,
    url: `https://liga-pm.ru/ajax/analytics-graphic.php?tag=${productNum}&dat=${periodNum}`,
    type: "get",
  }).done(function (res) {
    // console.log("ajax", res);

    // зануляем старые линии графика
    GraphIndex.config.data.datasets.forEach((item, ind) => {
      item.data = [];
    });

    res.dataset.forEach((item, ind) => {
      if (item) {
        GraphIndex.config.data.datasets[ind].data = res.dataset[ind];
      }
    });

    // воссатанавливаем скрытые чекбоксы после обновления
    GraphIndex.getDatasetMeta(0).hidden = false;
    GraphIndex.getDatasetMeta(1).hidden = false;
    GraphIndex.getDatasetMeta(2).hidden = false;
    GraphIndex.getDatasetMeta(3).hidden = false;
    GraphIndex.getDatasetMeta(4).hidden = false;

    GraphIndex.config.data.labels = res.labels;
    GraphIndex.update();
    createCheckboxes(productNum, checkboxListen);
    checkGradient(gradients, GraphIndex);
  });

  for (let btn of productTypeArr) {
    btn.classList.remove("active");
  }
  e.target.classList.add("active");
}

// функция radio преключение ПЕРИОДА
function togglePeriodType(e, GraphIndex) {
  const productNum = document.querySelector(".product-tab.active").getAttribute("data-product");
  const periodNum = e.target.value;

  $.ajax({
    // url: `http://liga.asap-lp.ru/ajax/analytics-graphic.php?tag=${productNum}&&dat=${periodNum}#st`,
    url: `https://liga-pm.ru/ajax/analytics-graphic.php?tag=${productNum}&dat=${periodNum}`,
    type: "get",
  }).done(function (res) {
    res.dataset.forEach((item, ind) => {
      if (item) {
        GraphIndex.config.data.datasets[ind].data = res.dataset[ind];
      }
    });

    GraphIndex.config.data.labels = res.labels;
    GraphIndex.update();
  });
}

// функция создания массива градиентов
function createGradient(ctx) {
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

  // gradient 4
  const gradient4 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient4.addColorStop(0, "rgba(57, 198, 85, 0.5)");
  gradient4.addColorStop(1, "rgba(57, 198, 85, 0)");

  // gradient 5
  const gradient5 = ctx.createLinearGradient(0, 0, 0, 400);
  gradient5.addColorStop(0, "rgba(253, 123, 30, 0.5)");
  gradient5.addColorStop(1, "rgba(253, 123, 30, 0)");

  const gradients = [gradient1, gradient2, gradient3, gradient4, gradient5];

  return gradients;
}

// ------------------график для ГЛАВНОЙ страницы price-index ------------------------------
function createGraphIndex(arrLabels, arrData) {
  const ctx = document.getElementById("myChart").getContext("2d");

  const gradients = createGradient(ctx);

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
      {
        data: arrData[3],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#39c655",
        borderColor: "#39c655",
        pointBackgroundColor: "#fff",
        tension: 0.4,
      },
      {
        data: arrData[4],
        radius: 6,
        hoverRadius: 10,
        pointBorderWidth: 2,
        pointBorderColor: "#fd7b1e",
        borderColor: "#fd7b1e",
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
              return value / 1000 + " K \u00A0\u00A0\u00A0\u00A0";
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
  checkGradient(gradients, GraphIndex);

  // чекбоксы навешивание слушателей
  function checkboxListen() {
    $("#checkbox__1").change(function () {
      hiddenGraph(this, 0, GraphIndex);
      checkGradient(gradients, GraphIndex);
    });
    $("#checkbox__2").change(function () {
      hiddenGraph(this, 1, GraphIndex);
      checkGradient(gradients, GraphIndex);
    });
    $("#checkbox__3").change(function () {
      hiddenGraph(this, 2, GraphIndex);
      checkGradient(gradients, GraphIndex);
    });
    $("#checkbox__4").change(function () {
      hiddenGraph(this, 3, GraphIndex);
      checkGradient(gradients, GraphIndex);
    });
    $("#checkbox__5").change(function () {
      hiddenGraph(this, 4, GraphIndex);
      checkGradient(gradients, GraphIndex);
    });
  }
  checkboxListen();

  // табы для графика навешивание слушателей
  function productAndPeriodLister() {
    const productTypeArr = document.querySelectorAll(".product-tab");
    const periodButtons = document.getElementsByName("period__radio");

    for (let btn of periodButtons) {
      btn.addEventListener("click", (e) => togglePeriodType(e, GraphIndex));
    }

    for (let btn of productTypeArr) {
      btn.addEventListener("click", (e) =>
        toggleProductType(
          e,
          GraphIndex,
          createCheckboxes,
          productTypeArr,
          checkboxListen,
          gradients
        )
      );
    }
  }
  productAndPeriodLister();
}
// ------------------------------------------------------------------------------------

// запуск основной функции createGraphIndex (получение первоначальных данных)
$().ready(() => {
  $.ajax({
    // url: `http://liga.asap-lp.ru/ajax/analytics-graphic.php?tag=1&dat=3`,
    url: `https://liga-pm.ru/ajax/analytics-graphic.php?tag=1&dat=3`,
    type: "get",
  }).done(function (res) {
    // console.log("1ajax", res);
    createGraphIndex(res.labels, res.dataset);
  });
});
