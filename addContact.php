<?php

$inData = getRequestInfo();

if ($inData === null) {
returnWithError("Invalid JSON");
exit();
}

$id = $inData["userID"];
    $Name = "";
    $Phone = "";
    $Email = "";

$conn = new mysqli("localhost", "Group24WebServer", "Group24Se
rver", "contact_manager");
    if($conn->connect_error) {
returnWithError($conn->connect_error);
    } else {
$stmt = $conn->prepare("INSERT into Contacts (Name,Phone,E
mail,UserID) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sssi", $inData["Name"], $inData["Phone"
], $inData["Email"], $id);
$stmt->execute();
$stmt->close();
$conn->close();
returnWithError("");
    }

function getRequestInfo() {
return json_decode(file_get_contents('php://input'), true);
    }
function sendResultInfoAsJson ($obj) {
    header('Content-type: application/json');
    echo $obj;
    }
    
function returnWithError ($err){
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
    }
?>