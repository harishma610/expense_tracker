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
                var currMonth = month;
                incomeExpense(currMonth);
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

    function summaryInfo(year, month) {
        console.log('addCustomInformation called')
        setTimeout(function () {
            self.dayrates = {};
            const d = new Date();
            currMonth = d.getMonth();
            currYear = d.getFullYear();

            console.log(year, currYear, month - 1, currMonth);
            if (isNaN(month) || month - 1 <= currMonth && year <= currYear) {
                self.dayrates = { 1: '590', 15: '10', 22: '30' };
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

    function incomeExpense(currMonth) {
        var monthname = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        if (currMonth == null) {
            const d = new Date();
            currMonth = d.getMonth();
            self.selectedMonth = monthname[currMonth];
        }
        else {
            self.selectedMonth = monthname[currMonth - 1];
        }

        self.monthIncome = { October: '1800' };
        var incomeExists = self.selectedMonth in self.monthIncome
        console.log('income exists', incomeExists)

        $("#incTable tbody > tr").remove();
        var incomeTable = document.getElementById('incTable')
        var incomeTableBody = incomeTable.getElementsByTagName('tbody')[0];

        if (incomeExists) {
            var row = incomeTableBody.insertRow()
            var cell = row.insertCell()
            cell.innerHTML = self.selectedMonth
            var cell1 = row.insertCell()
            cell1.innerHTML = self.monthIncome[self.selectedMonth]
        }
        else {
            var row = incomeTableBody.insertRow()
            var cell = row.insertCell()
            $(cell).attr("colspan", 2);
            cell.innerHTML = "No Income to Display on the current month"
        }
        console.log('selected month value', self.selectedMonth)
    }

    function onDateSelect() {
        self.selectedDate = $(this).val();
        enableExpenseButton();
        var selectedDay = $(this).datepicker('getDate').getDate();
        var selectedMonth = $(this).datepicker('getDate').getMonth();
        var selectedYear = $(this).datepicker('getDate').getFullYear();
        summaryInfo(selectedYear, selectedMonth + 1)

        var exists = selectedDay in self.dayrates

        $("#expTable tbody > tr").remove();
        var expenseTable = document.getElementById('expTable')
        var expenseTableBody = expenseTable.getElementsByTagName('tbody')[0];


        if (exists) {
            var expense_array = { 1: { "Food": 20, "Groceries": 70, "Rent": 500 }, 15: { "Transportation": 10 }, 22: { "Shopping": 30 } };

            for (var i = 0; i < Object.keys(expense_array[selectedDay]).length; i++) {
                var row = expenseTableBody.insertRow()
                var cell = row.insertCell()
                cell.innerHTML = self.selectedDate
                var cell1 = row.insertCell()
                cell1.innerHTML = Object.keys(expense_array[selectedDay])[i]
                var cell2 = row.insertCell()
                cell2.innerHTML = Object.values(expense_array[selectedDay])[i]
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
    $('#expensePopupDate').html(self.selectedDate);
    $('.fieldsContainer div:lt(2)').css("display", "block");
    $('.fieldsContainer div:eq(2)').css("display", "none");
    $("#popupTitle").html("Add Expense");
}

function addIncomeShow() {
    $('#popupContainer').css("display", "block");
    $('.fieldsContainer div:eq(2)').css("display", "block");
    $('.fieldsContainer div:lt(2)').css("display", "none");
    $("#popupTitle").html("Add Income");
    $("#incomeMonthLabel").html(self.selectedMonth);
}

function addExpense() {
    // AddExpenseService integration in future
    $('#popupContainer').css("display", "none");
}

function popupClose() {
    $('#popupContainer').css("display", "none");
}
