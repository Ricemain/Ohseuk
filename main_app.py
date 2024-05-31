#메인 검색
from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

# MySQL 데이터베이스 연결 설정
db_config = {
    'user': 'root',
    'password': 'sin87531',
    'host': 'localhost',
    'database': 'silverlink'
}

# 메인 페이지 렌더링
@app.route('/')
def index():
    return render_template('main.html')

# 검색 요청 처리
@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    search_query = data.get('query')
    
    # MySQL 연결
    cnx = mysql.connector.connect(**db_config)
    cursor = cnx.cursor()

    # 검색 쿼리 실행
    query = "SELECT * FROM silverlinkcontent WHERE idC LIKE %s"
    cursor.execute(query, ('%' + search_query + '%',))

    # 검색 결과 가져오기
    results = cursor.fetchall()

    # 연결 종료
    cursor.close()
    cnx.close()

    # 결과를 JSON으로 반환
    return
