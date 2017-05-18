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
var x = 5;
var y = 5;
//and combine em together...
var rPosition = [x, y];

//With this, let's place some obstacles with some cool descriptions...

//Giant mountain!
var gMountain = [4, 8];
var gDesc = "We've found a gigantic mountain, much bigger than Everest on earth!\nWhat a discovery!"
var gDiscovered = false;
//Alien artifact!
var aArtifact = [7, 3];
var aDesc = "Incredible! This is an alien artifact!\nThere could have been life on Mars!"
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
	wipeScreen();
	console.log(" Welcome to the Mars Rover Application\n\nYour mission is to drive and direct the\n Rover to find 3 discoveries on Mars!\n\n              Good Luck!");
	userPrompt.question("\n       Hit Enter to continue.", function(entry) {
		main();
	});
}

//The main screen which the player will be using often to navigate Mars...
function main() {
	//Wipe screen and continue.
	winGame();
	self();
	wipeScreen();
	console.log(" Rover's current position is at \n      ["+rPosition+"] facing "+facing+"\n    "+discoveries+" of 3 discoveries made...");
	console.log("\n [F] - Forwards | [B] - Backward");
	console.log("[L] - Turn Left | [R] - Turn Right\n");
	console.log(" Type the letter command then hit\n        Enter to execute.");
	userPrompt.question("Command: ", function(entry) {
		command = entry.toLowerCase();

		//If I had more time I could clean up these if statements, but for now they do what I need them to.
		if (facing == "NORTH" && command == "f") {
			y += 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "NORTH" && command == "b") {
			y -= 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "NORTH" && command == "l") {
			facing = "WEST";
			main();
		} else if (facing == "NORTH" && command == "r") {
			facing = "EAST";
			main();
		} else if (facing == "SOUTH" && command == "f") {
			y -= 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "SOUTH" && command == "b") {
			y += 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "SOUTH" && command == "l") {
			facing = "EAST";
			main();
		} else if (facing == "SOUTH" && command == "r") {
			facing = "WEST";
			main();
		} else if (facing == "EAST" && command == "f") {
			x += 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "EAST" && command == "b") {
			x -= 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "EAST" && command == "l") {
			facing = "NORTH";
			main();
		} else if (facing == "EAST" && command == "r") {
			facing = "SOUTH";
			main();
		} else if (facing == "WEST" && command == "f") {
			x -= 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "WEST" && command == "b") {
			x += 1;
			rPosition = [x,y];
			check();
			main();
		} else if (facing == "WEST" && command == "l") {
			facing = "SOUTH";
			main();
		} else if (facing == "WEST" && command == "r") {
			facing = "NORTH";
			main();
		} else {
			console.log ("Please enter an [F], [B], [L], or [R] and press Enter.")
			sleep(2000);
			main();
		}

	});
}

//Function to relocate rover if it goes "off planet" and brings them back to an origin.
function self() {
	if (x >= 11) {
		x = 1;
	} else if (x <= 0){
		x = 10;
	} else if (y >= 11){
		y = 1;
	} else if (y <= 0) {
		y = 10;
	}
	rPosition = [x,y];

}

//Obstacle checking...
function check() {
	//For the sake of time constraints, the position checking is a little messy...
	//First, check for mountain...
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
		sleep(2000);
		
		discoveries += 1;
		gDiscovered = true;
			main();
	} else if (rPosition[0] == gMountain[0] && rPosition[1] == gMountain[1] && gDiscovered == true) {
		x = 4;
		y = 7;
		rPosition = [x,y];
		console.log ("\nWe've already discovered this mountain! Let's move back to "+rPosition+"...")
		
		userPrompt.question("Hit Enter to continue.", function(entry) {
			main();
		});
		//Check for alien artifact...
	} else if (rPosition[0] == aArtifact[0] && rPosition[1] == aArtifact[1] && aDiscovered == false) {
		
		x = 7;
		y = 2;
		rPosition = [x,y];
		console.log("\nYou've bumped into an object! Let's get in front\nof it and see what it is...")
		sleep(2000);
		sleep(2000);
		wipeScreen();
		console.log(aDesc);
		sleep(2000);
		sleep(2000);
		sleep(2000);
		
		discoveries += 1;
		aDiscovered = true;
			main();
	} else if (rPosition[0] == aArtifact[0] && rPosition[1] == aArtifact[1] && aDiscovered == true) {
		x = 7;
		y = 2;
		rPosition = [x,y];
		console.log ("\nWe've already discovered this artifact! Let's move back to "+rPosition+"...")
		
		userPrompt.question("Hit Enter to continue.", function(entry) {
			main();
		});
		//Last, check for satilite...
	} else if (rPosition[0] == cSatilite[0] && rPosition[1] == cSatilite[1] && sDiscovered == false) {
		
		x = 2;
		y = 9;
		rPosition = [x,y];
		console.log("\nYou've bumped into an object! Let's get in front\nof it and see what it is...")
		sleep(2000);
		sleep(2000);
		wipeScreen();
		console.log(sDesc);
		sleep(2000);
		sleep(2000);
		sleep(2000);
		
		discoveries += 1;
		sDiscovered = true;
			main();
	} else if (rPosition[0] == cSatilite[0] && rPosition[1] == cSatilite[1] && sDiscovered == true) {
		x = 2;
		y = 9;
		rPosition = [x,y];
		console.log ("\nWe've already discovered this satilite! Let's move back to "+rPosition+"...")
		
		userPrompt.question("Hit Enter to continue.", function(entry) {
			main();
		});
	}
}

function winGame() {
	if (discoveries == 3) {
		wipeScreen()
		console.log ("\nWe've made so many discoveries on Mars!\nWell done, let's head back home!\n\nThank you for playing!")
		sleep(2000);
		sleep(2000);
		sleep(2000);
		process.exit();
	}
}




// -----executors-----
intro();
