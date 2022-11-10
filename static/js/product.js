$(document).ready(function () {
    $('#feature1Heading').html("Manage Income & Expenses");
    $('#feature1Desc').html("Stop utilizing excel spreadsheets and paper to keep track of your costs. The Expense Tracker provides a digital solution to this problem. It allows you to add and manage all your expenses and income in a single dashboard.");

    $('#feature2Heading').html("Expense Forecasts");
    $('#feature2Desc').html("Gain an insight into how your expenses would be for the future months, so you can predict your expenses and manage your cash flow with ease and plan your finances ahead.");

    $('#feature3Heading').html("Expense Analysis");
    $('#feature3Desc').html("Obtain Real-time visibility to your expenses using the Expense Analysis Feature. Gain useful insights and get a better understanding of where and how you spend your money from the charts that are generated.");
});

function viewManageExpense() {
    var expense_page = "/add_expenses";
    window.location.href = expense_page;
}

function viewAnalysis() {
    var analysis_page = "/analysis";
    window.location.href = analysis_page;
}
