<?php

// Retrieving form data
$fname = $_POST['fname'] ?? '';
$lname = $_POST['lname'] ?? '';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$referee_name = $_POST['referee_name'] ?? '';
$referee_email = $_POST['referee_email'] ?? '';
$exterior = $_POST['exterior'] ?? '';
$type = $_POST['type'] ?? '';
$blind = $_POST['blind'] ?? '';
$color = $_POST['color'] ?? '';
$address = $_POST['address'] ?? '';

// Check if the data file exists
$file = 'data.csv';
$handle = fopen($file, 'a+');

// Lock the file for writing
flock($handle, LOCK_EX);

// Get the last ID
$lastId = 1;
if (($data = fgetcsv($handle, 1000, ",")) !== false) {
  $lastId = $data[0] + 1;
}

// Forming data string with ID
$data = "$lastId,$fname,$lname,$email,$phone,$referee_name,$referee_email,$exterior,$type,$blind,$color,$address\n";

// If the file is empty, add headers
if (filesize($file) == 0) {
  $headers = "ID,First Name,Last Name,Email,Phone,Referee Name,Referee Email,Exterior,Type,Blind,Color,Address\n";
  fwrite($handle, $headers);
}

// Write the data to the file
fwrite($handle, $data);

// Unlock the file
flock($handle, LOCK_UN);

// Close the file
fclose($handle);

// Send a success response
echo 'Data saved to CSV file.';
?>