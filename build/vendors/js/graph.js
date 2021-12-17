$().ready(() => {
    const ctx = $("#Graph");
    const mobile = $(window).width() < 768;
    const randomDatapoints = (lenghtArr, min, max) => {
        let res = [];

        for (let i = 0; i < lenghtArr; i++) {
            let point = Math.round(min - 0.5 + Math.random() * (max - min + 1));
            res.push(point);
        }

        return res;
    };

    // const datapoints = [0, 20, 60, 120, 180, 125];
    // const labels = ['21.02', '22.02', '23.02', '24.02', '25.02', '26.02',],

    const data = {
        labels: ["21.02", "22.02", "23.02", "24.02", "25.02", "26.02"],
        datasets: [
            {
                data: randomDatapoints(6, 0, 225),
                borderColor: "#00e096",
                fill: false,
                tension: 0.4,
            },
            {
                data: randomDatapoints(6, 0, 225),
                borderColor: "#006fd6",
                fill: false,
                tension: 0.4,
            },
            {
                data: randomDatapoints(6, 0, 225),
                borderColor: "#ff3d71",
                fill: false,
                tension: 0.4,
            },
            {
                data: randomDatapoints(6, 0, 225),
                borderColor: "#9b51e0",
                fill: false,
                tension: 0.4,
            },
            {
                data: randomDatapoints(6, 0, 225),
                borderColor: "#39ad46",
                fill: false,
                tension: 0.4,
            },
            {
                data: randomDatapoints(6, 0, 225),
                borderColor: "#ffc94d",
                fill: false,
                tension: 0.4,
            },
        ],
    };

    if (ctx.length) {
        const Graph = new Chart(ctx, {
            type: "line",
            data: data,
            options: {
                showAllTooltips: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: "point",
                },
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        backgroundColor: "#000",
                        position: "average",
                        callbacks: {
                            title: function (tooltip) {
                                return `${tooltip[0].label}: ${tooltip[0].formattedValue} тыс.руб.`;
                            },
                            label: (tool) => "",
                            body: (tool) => "",
                        },
                    },
                },
                scales: {
                    xAxes: {},
                    yAxes: {
                        display: false,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                },
            },
        });

        if (mobile) {
            Graph.canvas.parentNode.style.height = "100%";
            Graph.canvas.parentNode.style.width = "100%";
            Graph.resize();
        }

        const hiddenGraph = (input, id) => {
            if (input.checked) {
                Graph.getDatasetMeta(id).hidden = false;
                Graph.update();
            } else {
                Graph.getDatasetMeta(id).hidden = true;
                Graph.update();
            }
        };

        $("#input_1").change(function () {
            hiddenGraph(this, 0);
        });
        $("#input_2").change(function () {
            hiddenGraph(this, 1);
        });
        $("#input_3").change(function () {
            hiddenGraph(this, 2);
        });
        $("#input_4").change(function () {
            hiddenGraph(this, 3);
        });
        $("#input_5").change(function () {
            hiddenGraph(this, 4);
        });
        $("#input_6").change(function () {
            hiddenGraph(this, 5);
        });
    }

    console.log(document.getElementById("123"));

    if (document.getElementById("datePicker")) {
        return new Lightpick({
            field: document.getElementById("datePicker"),
            singleDate: false,
            // minDate: moment().startOf("month").add(7, "day"),
            // maxDate: moment().endOf("month").subtract(7, "day"),
            locale: {
                buttons: {
                    prev: ``,
                    next: ``,
                },
            },
            onClose: function () {
                $(".graph__content").text(
                    `${this.getStartDate().format("L")} - ${this.getEndDate().format("L")}`
                );
                console.log(
                    `${this.getStartDate().format("L")} - ${this.getEndDate().format("L")}`
                );
            },
        });
    }
});
