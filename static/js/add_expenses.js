$(document).ready(function () {

    $(function () {
        $(".datepicker").datepicker({
            // beforeShow: summaryInfo,
            beforeShowDay: function (date) {
                return [true, date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "weekday"];
            },
            onChangeMonthYear: function (year, month) {
                self.selectedDate = '';
                disableExpenseButton();
                summaryInfo(year, month);
                refreshExpenseTable();
                incomeExpense(month, year);
            },
            onSelect: onDateSelect
        });
        self.selectedDate = '';
        disableExpenseButton();
        summaryInfo();
        incomeExpense();
        refreshExpenseTable();
    });

    function disableExpenseButton() {
        $('.expenseBtn button').prop('disabled', true);
        $('.expenseBtn button').addClass('disabledBtn');
    }

    function enableExpenseButton() {
        $('.expenseBtn button').prop('disabled', false);
        $('.expenseBtn button').removeClass('disabledBtn');
    }

    function httpGet(url) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function summaryInfo(year, month) {
        setTimeout(function () {
            self.dayrates = {};
            const d = new Date();
            currMonth = d.getMonth();
            currYear = d.getFullYear();

            if (month === undefined || month === null) {
                cmonth = currMonth + 1
                cyear = currYear
            }
            else {
                cmonth = month
                cyear = year
            }

            const url = "http://localhost:8000/get_monthly_expenses/" + cmonth + "/" + cyear + "/"

            if (isNaN(month) || month - 1 <= currMonth && year <= currYear) {
                self.dayrates = JSON.parse(httpGet(url));
            }

            $('.ui-datepicker-calendar td > ').each(function (idx) {
                var value = self.dayrates[idx + 1] || 0;
                if (value != 0) {
                    $(this).addClass('expenseValue')
                    $(this).attr('data-custom', value)
                }
                else {
                    $(this).addClass('noExpenseValue')
                }
            });
        }, 5)

    }

    function refreshExpenseTable() {
        $("#expTable tbody > tr").remove();
        var expenseTable = document.getElementById('expTable')
        var expenseTableBody = expenseTable.getElementsByTagName('tbody')[0];
        var row = expenseTableBody.insertRow()
        var cell = row.insertCell()
        $(cell).attr("colspan", 3);
        cell.innerHTML = "Select a date to add/view expenses"
    }

    function incomeExpense(month, year) {
        var monthname = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        if (month == null) {
            const d = new Date();
            month = d.getMonth() + 1;
            year = d.getFullYear();
            self.selectedMonth = monthname[month - 1];
        }
        else {
            self.selectedMonth = monthname[month - 1];
        }

        const url = "http://localhost:8000/get_monthly_income/" + month + "/" + year + "/"
        self.monthlyIncome = JSON.parse(httpGet(url));

        var incomeExists = self.selectedMonth in self.monthlyIncome

        $("#incTable tbody > tr").remove();
        var incomeTable = document.getElementById('incTable')
        var incomeTableBody = incomeTable.getElementsByTagName('tbody')[0];

        if (incomeExists) {
            var row = incomeTableBody.insertRow()
            var cell = row.insertCell()
            cell.innerHTML = self.selectedMonth
            var cell1 = row.insertCell()
            cell1.innerHTML = self.monthlyIncome[self.selectedMonth]
        }
        else {
            var row = incomeTableBody.insertRow()
            var cell = row.insertCell()
            $(cell).attr("colspan", 2);
            cell.innerHTML = "No Income to Display on the current month"
        }
    }

    function onDateSelect() {
        self.selectedDate = $(this).val();
        enableExpenseButton();
        var selectedDay = $(this).datepicker('getDate').getDate();
        var selectedMonth = $(this).datepicker('getDate').getMonth() + 1;
        var selectedYear = $(this).datepicker('getDate').getFullYear();
        summaryInfo(selectedYear, selectedMonth)

        var exists = selectedDay in self.dayrates

        $("#expTable tbody > tr").remove();
        var expenseTable = document.getElementById('expTable')
        var expenseTableBody = expenseTable.getElementsByTagName('tbody')[0];


        if (exists) {
            const url = "http://localhost:8000/get_selected_day_expenses/" + selectedMonth + "/" + selectedDay + "/" + selectedYear + "/"
            var expense_array = JSON.parse(httpGet(url));

            for (var i = 0; i < Object.keys(expense_array).length; i++) {
                var row = expenseTableBody.insertRow()
                var cell = row.insertCell()
                cell.innerHTML = self.selectedDate
                var cell1 = row.insertCell()
                cell1.innerHTML = Object.keys(expense_array)[i]
                var cell2 = row.insertCell()
                cell2.innerHTML = Object.values(expense_array)[i]
            }
        }
        else {
            var row = expenseTableBody.insertRow()
            var cell = row.insertCell()
            $(cell).attr("colspan", 3);
            cell.innerHTML = "No Expenses to Display"
        }
    }

});


function addExpenseShow() {
    $('#popupContainer').css("display", "block");
    $('#expenseAmount').val('');
    $('#expensePopupDate').html(self.selectedDate);
    $('.fieldsContainer div:lt(2)').css("display", "block");
    $('.fieldsContainer div:eq(2)').css("display", "none");
    $('#expenseSubmitBtn').css("display", "flex");
    $('#incomeSubmitBtn').css("display", "none");
    $("#popupTitle").html("Add Expense");
}

function addIncomeShow() {
    $('#popupContainer').css("display", "block");
    $('#expenseAmount').val('');
    $('.fieldsContainer div:eq(2)').css("display", "block");
    $('.fieldsContainer div:lt(2)').css("display", "none");
    $('#incomeSubmitBtn').css("display", "flex");
    $('#expenseSubmitBtn').css("display", "none");
    $("#popupTitle").html("Add Income");
    $("#incomeMonthLabel").html(self.selectedMonth);
}

function addExpense() {
    var expenseDate = $("#expensePopupDate").text()
    var expenseCategory = $('#expenseCategoryName').find(":selected").val();
    var expenseAmount = $("#expenseAmount").val()
    if (expenseAmount) {
        $.ajax({
            url: 'http://localhost:8000/add_an_expense/',
            type: 'POST',
            data: {
                date: expenseDate,
                category: expenseCategory,
                expense: expenseAmount
            },
            success: function (response) {
                alert("Expense added successfully")
                location.reload(true)
            },
            error: function (response) {
                alert("Not OK...")
            }
        });
        $('#popupContainer').css("display", "none");
    }
    else {
        alert("Enter a valid amount")
    }
}

function addIncome() {
    var incomeMonth = $("#incomeMonthLabel").text()
    var incomeAmount = $("#expenseAmount").val()
    var incomeYear = $(".ui-datepicker-year").text()
    if (incomeAmount) {
        $.ajax({
            url: 'http://localhost:8000/add_income/',
            type: 'POST',
            data: {
                month: incomeMonth,
                year: incomeYear,
                income: incomeAmount
            },
            success: function (response) {
                alert("Income added successfully")
                location.reload(true)
            },
            error: function (response) {
                alert("Not OK...")
            }
        });
        $('#popupContainer').css("display", "none");
    }
    else {
        alert("Enter a valid amount")
    }

}

function popupClose() {
    $('#popupContainer').css("display", "none");
}
