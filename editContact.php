<?php
    $inData = getRequestInfo();

    $id = $inData["UserID"];
    $contactId = "";
    $Name = "";
    $Phone = "";
    $Email = "";

    $conn = new mysqli("localhost", "Group24WebServer", "Group24Server", "contact_manager");

    if($conn->connect_error) {
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("UPDATE Contacts SET Name = ?, Phone = ?, Email = ? WHERE ID = ?");
        $stmt->bind_param("sssi", $inData["Name"], $inData["Phone"], $inData["Email"], $inData["contactID"]);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }
    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }
    
    // Function to return errors
    function returnWithError($error) {
        $retValue = '{"error":"' . $error . '"}';
        sendResultInfoAsJson($retValue);
    }
    
    // Function to send results as JSON
    function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
    }
?>