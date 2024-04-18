let storyData; //global variable that holds the data from text.json as 
let currentNumber = 0; //global variable that holds what text portion the story is on
let startTime; //initialising the start time globally so it can be called in different functions to store the start time and later use it in calculations
const endGameButton = document.getElementById("finishGame");

// search !!! to find notes - delete before submitting



function exportJSON(nameData, endTime) {





    const data = { nameData, endTime }; // Create an object with the data
    const filename = 'game_data.json'; // Setting a filename
    downloadJSON(data, filename); // Call the downloadJSON function starting the download

    const jsonStr = JSON.stringify(data); // Convert the object to a JSON string
    const blob = new Blob([jsonStr], { type: 'application/json' }); // Create a Blob object
    const url = URL.createObjectURL(blob); // Create a URL for the Blob

    const link = document.createElement('a'); // link element
    link.href = url; // Set the URL as the link's href attribute
    link.download = filename; // Set the filename as the link's download attribute
    document.body.appendChild(link); // Append the link to the document body
    link.click(); // Simulate a click on the link
    document.body.removeChild(link); // Remove the link from the document body after it's clicked
    URL.revokeObjectURL(url); // Revoke the URL to free up memory

}




// Function to fetch the JSON data and store it to storyData
function fetchData() {
    return fetch('./text.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('ruh roh network failed');
            } else {
                return response.json();
            }
        })
        .then(data => {
            storyData = data.chickenScript; // assigns the array directly to storyData
            return data; // Return the fetched data for further processing if needed
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });
}
fetchData(); //fetching the data so It can be called later

//This function is used to hide the "Start New Game" and "Load Game" buttons later
function hideButton(buttonID) {
    const button = document.getElementById(buttonID);
    button.style.display = "none"; 
}
// This function uses the data from fetchData() and gets the relevant bit of it
function useData(number) {
    const currentData = storyData[number];
    //.log(currentData); //this is for testing
    document.getElementById("replaceMe").innerHTML = currentData.text;
}

function createButtons(number) {

    //console.log(number); // this is for testing



    //The below finds and deletes any existing created buttons (so more arent added leaving like 100 buttons everywhere)
    const usedButtonsToRemove = document.querySelectorAll(".deleteMeOnClick");
    for (let i = 0; i < usedButtonsToRemove.length; i++) {
        usedButtonsToRemove[i].remove();
    }

    const currentData = storyData[number] //This holds all data for the current block of text only

    //Below is a forlopp that creates a button for every branch in the JSON file (recorded as branches)
    for (let i = 0; i < parseInt(currentData.branches); i++) { //loops through each branch in the JSON for the given question
        //setTimeout(() => { //this creates  a delay before the buttons appear (for dramatic effect xo) by putting everything in it in the setTimeout //removed this due to functionality issues



        const newButton = document.createElement("button");  //creating a new button
        newButton.textContent = currentData["branch" + (i+1)]; //setting the buttons text to one of the  branches
        newButton.id = currentData["branch" + (i + 1)+"Number"] //setting the id to the number the button should branch to if clicked       
        newButton.classList.add("deleteMeOnClick"); //setting the class (or one of the classes) so I can delete buttons with this later
        document.body.appendChild(newButton); // SEE IF I CAN USE THIS TO PUT THE BUTTONS SOMEWHERE MORE AESTHLETICALLY PLEASING LATER !!!

            newButton.addEventListener("click", function () {
                currentNumber =  parseInt(newButton.id) -1; //removing one as this function adds one to the id of where the program branches to
                useData(currentNumber);
                createButtons(currentNumber); // #recursion very cool - calling create buttons to make the next lot of buttons after changing the text and hiding these buttons

            })



        //}, 2000 * (i+1)); //delay gets longer for every branch bcos otherwise I found it waited once then created all buttons together //removed this due to functionality issues
    }


}


//Identifying the start button and adding functionality so a new game is created when it is clicked
const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function () {

    startTime = new Date(); //setting the start time to work out time played later
    
    endGameButton.style.display="block";  //showing the end Game button now the game has been started

    useData(currentNumber); //loads a function where the first question (from the JSON file data) is written to the website
    hideButton("loadButton"); //hides the Load Game button when new game is clicked
    hideButton("startButton") //hides the New Game button when new game is clicked
    createButtons(currentNumber); //creates the buttons that the user can select using the current number (starts as 0)
})






// The below is triggered when the end game button clicked and works out how long it has been since the start game button was clicked
endGameButton.addEventListener("click", function () {
    const endTime = new Date();
        const totalSeconds = (endTime - startTime) / 1000
    //console.log("you played " + totalSeconds + " seconds") //this is for testing if the right amount of seconds is output


    //import { nameData } from './login.js';


    exportJSON(nameData, totalSeconds);



})

