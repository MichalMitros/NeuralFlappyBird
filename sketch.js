const TOTAL = 250;
var birds = [];
let savedBirds = [];
var pipes = [];
let counter = 0;
let cycles = 100;
//let slider;

function setup() {
  createCanvas(640, 480);
	//slider = createSlider(1, 100, 1);
	for(let i=0; i<TOTAL; i++) {
		birds[i] = new Bird();
	}
}

function draw() {

	//for(let n=0; n < slider.value(); n++) {
	while(birds.length >= 1) {

	if (counter % 55 == 0) {
    pipes.push(new Pipe());
  }

	counter++;

  for (var i = pipes.length-1; i >= 0; i--) {
    // pipes[i].show();
    pipes[i].update();

		for(let j = birds.length-1; j >= 0; j--) {
			if(pipes[i].hits(birds[j])) {
				savedBirds.push(birds.splice(j, 1)[0]);
			}
		}

    // if (pipes[i].hits(bird)) {
    //   console.log("HIT");
    // }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

	for(let bird of birds) {
		bird.think(pipes);
  	bird.update();
  	// bird.show();
	}

	if(birds.length == 0) {
		counter = 0;
		nextGeneration();
		pipes = [];
	}
	if(birds.length == 1) {
		break;
	}
	}

	// DRAW

	background(100, 100, 255);

	for(let bird of birds) {
		bird.show();
	}

	for(let pipe of pipes) {
		pipe.show();
	}
}
