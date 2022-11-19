import datetime

from db_conn import DBConnection


class Analysis:
    def __init__(self):
        self.db_obj = DBConnection()

    def get_current_day_expense(self):
        current_day_expense = self.db_obj.execute_statement(
            'SELECT SUM(amount) as current_day_expense '
            'FROM expenses '
            'where expense_date = current_date;'
        )
        return float(current_day_expense[-1][0]) if current_day_expense[-1][0] else 0

    def get_current_week_expense(self):
        current_week_expense = self.db_obj.execute_statement(
            '''select round((sum(amount) 
            filter (where date_trunc('week', expense_date) = date_trunc('week', now())))::decimal , 2) weekly_expense 
            from expenses'''
        )
        return float(current_week_expense[-1][0]) if current_week_expense[-1][0] else 0

    def get_current_month_expense(self):
        current_month_expense = self.db_obj.execute_statement(
            '''select round((sum(amount) 
            filter (where date_trunc('month', expense_date) = date_trunc('month', now())))::decimal , 2) monthly_expense 
            from expenses'''
        )
        return float(current_month_expense[-1][0]) if current_month_expense[-1][0] else 0

    def get_expense_by_category(self):
        expense_by_category = self.db_obj.execute_statement('''SELECT category, round(SUM(amount)::decimal, 2) as amount 
            FROM expenses 
            where date_trunc('month', expense_date) = date_trunc('month', current_date) 
            group by category order by 2 desc limit 5;''')
        return expense_by_category

    def get_actual_expenses(self):
        actual_expenses = self.db_obj.execute_statement('''select trim(trailing from 
        to_char(expense_date, 'Mon')) as month, extract(year from expense_date), 
        extract(month from expense_date),
        round(SUM(amount)::decimal, 2) as amount 
        from expenses 
        group by 1,2,3 
        order by 3''')
        return actual_expenses

    def __exit__(self):
        self.db_obj.close_connections()


class ManageExpense:
    def __init__(self):
        self.db_obj = DBConnection()

    def get_distinct_categories(self):
        categories = self.db_obj.execute_statement(
            'SELECT DISTINCT(category) as categories '
            'FROM expenses;'
        )
        categories = [value[0] for value in categories]
        return categories

    def get_monthly_expenses(self, month, year):
        monthly_expenses = self.db_obj.execute_statement(
            'select extract(day from expense_date) as day, round(SUM(amount)::decimal, 1) as amount from expenses e '
            f'where extract(month from expense_date) = {month} and extract(year from expense_date) = {year} ' 
            'group by 1;'
        )
        monthly_expenses = {int(expenses[0]): float(expenses[1]) for expenses in monthly_expenses}
        return monthly_expenses

    def get_selected_day_expenses(self, month, day, year):
        selected_day_expenses = self.db_obj.execute_statement(
            f'''select category, round(SUM(amount)::decimal, 2) 
            from expenses where expense_date = '{str(month)}/{str(day)}/{str(year)}' 
            group by 1'''
        )
        selected_day_expenses = {day_expense[0]: day_expense[1] for day_expense in selected_day_expenses}
        return selected_day_expenses

    def get_monthly_income(self, month, year):
        monthly_income = self.db_obj.execute_statement(
            f'''select trim(trailing from to_char(income_date, 'Month')) as month, 
            round(SUM(amount)::decimal, 2) as amount 
            from income i where extract(month from income_date) = {month} and extract(year from income_date) = {year} 
            group by 1;'''
        )
        monthly_income = {income[0]: income[1] for income in monthly_income}
        return monthly_income

    def __exit__(self):
        self.db_obj.close_connections()
