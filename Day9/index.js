class Knot {
  x;
  y;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

class Rope {
  knots = [];
  tailPositions = new Set();

  constructor(length) {
    for (let i = 0; i < length; i++) {
      this.knots.push(new Knot());
    }
  }

  move(direction, length) {
    length = parseInt(length);

    switch (direction) {
      case "U":
        for (let i = 0; i < length; i++) {
          this.knots[0].y++;
          this.propagateMovement();
        }
        break;
      case "D":
        for (let i = 0; i < length; i++) {
          this.knots[0].y--;
          this.propagateMovement();
        }
        break;
      case "R":
        for (let i = 0; i < length; i++) {
          this.knots[0].x++;
          this.propagateMovement();
        }
        break;
      case "L":
        for (let i = 0; i < length; i++) {
          this.knots[0].x--;
          this.propagateMovement();
        }
        break;
    }
  }

  propagateMovement() {
    for (let i = 1; i < this.knots.length; i++) {
      let prior = this.knots[i - 1];
      let current = this.knots[i];

      if (prior.x - current.x > 1) {
        current.x++;
        current.y = prior.y;
      } else if (prior.x - current.x < -1) {
        current.x--;
        current.y = prior.y;
      }

      if (prior.y - current.y > 1) {
        current.y++;
        current.x = prior.x;
      } else if (prior.y - current.y < -1) {
        current.y--;
        current.x = prior.x;
      }
    }

    this.saveTailPosition();
  }

  saveTailPosition() {
    let coord = [this.tail.x, this.tail.y];
    this.tailPositions.add(coord.join());
  }

  get tail() {
    let lastIndex = this.knots.length - 1;
    return this.knots[lastIndex];
  }
}

function start() {
  let inputText = getInput();
  let instructions = inputText.split("\n");

  let smallRope = new Rope(2);
  let bigRope = new Rope(10);

  feedRopeInstructions(smallRope, instructions);
  feedRopeInstructions(bigRope, instructions);

  displayResults(smallRope.tailPositions.size, bigRope.tailPositions.size);
}

function feedRopeInstructions(rope, instructions) {
  for (let instruction of instructions) {
    [direction, length] = instruction.split(" ");
    rope.move(direction, length);
  }
}
