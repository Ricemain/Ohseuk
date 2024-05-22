from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'sin87531'
app.config['MYSQL_DB'] = 'mydatabase'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    name = request.form['name']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    if name:
        query = "SELECT * FROM users WHERE name LIKE %s"
        cursor.execute(query, ('%' + name + '%',))
    else:
        query = "SELECT * FROM users"
        cursor.execute(query)

    data = cursor.fetchall()
    cursor.close()
    return render_template('results.html', data=data)

if __name__ == "__main__":
    app.run(debug=True)
