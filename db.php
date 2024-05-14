<?php
$host = "localhost";
$user = "root";
$pw = "1234";
$dbName = "test_list";

$con = new mysqli($host, $user, $pw, $dbName);

$sql = "SELECT * FROM search";

$ret = mysqli_query($con, $sql);

while($row = mysqli_fetch_array($ret)) {
    echo "<br>";
    echo $row['idx'],"",$row['title'],"",$row['content'],"",$row['date'],"";
}
?>