class Bird {

  constructor(brain) {
    this.y = height/2;
    this.x = 64;
    this.gravity = 0.7;
    this.lift = -12;
    this.velocity = 0;

    this.score = 0;
    this.fitness = 0;
    if(brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 6, 2);
    }
  }

  show() {
    stroke(255);
    fill(255, 255, 0);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  think(pipes) {

    let closest = null;
    let closest_dist = Infinity;
    for(let i=0; i<pipes.length; i++) {
      let d = pipes[i].x - this.x;
      if(d < closest_dist) {
        closest = pipes[i];
        closest_dist = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.top / height;
    inputs[2] = closest.bottom / height;
    inputs[3] = closest.x / width;
    inputs[4] = this.velocity / 10;

    let output = this.brain.predict(inputs);
    if(output[0] > output[1]) {
      this.up();
    }
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }

    if(this.velocity > 10) {
      this.velocity = 10;
    }

  }

}
