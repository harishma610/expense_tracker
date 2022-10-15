window.onload = function(){
    var category1 = "$220"
    var category2 = "$120"
    var category3 = "$50"
    var category4 = "$20"  
    var daily = "$25" 
    var weekly = "110"
    var monthly = "800"
    document.getElementById("firstcategory").innerHTML=category1;
    document.getElementById("secondcategory").innerHTML=category2;
    document.getElementById("thirdcategory").innerHTML=category3;
    document.getElementById("fourthcategory").innerHTML=category4; 
    document.getElementById("daily").innerHTML=daily; 
    document.getElementById("weekly").innerHTML=weekly; 
    document.getElementById("monthly").innerHTML=monthly; 
    
    new Chart(document.getElementById("barchartexample"), {      
     type: 'bar',      
    data: {
    labels: ["Household", "Food", "Shopping", "Transportation"],
    datasets: [
    {     
    label: "Amount ($)",     
    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9"],     
    data: [120, 50, 200, 30]      
    }      
    ]     
    },      
    options: {      
    legend: { display: false },
    title: {
    display: true,
    // text: 'Predicted world population (millions) in 2050'

    },
    }
    });

    new Chart(document.getElementById("mixed-chart"), {
        type: 'line',
        data: {
        labels: ["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
        label: "Actual",
        type: "line",
        borderColor: "#8e5ea2",
        data: [400,550,600,400,500,800,1000,300,900,700,875,900],
        fill: false,
        tension: 0.1
        }, {
        label: "Forecast",
        type: "line",
        borderColor: "#3e95cd",
        data: [490,570,550,300,400,600,900,600,550],
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
        legend: { display: true }
        }
        });
};