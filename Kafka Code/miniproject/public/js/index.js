document.addEventListener("DOMContentLoaded", function (event) {


    let socket = io();

    socket.on("connect", () => {
        console.log("Connected to the socket");
    });

    // Change canvas background color
    Chart.pluginService.register({
        beforeDraw: function (chart, easing) {
            if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
                var helpers = Chart.helpers;
                var ctx = chart.chart.ctx;
                var chartArea = chart.chartArea;

                ctx.save();
                ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                ctx.restore();
            }
        }
    });


    //chartId, label, color, text
    const temperatureChart = makeChart("#temperatureChart", "", "#F35213", "Temperature", 100, 'rgba(243, 82, 19, 0.2)');
    const humidityChart = makeChart("#humidityChart", "", "#5DBCD2", "Humidity", 100, 'rgba(90, 188, 210, 0.2)');
    const gasChart = makeChart("#gasChart", "", "#FFE500", "Gas", 20, 'rgba(255, 229, 0, 0.2)');
    const soundChart = makeChart("#soundChart", "", "#2C036B", "Sound", 300, 'rgba(44, 3, 107, 0.2)');


    let fillLabels = (chart, message) => {
        let chartData = chart.data.datasets[0].data;
        console.log(message.topic);
        console.log(message.value);
        let labels = chart.data.labels;

        if (chartData.length > 15) {
            for (let i = 0; i < chartData.length - 1; i++) {
                // replace old data with new data
                chartData[i] = chartData[i + 1];
                labels[i] = labels[i + 1];
            }
            //replace the last element with the new elements
            chartData[chartData.length - 1] = message.value;
            labels[labels.length - 1] = moment().format('mm:ss');
        } else {
            console.log(message.value);
            chartData[chartData.length] = message.value;
            labels[labels.length] = moment().format('mm:ss');
        }
        //console.log(JSON.stringify(chartData));
        chart.update();
    };

    socket.on("message", message => {

        //console.log(message);
        // let gas_message;
        if (message.topic === "gas_topic") {
            //gas_message = message.topic;
            document.getElementById("gasValue").innerHTML = message.value;
            fillLabels(gasChart,message);
        } else if (message.topic === "temperature_topic") {
            document.getElementById("temperatureValue").innerHTML = message.value;
            fillLabels(temperatureChart,message);
        } else if (message.topic === "humidity_topic") {
            document.getElementById("humidityValue").innerHTML = message.value;
            fillLabels(humidityChart,message);
        } else if (message.topic === "sound_topic") {
            document.getElementById("soundValue").innerHTML = message.value;
            fillLabels(soundChart,message);
        }
    });



    // Disable - Enable Topics
    let isGasEnabled = true;
    $('#gasButton').click(function() {
        console.log("Gas is Clicked")
        if (isGasEnabled) {
            // Kafka
            socket.emit("gas", {"mode": "disable"});
            // Style
            document.getElementById("gasButton").innerHTML = "Enable";
            $(this).removeClass('btn-default');
            $(this).addClass('btn-success');
            document.getElementById("gasDiv").style.borderColor = "gray";
            document.getElementById("gasImage").style.filter = "grayscale(100%)";
            isGasEnabled = false;
        } else {
            // Kafka
            socket.emit("gas", {"mode": "enable"});
            // Style
            document.getElementById("gasButton").innerHTML = "Disable";
            $(this).removeClass('btn-success');
            $(this).addClass('btn-default');
            document.getElementById("gasDiv").style.borderColor = "#FFE500";
            document.getElementById("gasImage").style.removeProperty("filter");
            isGasEnabled = true;
        }
    });

    let isSoundEnabled = true;
    $('#soundButton').click(function() {
        console.log("Sound is Clicked")
        if (isSoundEnabled) {
            // Kafka
            socket.emit("sound", {"mode": "disable"});
            // Style
            document.getElementById("soundButton").innerHTML = "Enable";
            $(this).removeClass('btn-default');
            $(this).addClass('btn-success');
            document.getElementById("soundDiv").style.borderColor = "gray";
            document.getElementById("soundImage").style.filter = "grayscale(100%)";
            isSoundEnabled = false;
        } else {
            // Kafka
            socket.emit("sound", {"mode": "enable"});
            // Style
            document.getElementById("soundButton").innerHTML = "Disable";
            $(this).removeClass('btn-success');
            $(this).addClass('btn-default');
            document.getElementById("soundDiv").style.borderColor = "#2C036B";
            document.getElementById("soundImage").style.removeProperty("filter");
            isSoundEnabled = true;
        }
    });

    let isTemperatureEnabled = true;
    $('#temperatureButton').click(function() {
        console.log("Temperature is Clicked")
        if (isTemperatureEnabled) {
            // Kafka
            socket.emit("temperature", {"mode": "disable"});
            // Style
            document.getElementById("temperatureButton").innerHTML = "Enable";
            $(this).removeClass('btn-default');
            $(this).addClass('btn-success');
            document.getElementById("temperatureDiv").style.borderColor = "gray";
            document.getElementById("temperatureImage").style.filter = "grayscale(100%)";
            isTemperatureEnabled = false;
        } else {
            // Kafka
            socket.emit("temperature", {"mode": "enable"});
            // Style
            document.getElementById("temperatureButton").innerHTML = "Disable";
            $(this).removeClass('btn-success');
            $(this).addClass('btn-default');
            document.getElementById("temperatureDiv").style.borderColor = "#F35213";
            document.getElementById("temperatureImage").style.removeProperty("filter");
            isTemperatureEnabled = true;
        }
    });

    let isHumidityEnabled = true;
    $('#humidityButton').click(function() {
        console.log("Humidity is Clicked")
        if (isHumidityEnabled) {
            // Kafka
            socket.emit("humidity", {"mode": "disable"});
            // Style
            document.getElementById("humidityButton").innerHTML = "Enable";
            $(this).removeClass('btn-default');
            $(this).addClass('btn-success');
            document.getElementById("humidityDiv").style.borderColor = "gray";
            document.getElementById("humidityImage").style.filter = "grayscale(100%)";
            isHumidityEnabled = false;
        } else {
            // Kafka
            socket.emit("humidity", {"mode": "enable"});
            // Style
            document.getElementById("humidityButton").innerHTML = "Disable";
            $(this).removeClass('btn-success');
            $(this).addClass('btn-default');
            document.getElementById("humidityDiv").style.borderColor = "#5DBCD2";
            document.getElementById("humidityImage").style.removeProperty("filter");
            isHumidityEnabled = true;
        }
    });

});