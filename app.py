from flask import Flask, render_template, request
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'sin87531'
app.config['MYSQL_DB'] = 'mydb'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('Segmentation_search.html')

@app.route('/search', methods=['POST'])
def search():
    region = request.form.get('State')
    institution = request.form.get('Organization')
    keyword = request.form.get('contents')
    online = request.form.get('online')
    age = request.form.get('age')
    gender = request.form.get('gender')
    other = request.form.get('other')

    query = "SELECT * FROM silverlinksearch WHERE 1=1"
    params = []

    if region:
        query += " AND regionS = %s"
        params.append(region)
    if institution:
        query += " AND pulnstitutionS LIKE %s"
        params.append('%' + institution + '%')
    if keyword:
        query += " AND serviceKeyS LIKE %s"
        params.append('%' + keyword + '%')
    if online:
        query += " AND onlineTFS = %s"
        params.append(online)
    if age:
        query += " AND ageS = %s"
        params.append(age)
    if gender:
        query += " AND genderS = %s"
        params.append(gender)
    if other:
        query += " AND otherS = %s"
        params.append(other)

    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute(query, tuple(params))
    data = cursor.fetchall()
    cursor.close()

    return render_template('results.html', data=data)

if __name__ == "__main__":
    app.run(debug=True)
