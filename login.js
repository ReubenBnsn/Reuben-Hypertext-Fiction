var username = "";
const textBox = document.getElementById("enterUsername");
const button = document.getElementById("loginButton");


textBox.style.display = "none";
button.style.display = "none";

if (username == "") { //change this to if JSON file has something in it
    textBox.style.display = "block";
    button.style.display = "block";
}


button.addEventListener("click", function () {

    username = textBox.value.trim(); //this is so the user cannot just enter a space
    if (username == "") { //this checks if the username box is empty so it doesn't say "welcome "
        alert("Enter a Username Please") //displays an error if the box is empty
    }
    else { //if the box isnt empty, allow it

        console.log(username); //for debugging!
        const changeThisHeader = document.getElementById("makeMeAppearPlease");
        changeThisHeader.textContent = "Welcome " + username + "!"

        textBox.style.display = "none";
        button.style.display = "none";


        export const nameData = {username};




    }

}); 
