// ~Ian Nancarrow, 05/18/2017
// -----tools-----
var userInput = require('readline');
var userPrompt = userInput.createInterface(process.stdin, process.stdout);

/* User Question Code quickgrab...

userPrompt.question("", function(entry) {

});

*/

//Delay the screen function...
var sleep = function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		break;
		}
    }
};

//Wipe the screen function...
var wipeScreen = function () {
	return process.stdout.write('\033c');
};



// -----design-----

//We want the rover to explore and find 3 objects on the "mars surface" of a grid of 10x10
//3 predetermined locations
//user moves rover in accordance to one character inputs:
// f - forward
// b - back
// l - left
// r - right
//Solution: I'll make directional facing an array that will loop itself if it goes over or under specific numbers to return
// to a facing. This should make it easy to always rotate N to E to S to W back to N again.
//Question: Should I have a map for the player to reference so they're aware of where their rover is on the planet?
// If I do it will have to be an array or such of where the player explores. I still don't know how I'm going to work a whole
// grid for the rover to navigate...
//Solution: I'll try to keep positioning simple. Just an array of x and y. No need to initialize a "world", just have conditions
// and restrictions to warp the player back to 0's or 10's depending on how great or small their x and y numbers are.


// -----variables-----


//Starting facing will be north
var facing = "NORTH";
//If the player chooses to rotate, they'll increase the array by one for right, decrease by one for left - cycling the array
//to make it easier to choose new directions.
var direction = ["NORTH", "EAST", "SOUTH", "WEST"];

//Simple solution to "rover's positioning"...
var x = 4
var y = 7
//and combine em together...
var rPosition = [x, y];

//With this, let's place some obstacles with some cool descriptions...

//Giant mountain!
var gMountain = [4, 8];
var gDesc = "We've found a gigantic mountain, much bigger than Everest on earth!\nWhat a discovery!"
var gDiscovered = false;
//Alien artifact!
var aArtifact = [7, 3];
var aDesc = "Incredible! This is an alien artifact! There could have been life on Mars!"
var aDiscovered = false;
//A crashed earth satilite!
var cSatilite = [2, 10];
var sDesc = "It's one of our earlier satilites sent out generations ago!\nI wonder what data is stored within?"
var sDiscovered = false;

//When the object's array equals the array of the rover's position, the rover will "bump" into it and retain its
// previous position, announcing the description of the object it bumped into.
//Caution: Player might think they're stuck and continually bump into obstacle. Should make an indicator so it's
// clear they have to rotate and move around the object to continue the game.

//There should be a game winning condition - if you discover all 3 objects, there should be a win screen.
// discoveries variable will do that for us - when it hits 3, the game will end.
var discoveries = 0;




// -----objects?-----



// -----messages?-----



// -----functions-----

function intro() {
	console.log("Welcome to the Mars Rover Application!");

}

//The main screen which the player will be using often to navigate Mars...
function main() {
	//Wipe screen and continue.
	wipeScreen();
	console.log("Rover's current position is at \n"+rPosition+" facing "+facing);
	console.log("[F] - Forwards  | [B] - Backward");
	console.log("[L] - Turn Left | [R] - Turn Right\n");
	console.log("Type the letter command then hit Enter to execute.");
	userPrompt.question("Command: ", function(entry) {
		command = entry.toLowerCase();
		if (facing == "NORTH" && command == "f") {
			y += 1;
			rPosition = [x,y];
			check();
			//console.log(rPosition);
		}

	});
}

//Obstacle checking...
function check() {
	//For the sake of time constraints, the position checking is a little messy...
	if (rPosition[0] == gMountain[0] && rPosition[1] == gMountain[1] && gDiscovered == false) {
		
		x = 4;
		y = 7;
		rPosition = [x,y];
		console.log("\nYou've bumped into an object! Let's get in front\nof it and see what it is...")
		sleep(2000);
		sleep(2000);
		wipeScreen();
		console.log(gDesc);
		sleep(2000);
		sleep(2000);
		
		discoveries += 1;
		gDiscovered = true;
		userPrompt.question("Hit Enter to continue.", function(entry) {
			main();
		});
	} else if (rPosition[0,1] == gMountain[0,1] && gDiscovered == true) {
		x = 4;
		y = 7;
		rPosition = [x,y];
		console.log ("\nWe've already discovered this mountain! Let's move back to "+rPosition+"...")
		
		userPrompt.question("Hit Enter to continue.", function(entry) {
			main();
		});
	}
}



// -----executors-----
main();
