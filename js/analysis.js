window.onload = function () {
    var category1 = "$600"
    var category2 = "$70"
    var category3 = "$30"
    var category4 = "$20"
    var daily = "$30"
    var weekly = "$30"
    var monthly = "$730"
    document.getElementById("firstcategory").innerHTML = category1;
    document.getElementById("secondcategory").innerHTML = category2;
    document.getElementById("thirdcategory").innerHTML = category3;
    document.getElementById("fourthcategory").innerHTML = category4;
    document.getElementById("daily").innerHTML = daily;
    document.getElementById("weekly").innerHTML = weekly;
    document.getElementById("monthly").innerHTML = monthly;

    new Chart(document.getElementById("barchartexample"), {
        type: 'bar',
        data: {
            labels: ["Food", "Groceries", "Rent", "Transportation", "Shopping"],
            datasets: [
                {
                    label: "Amount ($)",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],
                    data: [20, 70, 600, 10, 30]
                }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                // text: 'Predicted world population (millions) in 2050'

            },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });

    new Chart(document.getElementById("mixed-chart"), {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Actual",
                type: "line",
                borderColor: "#8e5ea2",
                data: [20, 70, 600, 10, 30],
                fill: false,
                tension: 0.1
            }, {
                label: "Forecast",
                type: "line",
                borderColor: "#3e95cd",
                data: [40, 100, 700, 40, 50, 30, 50, 600, 25],
                fill: false,
                tension: 0.1
            },
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Actual versus Forecast'
            },
            legend: { display: true },
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
};