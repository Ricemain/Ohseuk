from flask import Flask, render_template, request
from flaskext.mysql import MySQL

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'sin87531'
app.config['MYSQL_DATABASE_DB'] = 'mydatabase'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'

mysql = MySQL()
mysql.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    name = request.form['name']
    cursor = mysql.connect().cursor()
    query = "SELECT * FROM users WHERE name LIKE %s"
    cursor.execute(query, ('%' + name + '%',))
    data = cursor.fetchall()
    return render_template('results.html', data=data)

if __name__ == "__main__":
    app.run(debug=True)
