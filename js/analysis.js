window.onload = function () {
    var category1 = "$500"
    var category2 = "$70"
    var category3 = "$30"
    var category4 = "$20"
    var daily = "$30"
    var weekly = "$30"
    var monthly = "$630"
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
                    data: [20, 70, 500, 10, 30]
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
            labels: ["Jan-22", "Feb-22", "Mar-22", "Apr-22", "May-22", "Jun-22", "Jul-22", "Aug-22", "Sep-22", "Oct-22", "Nov-22", "Dec-22", "Jan-23", "Feb-23", "Mar-23"],
            datasets: [{
                label: "Actual",
                type: "line",
                borderColor: "#8e5ea2",
                data: [800, 700, 900, 600, 1200, 1500, 650, 500, 650, 630],
                fill: false,
                tension: 0.1
            }, {
                label: "Forecast",
                type: "line",
                borderColor: "#3e95cd",
                data: [500, 600, 1100, 700, 800, 1400, 850, 400, 560, 530, 700, 730, 800, 650, 500],
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