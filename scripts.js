const urlBase = '';
const extension = 'php'; 

//insert javascript here for website


//grabs the input from the username and password text boxes
$('#loginButton').click(function checkCredentials(){

     var login = document.getElementById("username").value;
	var password = document.getElementById("password").value;
     
     if(login === '' || password === '' ){
          $('#errorBoxLogin').html("Error: please fill in all boxes");
          $('#errorBoxLogin').show();
     }else{
          //add function to login to contact manager
	     //window.location.href = "main_menu.html";
          $('#errorBoxLogin').html("Error: Username and Password incorrect");
          $('#errorBoxLogin').show();
     }
     
});

//these fix the extending buttons in the main_menu.html
$('#searchButton').click(function moveToSearch(){
     window.location.href = "search_menu.html";
});

$('#addButton').click(function moveToAdd(){
     window.location.href = "add_menu.html";
});

//shows the table after pressing the find button in "search_menu.html"
$('#searchCmdButton').click(function(){
     $('#searchTable').show();
});


//checks if all boxes are filled out
$('#signUpButton').click(function checkCredentials(){

     var firstName = document.getElementById("firstName").value;
     var lastName = document.getElementById("lastName").value;
     var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
     var confirmPassword = document.getElementById("password-2").value;
     if(firstName === '' || lastName === '' || username === '' || password === '' || confirmPassword === ''){
          $('#errorBox').html("Error: please fill in all boxes");
          $('#errorBox').show();
     }else if(!(password === confirmPassword)){
          $('#errorBox').html("Error: Passwords must match");
          $('#errorBox').show();
          document.getElementById("errorBox").style.display='visable';
     }else{
          //add function for create new user
          alert("first name: " + firstName + "\nlast name: " + lastName + "\nusername: " + username + "\npassword: " + password);
     }
     
});



//used for normal password box in both login and sign up sheets
$('#check-show').click(function(){
     if('password' == $('#password').attr('type')){
          $('#password').prop('type', 'text');
     }else{
          $('#password').prop('type', 'password');
     }
 });

 //used for confirm password box in sign-up sheet
 $('#check-show-2').click(function(){
     if('password' == $('#password-2').attr('type')){
          $('#password-2').prop('type', 'text');
     }else{
          $('#password-2').prop('type', 'password');
     }
 });

