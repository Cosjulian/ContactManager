const urlBase = '/LAMPAPI';
const extension = 'php';

let userID = 0;
let firstName = "";
let lastName = "";

function doLogin(){
    userID = 0;
    firstName = "";
    lastName = "";

    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    console.log("TEST");
    console.log(login + password);
    let tmp = {login:login, password:password};

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Login.' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userID = jsonObject.id;

                if(userID < 1){
                    return;
                }
                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "main_menu.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){

    }
}

function saveCookie(){
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime()+(minutes*60*1000));
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userID + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userID = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userID = parseInt( tokens[1].trim() );
		}
	}
	
	if( userID < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
//		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
    return userID;
    
}

function doSearch() {
    let name = document.getElementById("firstname").value;

    let tmp={name:name, userId:1};
    console.log(userID);

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Search.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
            console.log(77);
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                console.log(jsonObject);
                return jsonObject;
            }
        };
        console.log(jsonPayload);
        xhr.send(jsonPayload);
    }
    catch {

    }
}

function doSignUp() {
    userID = 0;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let userName = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let tmp = {firstName:firstName, lastName:lastName, userName:userName, password:password};
    let jsonPayload = JSON.stringify(tmp);
    let url = urlBase + '/SignUp.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                userID = jsonObject.id;

                if(userID < 1){
                    return;
                }
                //firstName = jsonObject.firstName;
                //lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "index.html";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){

    }

}

function addContact() {
    userID = readCookie();
    console.log("userID is " + userID);
    let name = document.getElementById("addName");
    let phone = document.getElementById("addPhone");
    let email = document.getElementById("addEmail");

    console.log(userID);
    let tmp = {Name:name, Phone:phone, Email:email, userID:userID};
    let jsonPayload = JSON.stringify(tmp);
    
    let url = urlBase + '/addContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                //userID = jsonObject.id;

                if(userID < 1){
                    return;
                }
                //firstName = jsonObject.firstName;
                //lastName = jsonObject.lastName;

                saveCookie();
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){

    }

}

function doDelete(){
    userID = readCookie();
    console.log("userID is " + userID);
    let name = document.getElementById("Name");
    let phone = document.getElementById("Phone");
    let email = document.getElementById("Email");

    console.log(userID);
    let tmp = {Name:name, Phone:phone, Email:email, userID:userID};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/doDelete.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                //userID = jsonObject.id;

                if(userID < 1){
                    return;
                }
                //firstName = jsonObject.firstName;
                //lastName = jsonObject.lastName;

                saveCookie();
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){

    }
}
