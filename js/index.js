$(document).ready(function () {
    $('.homeTextContainer p b').html("Expense Tracker");
    $('.homeTextContainer p:eq(1)').html("Improve the way you Add, Track, and <b>Forecast</b> your expenses using the <b>Expense Tracker</b>");
});

function homeReadMore() {
    var product_page = "./product.html";
    window.location.href = product_page;
}