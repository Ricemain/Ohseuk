from flask import Flask, render_template, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__, template_folder='html')

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'sin87531'
app.config['MYSQL_DB'] = 'mydatabase'
app.config['MYSQL_HOST'] = 'localhost'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('Segmentation_search.html')

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    region = data.get('region')
    district = data.get('district')
    organization = data.get('organization')
    keyword = data.get('keyword')
    online = data.get('online')
    age = data.get('age')
    gender = data.get('gender')
    other = data.get('other')

    query = "SELECT idS FROM silverlinksearch WHERE 1=1"
    params = []

    if region:
        query += " AND regionS = %s"
        params.append(region)
    if district:
        query += " AND districtS = %s"
        params.append(district)
    if organization:
        query += " AND puInstitutionS LIKE %s"
        params.append('%' + organization + '%')
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
    result = cursor.fetchall()
    cursor.close()

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)
