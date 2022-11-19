from flask import Flask, jsonify, request
from flask import render_template

from utilities import Analysis, ManageExpense

app = Flask(__name__)


@app.route("/navigation")
def navigation():
    return render_template("navigation.html")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about/")
def about():
    return render_template("about.html")


@app.route("/product/")
def product():
    return render_template("product.html")


@app.route("/analysis/")
def analysis():
    analysis_obj = Analysis()
    expense_by_category = analysis_obj.get_expense_by_category()
    all_categories = {
        category[0]: float(category[1]) for category in expense_by_category
    }
    top_categories = {
        category[0]: float(category[1]) for category in expense_by_category[:5]
    }
    actual = analysis_obj.get_actual_expenses()
    all_actual = {
        f"{each_actual[0]}+{str(each_actual[1])}": float(each_actual[3]) for each_actual in actual
    }

    # month_labels=list(all_actual.keys())
    # months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun']
    # last_month_index=months.index(month_labels[-1][:3])
    # month_labels += months[last_month_index+1:last_month_index+7]
    analysis_data = {
        "today": analysis_obj.get_current_day_expense(),
        "weekly": analysis_obj.get_current_week_expense(),
        "monthly":  analysis_obj.get_current_month_expense(),
        "top_categories": top_categories
    }
    return render_template(
        "analysis.html",
        data=analysis_data,
        labels=list(all_categories.keys()),
        values=list(all_categories.values()),
        actual_labels=list(all_actual.keys()),
        actual_values=list(all_actual.values())
    )


@app.route("/add_expenses/")
def add_expenses():
    expense_obj = ManageExpense()
    expense_data = {
        "category_list": expense_obj.get_distinct_categories()
    }
    return render_template("add_expenses.html", data=expense_data)


@app.route("/get_monthly_expenses/<int:month>/<int:year>/")
def get_monthly_expenses(month, year):
    expense_obj = ManageExpense()
    monthly_expenses = expense_obj.get_monthly_expenses(month=month, year=year)
    return monthly_expenses


@app.route("/get_selected_day_expenses/<int:month>/<int:day>/<int:year>/")
def get_selected_day_expenses(day, month, year):
    expense_obj = ManageExpense()
    selected_day_expenses = expense_obj.get_selected_day_expenses(month=month, day=day, year=year)
    return selected_day_expenses


@app.route("/get_monthly_income/<int:month>/<int:year>/")
def get_monthly_income(month, year):
    expense_obj = ManageExpense()
    monthly_income = expense_obj.get_monthly_income(month=month, year=year)
    return monthly_income


@app.route('/add_income/', methods=['POST'])
def add_income():
    month = request.form['month']
    year = request.form['year']
    income = request.form['income']
    expense_object = ManageExpense()
    expense_object.add_income(month=month, year=year, income=income)
    return "Income added", 200


@app.route('/add_an_expense/', methods=['POST'])
def add_an_expense():
    date = request.form['date']
    category = request.form['category']
    expense = request.form['expense']
    expense_object = ManageExpense()
    expense_object.add_an_expense(date=date, category=category, expense=expense)
    return "Expense added", 200


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
