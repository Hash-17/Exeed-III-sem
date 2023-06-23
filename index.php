<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "exeed";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Check if photo was uploaded successfully
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
  $filename = $_FILES['photo']['name'];
  $filesize = $_FILES['photo']['size'];
  $filetype = $_FILES['photo']['type'];
  $tmpname = $_FILES['photo']['tmp_name'];

  // Read the file data
  $fp = fopen($tmpname, 'r');
  $data = fread($fp, filesize($tmpname));
  $data = addslashes($data);
  fclose($fp);

  // Insert photo data into database
  $sql = "INSERT INTO photo (filename, type, size, data) VALUES ('$filename', '$filetype', $filesize, '$data')";

  if ($conn->query($sql) === TRUE) {
    echo "Photo uploaded successfully!";
  } else {
    echo "Error uploading photo: " . $conn->error;
  }
} else {
  echo "Error uploading photo: " . $_FILES['photo']['error'];
}

// Close database connection
$conn->close();
?>
