

// JS Test:
alert("You are beginning the Hangman Game..!");

// ---------------------------------------------------------------
// Introduction of (GLOBAL) Variables and Intro of "INITIAL STATE!!":
// ----------------------------------------
var wordChoices = ["paris", 
"passport",
"teluride",
"london",
"oslo",
"fjords",
"austin",
"cruise",
"cancun",
"luggage",
"tahoe",
"sao paulo",
"bangkok",
"customs",
"berlin",
"new york city",
"brugues",
"visa",
"tokyo",
"shanghai",
"travel insurance",
"tourist center",
"san francisco",
"double decker bus",
"antigua",
"san jose",
"mexico city",
"translyvania",
"warsaw",
"budapest",
"prague",
"currency exchange",
"rome",
"cannes",
"great wall",
"bejing",
"airport",
"hong kong"];

// var lostImages = [];
// var winImages = []

var randomNumber = Math.floor(Math.random() * wordChoices.length);
var randomWordSelect = wordChoices[randomNumber];
var guessedLetters = [];
var inputKey = "";


function guessCheck(char) {
		return(char === inputKey);
	}

var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var defaultDisplay = [];

var winCounter = 0;
var loseCounter = 0;
var guessRemain = 15;
var gameOn = false;

// GAME ESTABLISHMENT/ SET- UP:
// ----------------------------------------
document.getElementById("game").innerHTML = "Press the Space Bar to begin!";

document.onkeyup = function(event) {
	if (gameOn == false) {
		if (event.key == " ") {  // look for space bar key to start game
			gameOn = true;
			defaultDisplay = [];
			guessRemain = 15;
			guessedLetters = [];

			randomNumber = Math.floor(Math.random() * wordChoices.length);
			randomWordSelect = wordChoices[randomNumber];

			for (var i = 0; i < randomWordSelect.length; i++) { //This is to FORMAT THE DEFAULT-DISPLAY (for the guessed word) ON THE SCREEN.
				if (randomWordSelect[i] === " ") {
					defaultDisplay[i] = " ";
				}
				else {
					defaultDisplay[i] = "_";
				}
			}
            // Disaply the beginning word and counters 
			document.getElementById("game").innerHTML = "Your travel word: " + defaultDisplay.join("");
			document.getElementById("left").innerHTML = "Guesses Remaining: " + guessRemain;
			document.getElementById("score").innerHTML = "Trips Won: " + winCounter + ",  Trips Lost: " + loseCounter;
			document.getElementById("guesses").innerHTML = " ";
			console.log(defaultDisplay, guessRemain, winCounter, loseCounter, gameOn);
		}	
		else ; // ignore the key
	}
	
    else {   // Gameon is true - then process key inout
		console.log(event.key);

		inputKey = ""; //This resets the input key value, from previous guess.
		for (var i = 0; i < alphabet.length; i++) {   //check to see if event.key is alpha key
			if (event.key == alphabet[i]) { //PREVIOUSLY: if (event.key.toLowerCase() == alphabet[i]) {
				inputKey = event.key;  // Save the event.key on a match; PREVIOUSLY: inputKey = event.key.toLowerCase()
				if (guessedLetters.some(guessCheck)) {
					return;
				}
				else {
					guessedLetters.push(alphabet[i]);
				}
				break;  // exit the for loop
			}
		}
console.log(inputKey);
		if (inputKey === "") {
			alert("You did not type a valid key! Please press a letter.");
		}
		else { //else the key is a valid key (ie. a letter), then the rest of the code will run, code control.
			console.log(inputKey)
			for (var i = 0; i < randomWordSelect.length; i++) {  //scan to see if inputkey is in the random word
				if (inputKey == randomWordSelect[i]) {
					console.log("match ", inputKey);
					defaultDisplay[i] = randomWordSelect[i]; //Replaces the underscore with the user's guessed letter.
				}
			}

			guessRemain--; //This is the same as typeing guessRemain = guessRemain -> This will reduce the # of guess by 1.

			if (guessRemain == 0) {
				document.getElementById("game").innerHTML = "Sorry, you missed your flight! The word was: " + randomWordSelect + " Press the Space Bar to try again.";
				loseCounter++;
				gameOn = false;  // start new game
				//ENTER A KEY TO EXIT THIS LOOP AND BEGIN A NEW GAME!
			}
			else {  // process the guess input and check for end of game conditions
				console.log(inputKey);
				for (var i = 0; i < defaultDisplay.length; i ++) { //scan for end of game - no more _ left
					if (defaultDisplay[i] === "_") {
						break;
					}	
				}

				if (i == defaultDisplay.length) {  // if user has won
					winCounter++;
					document.getElementById("game").innerHTML = "Looks like you're a world traveller!  Press the Space Bar to try again.";
					gameOn = false;
				} 

				else {
				document.getElementById("game").innerHTML = "Your travel word: " + defaultDisplay.join("");  // update travel work with letter
				}
			}

			document.getElementById("left").innerHTML = "Guesses Remaining: " + guessRemain;
			document.getElementById("score").innerHTML = "Trips Won: " + winCounter + ",  Trips Lost: " + loseCounter;
			document.getElementById("guesses").innerHTML = "Letters Guessed: " + guessedLetters;
		}

	}	

} //End of the game event.