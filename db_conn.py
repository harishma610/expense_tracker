import psycopg2


class DBConnection:
    
    def __init__(
            self, host="localhost", database="ExpenseTracker", user="postgres", password="password"
    ):
        self.conn = psycopg2.connect(
            host=host,
            database=database,
            user=user,
            password=password
        )
        self.cur = self.conn.cursor()

    def execute_statement(self, statement, **kwargs: None):

        if not kwargs:
            self.cur.execute(statement)
        data = self.cur.fetchall()
        return data

    def close_connections(self):
        self.cur.close()
        self.conn.close()
