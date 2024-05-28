import psycopg2

def get_conn():
    conn = None
    try:
        conn = psycopg2.connect(
            user="postgres",
            password="postgres",
            host="localhost",
            port="5432",
            database="cvscorepro"
        )
        return conn
        
    except Exception as err:
        print(err)