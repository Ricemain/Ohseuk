from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'sin87531'
app.config['MYSQL_DB'] = 'silverlink'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    search_query = data.get('query')
    
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

    query = "SELECT * FROM silverlinkcontent WHERE idC LIKE %s"
    params = ('%' + search_query + '%',)
    cursor.execute(query, params)

    results = cursor.fetchall()
    cursor.close()

    return jsonify({'results': results})

if __name__ == "__main__":
    app.run(debug=True)
