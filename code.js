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

};