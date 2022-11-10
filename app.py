from flask import Flask
from flask import render_template

from utilities import Analysis

app = Flask(__name__)


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
        values=list(all_categories.values())
    )


@app.route("/add_expenses/")
def add_expenses():
    return render_template("add_expenses.html")


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
