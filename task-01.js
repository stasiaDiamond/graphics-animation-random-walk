// Disclaimer! I don't know everything. I'm new to coding. It helps me in the moment and when coming back later to write detailed comments. 
// I'm taking this to the next level in this bootcamp so that me and other students can attempt to make more sense of a vague and ambiguous curriculum. 
// It's hard to learn coding without vocabulary or lists of covered material, so I'm adding some vocab here to supplement the lack of resources given in the MITxPro Emeritus Codio assignment. 
// I hope this helps someone out there! I'm glad I had the time and enough previous coding knowledge to break down each piece of this. If you're reading, good luck! 
// Feel free to reach out if you spot something. I want to learn and grow!



// ---- any comment prefaced by an asterisk (***) are notes I have added and not part of the curriculum ------



// No need to change the following code
// The area object defines the div in which the balls will be created
// *** look up dot notation, DOM manipulation, javascript objects, and JS key-value pairs
const area = {
  element: document.getElementById('area'),
  width: 600,
  height: 400,
};

// No need to change the following code
// The initialize function creates the area div on the Html page
// *** working with inline CSS styling and using the object made on line 5
// *** appendChild() adds the area.element, .width, and .height back into the HTML document as a child of the body element. This creates HTML dynamically using javascript
function initialize() {
  area.element.style.width = area.width + 'px';
  area.element.style.height = area.height + 'px';
  document.body.appendChild(area.element);
}

// No need to change the following code
// The moveTo function moves a given ball to a set x and y coordinates on the page
// *** you are creating the name of the parameters as arguments at the same time you're creating the function. 
// You do not need to make ball, x, or y into variables. They're parameters that exist only in this function as ball is not declared anywhere. 
// *** this function moves the ball to specific x and y coordinates and concatenates the number with the string px, so that CSS knows they're pixels
function moveTo(ball, x, y) {
  ball.element.style.left = x + 'px';
  ball.element.style.top = y + 'px';
}

// No need to change the following code
// The changeDirectionIfNecessary function reverses the ball direction when it hits the area borders
// *** once again this is creating the name of the parameters as arguments at the same time you're creating the function. 
// You do not need to make ball, x, or y a variable. They're parameters that exist only in this function. 
// Yes, the same parameter names are being used in moveTo() but they are still functionally scoped as ball is not declared anywhere. 
// *** this will change the direction of the balls once they hit the area's width or height minus the ball's width or height
function changeDirectionIfNecessary(ball, x, y) {
  if (x < 0 || x > area.width - ball.width) {
    ball.dx = -ball.dx;
  }
  if (y < 0 || y > area.height - ball.height) {
    ball.dy = -ball.dy;
  }
}

// TODO: implement the create function
// *** reminder, you could name color, dx, and dy whatever you'd like as long as you refer to them the same way throughout the function's scope. 
// These arguments were not declared anywhere earlier. 
// Although, dx and dy are commonplace to mean directionX and directionY
function create(color, dx, dy) {
  // *** line 58 is object construction. 
  // Strangely this comes from way out of left field seeing as how they only just taught us what a primitive data types were this week, lol...
  //  *** anyway... newBall is being created from "this". 
  // "this" is pretty advanced JS. What "this" is changes often based on how it's used. 
  // In this context, we're telling JS to create a new object with the properties were setting on newBall.___ 
  const newBall = Object.create(this);

  // TODO: Set newBall properties: dx, dy, width, height

  // *** this could also look like the following Object literal instead of lines 68-71:
  // const newBallObject = {
  //   dx: dx,
  //   dy: dy,
  //   width: 40,
  //   height: 40,
  // }

  newBall.dx = dx;
  newBall.dy = dy;
  newBall.width = 40;
  newBall.height = 40;

  // TODO: set the newBall.element property and initialize it to a Html element "div"
  // *** dynamically creates a new element called "div" and drops it into the HTML body. 
  // This div will house the newBall element
  // *** this is where we create the .element we'll use later. 
  // It refers to the new div we created that will be read by HTML. Much like for the "area" Object in line 15
  newBall.element = document.createElement("div");

  // TODO: set the backgroundColor, width and height style properties for newBall.element
  // *** because newBall is an Object, element is one of it's keys. 
  // After accessing the element, (which above we set to the "area" div), we're going to use .style.___ to set it's color, width, and height. 
  // Concatenating with the string "px" again so CSS knows its a pixel location.
  newBall.element.style.backgroundColor = color;
  newBall.element.style.width = newBall.width + "px";
  newBall.element.style.height = newBall.height + "px";

  // This line set the CSS class for newBall.element. No need to change this line
  // *** here is where the class called .ball in style.css is created  
  newBall.element.className += ' ball';

  // TODO: set the width and height of newBall based on newBall.element
  // Hint: use the Javascript parseInt() function to convert a string value to integer
  // *** because we concatenated our height/width with "px" earlier so CSS could understand it, we now have to take that "px" off so javascript can work with it. 
  // The parseInt() JS built-in function removes strings and converts it back to a primitive Number. 
  // Because JS is read top to bottom, we are overwriting height and width again here
  newBall.width = parseInt(newBall.element.style.width);
  newBall.height = parseInt(newBall.element.style.height);

  // TODO: use the Javascript appendChild() function to add newBall.element to the area element
  // *** appendChild() here states we go into the "area" div in HTML and appendChild() of newBall to it specifically instead of appending newBall to the entire <body> of the HTML document
  // *** return to allow newBall to be used outside this function
  area.element.appendChild(newBall.element);
  return newBall;
}

// TODO: implement the update function
// *** continue to use ball, x, y arguments
function update(ball, x, y) {
  // TODO: use the moveTo() function to move the ball
  // *** call moveTo() function inside the update function. 
  // In order to update():
  // 1st we use the current arguments for ball, x, y to determine where the ball is
  // 2nd we need to moveTo() the new coordinates
  moveTo(ball, x, y);

  // TODO: use the Javascript setTimeout() method to call changeDirectionIfNecessary() and update() every 16ms
  // *** this feels like a tricky way to word this. 
  // I need to know where the ball is before calling either of those functions on it since these arguments are not pointing to a position on the page.
  // *** let's make x and y mean something inside this function. 
  // We'll need them to be defined so we can know where the ball has moved to before calling update() on it.
  x = x + ball.dx;
  y = y + ball.dy;

  changeDirectionIfNecessary(ball, x, y);


  // *** now call setTimeout() with this new and ever changing coordinate
  setTimeout(function () {
    update(ball, x, y);
  }, 16);
}

// *** below is the answer they gave us. 
// How a 2 weeks new student be able to do this with no help, resources, or links? 
// Why do they need to divide 1000 / 60? 
// Why is this answer so convoluted? 
/* This is very much giving "POP QUIZ! GOTCHA!" vibes feels just plain rude to give to a student who's been coding part-time for less than 2 weeks with no explanation of what it means or why.  New students don't know if this is supposed to be easy or hard AF.  As a true beginner, if I were presented with this solution as if it was the simplest thing in the world, I would be scared shitless of the program.  I mean c'mon... let us build some confidence first! Is this a scare tactic? I dunno... but the real bummer is tht it's never discussed in class before or after. They throw this at us and don't say a word of clarity or excitement about it later. */


// // TODO: implement the update function
// function update(ball, x, y) {
//   moveTo(ball, x, y);
//   setTimeout(function () {
//     changeDirectionIfNecessary(ball, x, y);
//     update(ball, x + ball.dx, y + ball.dy);
//   }, 1000 / 60);
// }


// Uncomment these lines for step 1 of the activity
// This is expected to create 3 balls within the area div

initialize();
const ball1 = create('blue', 4, 3);
const ball2 = create('red', 1, 5);
const ball3 = create('green', 2, 2);
moveTo(ball1, 1, 1);
moveTo(ball2, 10, 10);
moveTo(ball3, 20, 20);

// Uncomment these lines for step 2 of the activity
// This is expected to make the 3 balls move around the area div

update(ball1, 70, 0);
update(ball2, 20, 200);
update(ball3, 300, 330);

// Do not change code past this point
if (typeof module !== 'undefined') {
  module.exports = { update, create, changeDirectionIfNecessary, moveTo, area };
}
