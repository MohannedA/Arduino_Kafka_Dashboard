var makeChart = (chartId, label, color, title, maxValue, backgroundColor) => {
    return new Chart($(chartId), {
        type: 'line',
        labels: [],
        backgroundColor: "#fff",
        data: {
            datasets: [
                {
                    data: [],
                    label: label,
                    borderColor: color,
                    fill: false
                }
            ],
        },
        options: {
            chartArea: {
                backgroundColor: backgroundColor
            },
            title: {
                responsive: true,
                maintainAspectRatio: true,
                display: true,
                text: title
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    }
                }],
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                        // OR //
                        //beginAtZero: true   // minimum value will be 0.
                        max: maxValue,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }
                ]
            }
        }
    });
};