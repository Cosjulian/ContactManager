<?php

    $inData = getRequestInfo();

    $id = 0;
    $firstName ="";
    $lastName = "";
    $userName = "";
    $password = "";

    $conn = new mysqli("localhost", "Group24WebServer", "Group24Server", "contact_manager");
    if($conn->connect_error){
        returnWithError($conn->connect_error);
    } else {
        $stmt = $conn->prepare("INSERT into Users(FirstName,LastName,Login,Password)
        VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $inData["firstName"], $inData["lastName"], 
        $inData["userName"], $inData["password"]);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt->close();
        $conn->close();
    }


    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson ($obj) {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError ($err){
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo ($firstName, $lastName, $id){
        $retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
        sendResultInfoAsJson($retValue);
    }
?>