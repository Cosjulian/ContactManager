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

                if(login === '' || password === ''){
                    $('#errorBoxLogin').html("Error: please fill in all boxes");
                    $('#errorBoxLogin').show();
                    return;
                }
                else if(userID < 1){
                    $('#errorBoxLogin').html("Error: Incorrect Username or Password");
                    $('#errorBoxLogin').show();
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
    userID = readCookie();
    let tmp={name:name, userId:userID};
    

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Search.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                
                var resultsDiv = document.getElementById('results');
                resultsDiv.innerHTML = '';

                if(jsonObject.results.length > 0) {
			tableHeader.style.display = "table-row";
					var header = document.createElement('tr');
					
					var nameHeader = document.createElement('th')
					nameHeader.textContent = "Name";
                    header.appendChild(nameHeader);
					
					var phoneHeader = document.createElement('th')
					phoneHeader.textContent = "Phone";
                    header.appendChild(phoneHeader);
					
					var emailHeader = document.createElement('th')
					emailHeader.textContent = "Email";
                    header.appendChild(emailHeader);
					
					var editHeader = document.createElement('th')
					editHeader.textContent = "Edit";
                    header.appendChild(editHeader);
					
					var deleteHeader = document.createElement('th')
					deleteHeader.textContent = "Delete";
                    header.appendChild(deleteHeader);
					
					
					resultsDiv.appendChild(header);
					
                    jsonObject.results.forEach(function(contact){

                        var row = document.createElement('tr');

                        var nameCell = document.createElement('td');
                        nameCell.textContent = contact.Name.Name;
                        row.appendChild(nameCell);
                        
                        var phoneCell = document.createElement('td');
                        phoneCell.textContent = contact.Name.Phone;
                        row.appendChild(phoneCell);

                        var emailCell = document.createElement('td');
                        emailCell.textContent = contact.Name.Email;
                        row.appendChild(emailCell);

                        var editCell = document.createElement('td');

                        var editButton = document.createElement('button');
                        editButton.textContent = 'Edit';
						editButton.className = 'btn btn-large btn-warning'
                        editButton.onclick = function () {
                            localStorage.setItem('contactId', contact.Name.ID);
                            localStorage.setItem('contactName', contact.Name.Name);
                            localStorage.setItem('contactPhone', contact.Name.Phone);
                            localStorage.setItem('contactEmail', contact.Name.Email);

                            window.location.href = "edit_menu.html";
                        };

                        editCell.appendChild(editButton);
						row.appendChild(editCell);
						
						var deleteCell = document.createElement('td');

                        var deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
						deleteButton.className = 'btn btn-large btn-danger'
                        
                        deleteButton.onclick = function () {
                            localStorage.setItem('contactId', contact.Name.ID);
                            localStorage.setItem('contactName', contact.Name.Name);
                            localStorage.setItem('contactPhone', contact.Name.Phone);
                            localStorage.setItem('contactEmail', contact.Name.Email);
                            
                            if(confirm("Do you want to delete?")) {
                            doDelete();
                            row.style.display = "none";
                            }
                            };

                        deleteCell.appendChild(deleteButton);
                        row.appendChild(deleteCell);
                        resultsDiv.appendChild(row);
                });
        }
        else {
            resultsDiv.textContent = "No contacts found.";
        }
                return jsonObject;
            }
        };
        
        xhr.send(jsonPayload);
    }
    catch {
        console.error('Error:', erorr);
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
    let name = document.getElementById("addName").value;
    let phone = document.getElementById("addPhone").value;
    let email = document.getElementById("addEmail").value;

    if(name === '' || phone === '' || email === '') {
        $('#errorBoxAdd').html("Error: please fill in all booxes");
        $('#errorBoxAdd').show();
        return;
        }

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
                

                if(userID < 1){
                    return;
                }
               
                saveCookie();
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){

    }
}

function editContact() {
    let name = document.getElementById("editName").value;
    let phone = document.getElementById("editPhone").value;
    let email = document.getElementById("editEmail").value;

    let tmp = {Name:name, Phone:phone, Email:email, contactID:localStorage.getItem('contactId')};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/editContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
                window.location.href = "search_menu.html";

            }
        };
        xhr.send(jsonPayload);
    }
    catch(err){

    }

}

function doDelete(){
    userID = readCookie();
    let name = localStorage.getItem('contactName');
    let phone = localStorage.getItem('contactPhone');
    let email = localStorage.getItem('contactEmail');
    
    let tmp = {Name:name, Phone:phone, Email:email, userID:userID};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/deleteContact.' + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);
    
    
            }
        };
    xhr.send(jsonPayload);
    }
    catch {
    
    }
    
}