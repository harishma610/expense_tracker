$(document).ready(function () {

    $(function () {
        $(".datepicker").datepicker({
            // beforeShow: summaryInfo,
            beforeShowDay: function (date) {
                return [true, date.getDay() === 0 || date.getDay() === 6 ? "weekend" : "weekday"];
            },
            onChangeMonthYear: function (year, month) {
                summaryInfo()
                refreshExpenseTable()
                var currMonth = month
                incomeExpense(currMonth)
            },
            onSelect: onDateSelect
        });
        summaryInfo();
        incomeExpense();
        refreshExpenseTable();
    });

    function summaryInfo() {
        console.log('addCustomInformation called')
        setTimeout(function () {
            self.dayrates = { 1: '590', 15: '10', 22: '30' };
            const d = new Date();

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
        }, 50)

    }

    function refreshExpenseTable() {
        $("#expTable tbody > tr").remove();
        var expenseTable = document.getElementById('expTable')
        var expenseTableBody = expenseTable.getElementsByTagName('tbody')[0];
        var row = expenseTableBody.insertRow()
        var cell = row.insertCell()
        $(cell).attr("colspan", 3);
        cell.innerHTML = "Select a date to view expenses"
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
        var selectedDate = $(this).val();
        var selectedDay = $(this).datepicker('getDate').getDate();
        summaryInfo(null)

        var exists = selectedDay in self.dayrates

        $("#expTable tbody > tr").remove();
        var expenseTable = document.getElementById('expTable')
        var expenseTableBody = expenseTable.getElementsByTagName('tbody')[0];


        if (exists) {
            if (selectedDay == 1) {
                var row = expenseTableBody.insertRow()
                var cell = row.insertCell()
                cell.innerHTML = selectedDate
                var cell1 = row.insertCell()
                cell1.innerHTML = "Food"
                var cell2 = row.insertCell()
                cell2.innerHTML = "20"

                var row1 = expenseTableBody.insertRow()
                var cell = row1.insertCell()
                cell.innerHTML = selectedDate
                var cell1 = row1.insertCell()
                cell1.innerHTML = "Groceries"
                var cell2 = row1.insertCell()
                cell2.innerHTML = "70"

                var row2 = expenseTableBody.insertRow()
                var cell = row2.insertCell()
                cell.innerHTML = selectedDate
                var cell1 = row2.insertCell()
                cell1.innerHTML = "Rent"
                var cell2 = row2.insertCell()
                cell2.innerHTML = "500"
            }

            else if (selectedDay == 15) {
                var row = expenseTableBody.insertRow()
                var cell = row.insertCell()
                cell.innerHTML = selectedDate
                var cell1 = row.insertCell()
                cell1.innerHTML = "Transportation"
                var cell2 = row.insertCell()
                cell2.innerHTML = "10"
            }

            else {
                var row = expenseTableBody.insertRow()
                var cell = row.insertCell()
                cell.innerHTML = selectedDate
                var cell1 = row.insertCell()
                cell1.innerHTML = "Shopping"
                var cell2 = row.insertCell()
                cell2.innerHTML = "30"
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

function popupClose() {
    $('#popupContainer').css("display", "none");
}