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

    def __exit__(self):
        self.db_obj.close_connections()
