<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Test</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<%

int postCount = 0;
List<Map<String, Object>> silvers = new ArrayList<>();
Connection conn = null;
String url = "jdbc:mariadb://34.22.104.200:3306/silverlink";
String id = "{ID}";             // 접속을 위한 계정의 ID
String pw = "{PASSWORD}";       // 접속을 위한 계정의 암호
Class.forName("org.mariadb.jdbc.Driver");
conn = DriverManager.getConnection(url, id, pw);

 String countQuery = "SELECT COUNT(numKey) FROM silverlink.silverlinksearch1";
 try (PreparedStatement pstmt = conn.prepareStatement(countQuery);
             ResultSet rs = pstmt.executeQuery()) {
            if (rs.next()) {
                postCount = rs.getInt(1);
            }
        }

 String silverQuery = "SELECT idC, serviceC, numKey FROM silverlink.silverlinkcontent1";
 try (PreparedStatement pstmt = conn.prepareStatement(silverQuery);
        ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                        Map<String, Object> silver = new HashMap<>();
                        silver.put("idC", rs.getString("idC"));
                        silver.put("serviceC", rs.getString("serviceC"));
                        silver.put("numKey", rs.getInt("numKey"));
                        silvers.add(silver);
                        }
                }

%>
 <header class="header">
        <h1>sliverlink</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#">복지혜택 검색</a></li>
            <li><a href="#">커뮤니티 기능</a></li>
            <li><a href="#">맞춤형 추천 받기</a></li>
            <li><a href="#">이벤트</a></li>
            <li><a href="#">고객센터 문의하기</a></li>
            <button id="loginButton">로그인</button>
        </ul>
    </nav>

    <div class="small">
      • 복지혜택 검색 &gt; <span>세분화 검색</span>
  </div>

  <div class="big">
      세분화 검색
  </div>



  <div class="container">
    <div class="row">
      <div class="text">지역</div>
      <div class="select-wrapper ">
        <select name="dropdown1">
          <option value="">시/도</option>
          <option value="1">서울특별시</option>
          <option value="2">멀</option>
          <option value="3">라</option>
        </select>
      </div>
      <div class="select-wrapper ">
        <select name="dropdown2">
          <option value="">구/동</option>
          <option value="1">아</option>
          <option value="2">몰</option>
          <option value="3">랑</option>
        </select>
      </div>
      <div class="text">기관명</div>
      <div class="select-wrapper">
        <select name="dropdown3">
          <option value="">선택하세요</option>
          <option value="1">무슨</option>
          <option value="2">기관명</option>
          <option value="3">??</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="text">키워드</div>

      <div class="select-wrapper">
        <select name="dropdown4">
          <option value="">선택하세요</option>
          <option value="1">아</option>
          <option value="2">몰</option>
          <option value="3">랑</option>
        </select>
      </div>
      <div class="text">온라인신청여부</div>
      <div class="select-wrapper">
        <select name="dropdown7">
          <option value="">선택하세요</option>
          <option value="1">예스</option>
          <option value="2">노우</option>
        </select>
      </div>
    </div>

    <div class="row">
      <div class="text">나이</div>
      <div class="select-wrapper">
        <select name="dropdown8">
          <option value=""></option>
          <option value="1">~20세</option>
          <option value="2">~40세</option>
          <option value="3">~60세</option>
        </select>
      </div>
      <div class="text">성별</div>
      <div class="select-wrapper">
        <select name="dropdown9">
          <option value=""></option>
          <option value="1">남성</option>
          <option value="2">여성</option>
        </select>
      </div>
      <div class="text">기타</div>
      <div class="select-wrapper">
        <select name="dropdown10">
          <option value=""></option>
          <option value="1">기타</option>
          <option value="2">통기타</option>
          <option value="3">비타민</option>
</select>
      </div>
    </div>


    <div class="row"></div><div class="row"></div><div class="row"></div>

    <div class="button-container">
      <button class="search"> 검색 </button>
      <button class="reset">초기화</button>
    </div>

  </div>


  <div class="result">
    총 <%= postCount %>건의 검색결과가 있습니다.
  </div>
  <div class = "form-wrapper" style="display: flex; flex-direction: column; ">
  <form id="silverlinkForm" method="post" action="oold2.jsp">
  <div class="divider"></div>


  <div class="small-box-container" style="
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;">
<%
        for (Map<String, Object> silver : silvers) {
%>

<div class="small-box" style="display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin: 10px;
    padding: 20px;
    background-color: #0077ff11;
    color: rgb(0, 0, 0);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;">
        <p class="small-text"><strong><%= silver.get("idC") %></strong><br><br>
        <%= silver.get("serviceC") %><br><br></p>
  <div class="button-small">
          <button type="button" class="details" data-numKey="<%= silver.get("numKey") %>">자세히</button>
  <button class="application">신청</button>
  </div>
</div>
<%
        }
%>
    </div>
  </form>
  </div>
<script>
          document.querySelectorAll('.details').forEach(button => {
    button.addEventListener('click', () => {
        const numKey = button.getAttribute('data-numKey');
        if (numKey) {
            const form = document.getElementById('silverlinkForm');
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'numKey';
            input.value = numKey;
            form.appendChild(input);
            form.submit();
        } else {
            console.error('numKey가 전달되지 않았습니다.');
        }
    });
});
</script>

</div>
</body>

</html>