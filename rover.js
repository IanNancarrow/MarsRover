// tools
var userInput = require('readline');
var userPrompt = userInput.createInterface(process.stdin, process.stdout);

/* User Question Code quickgrab...

userPrompt.question("", function(entry) {

});

*/

// design

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


// variables


//Starting facing will be north
var facing = "north";
//If the player chooses to rotate, they'll increase the array by one for right, decrease by one for left - cycling the array
//to make it easier to choose new directions.
var direction = ["north", "east", "south", "west"];

//Simple solution to "rover's positioning"...
var x = 5
var y = 5
//and combine em together...
var rPosition = [x,y];

//With this, let's place some obstacles with some cool descriptions...

//Giant mountain!
var gMountain = [4, 8];
var gDesc = "We've found a gigantic mountain, much bigger than Everest on earth!\nWhat a discovery!"
//Alien artifact!
var aArtifact = [7, 3];
var aDesc = "Incredible! This is an alien artifact! There could have been life on Mars!"
//A crashed earth satilite!
var cSatilite = [2, 10];
var sDesc = "It's one of our earlier satilites sent out generations ago!\nI wonder what data is stored within?"

//When the object's array equals the array of the rover's position, the rover will "bump" into it and retain its
// previous position, announcing the description of the object it bumped into.
//Caution: Player might think they're stuck and continually bump into obstacle. Should make an indicator so it's
// clear they have to rotate and move around the object to continue the game.

//There should be a game winning condition - if you discover all 3 objects, there should be a win screen.
// discoveries variable will do that for us - when it hits 3, the game will end.
var discoveries = 0;




// objects



// messages



// functions



//