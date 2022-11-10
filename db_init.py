from db_conn import DBConnection

# Establishing the connection
db_obj = DBConnection()

# Create all the required tables
db_obj.execute_statement('''CREATE TABLE IF NOT EXISTS forecasts (
        id	serial PRIMARY KEY,
        month_year TEXT NOT NULL,
        forecast real NOT NULL);''')
db_obj.execute_statement('''CREATE TABLE IF NOT EXISTS expenses (
        id	serial PRIMARY KEY,
        expense_date DATE NOT NULL,
        category	TEXT NOT NULL,
        amount	REAL NOT NULL);''')
db_obj.execute_statement('''CREATE TABLE IF NOT EXISTS income (
        id	serial PRIMARY KEY,
        income_date DATE DEFAULT CURRENT_DATE,
        amount	REAL NOT NULL);''')

# Load data into the expenses and income tables
db_obj.cur.copy_expert("COPY expenses FROM STDIN DELIMITER ',' CSV HEADER", open('data/expenses.csv', 'r'))
db_obj.cur.copy_expert("COPY expenses FROM STDIN DELIMITER ',' CSV HEADER", open('data/income.csv', 'r'))

# Close connections
db_obj.close_connections()
