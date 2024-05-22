<?php
// 데이터베이스 연결 설정
$servername = "localhost"; // 호스트명
$username = "root"; // 데이터베이스 사용자명
$password = "sin87531"; // 데이터베이스 암호
$dbname = "mydb"; // 사용할 데이터베이스 이름

try {
    // PDO 객체 생성 및 데이터베이스 연결
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);

    // PDO 객체가 예외를 던지도록 설정
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // POST로 전달된 데이터 받기
    $region = $_POST['selectedRegion'];
    $subRegion = $_POST['selected_rnehd'];
    $agency = $_POST['selectedAgencyname'];
    $keyword = $_POST['selectedKeyword'];
    $onlineApplication = $_POST['selectedYesno'];
    $age = $_POST['selectedAge'];
    $gender = $_POST['selectedSex'];
    $other = $_POST['selectedGuitar'];

    // SQL 쿼리 작성
    $sql = "SELECT * FROM silverlinksearch";

    // PDO Statement 객체 생성
    $stmt = $conn->prepare($sql);

    // 바인딩
    $stmt->bindParam(':region', $region);
    $stmt->bindParam(':sub_region', $subRegion);
    $stmt->bindParam(':agency', $agency);
    $stmt->bindParam(':keyword', $keyword);
    $stmt->bindParam(':online_application', $onlineApplication);
    $stmt->bindParam(':age', $age);
    $stmt->bindParam(':gender', $gender);
    $stmt->bindParam(':other', $other);

    // SQL 쿼리 실행
    $stmt->execute();

    // 결과 출력
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) > 0) {
        foreach ($result as $row) {
            echo "<p>지역: " . $row['region'] . "</p>";
            echo "<p>구/동: " . $row['sub_region'] . "</p>";
            echo "<p>기관명: " . $row['agency'] . "</p>";
            echo "<p>키워드: " . $row['keyword'] . "</p>";
            echo "<p>온라인신청여부: " . $row['online_application'] . "</p>";
            echo "<p>나이: " . $row['age'] . "</p>";
            echo "<p>성별: " . $row['gender'] . "</p>";
            echo "<p>기타: " . $row['other'] . "</p>";
            echo "<hr>";
        }
    } else {
        echo "검색 결과가 없습니다.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

// 연결 종료
$conn = null;
?>