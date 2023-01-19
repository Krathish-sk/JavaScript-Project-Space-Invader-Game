const grid = document.querySelector(".grid");
let goingRight = true;
let direction = 1;
let invadersId;
let width = 15; //here 15 is the total number of boxes that can fit in a row
let currentShooterIndex = 216;
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

//Create sqaures array

const squares = Array.from(document.querySelectorAll(".grid div"));

// Create Invaders
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

//Functions add invaders
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.add("invader");
  }
}

//Functions remove invaders
function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

draw();

//Adding shooter
squares[currentShooterIndex].classList.add("shooter");

//Moving the shooter

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

//Move invaders
function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  remove();

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  draw();

  // Game over (invader touches the shooter)
  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    clearInterval(invadersId);
    alert("Game Over");
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > square.length) {
      clearInterval(invadersId);
      alert("GameOver");
    }
  }
}

invadersId = setInterval(moveInvaders, 100);
