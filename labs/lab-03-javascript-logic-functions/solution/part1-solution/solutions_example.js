/*
  Reference solutions for Session 9 Lab — Logic & Functions
  Web Application Programming (G247) · CUNEF Escuela Politécnica Superior

  REFERENCE ONLY — do not copy for your own submission.
  Same role as example_football_club.html in the Session 3 lab: it shows
  the expected shape and depth of a passing submission. Your pair must
  write your own logic — and be able to explain every line of it.

  Run with: node solutions_example.js   (or paste into the browser console)
  Expected output: no "Assertion failed" lines.
*/

// ---- Part 1 warm-ups (completed) ----

// greet — three syntaxes, one behavior
function greetDeclaration(name = "friend") {
  return `Hello, ${name}!`;
}

const greetExpression = function (name = "friend") {
  return `Hello, ${name}!`;
};

const greetArrow = (name = "friend") => {
  return `Hello, ${name}!`;
};

// square
function squareDeclaration(n) {
  return n * n;
}

const squareExpression = function (n) {
  return n * n;
};

const squareArrow = (n) => {
  return n * n;
};

// sumArray — note the loop style differs per version on purpose:
// the same result can be written several ways.
function sumArrayDeclaration(numbers) {
  let total = 0;
  for (const n of numbers) {
    total += n;
  }
  return total;
}

const sumArrayExpression = function (numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
};

const sumArrayArrow = (numbers) => {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total = total + numbers[i];
  }
  return total;
};

// celsiusToFahrenheit
function celsiusToFahrenheitDeclaration(celsius) {
  return (celsius * 9) / 5 + 32;
}

const celsiusToFahrenheitExpression = function (celsius) {
  return (celsius * 9) / 5 + 32;
};

const celsiusToFahrenheitArrow = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

// ---- Part 1 verification ----

console.assert(greetDeclaration("Ana") === "Hello, Ana!", "greetDeclaration('Ana')");
console.assert(greetDeclaration() === "Hello, friend!", "greetDeclaration() uses default");
console.assert(greetExpression("Ana") === "Hello, Ana!", "greetExpression('Ana')");
console.assert(greetExpression() === "Hello, friend!", "greetExpression() uses default");
console.assert(greetArrow("Ana") === "Hello, Ana!", "greetArrow('Ana')");
console.assert(greetArrow() === "Hello, friend!", "greetArrow() uses default");

console.assert(squareDeclaration(5) === 25, "squareDeclaration(5)");
console.assert(squareExpression(-3) === 9, "squareExpression(-3)");
console.assert(squareArrow(0) === 0, "squareArrow(0)");

console.assert(sumArrayDeclaration([1, 2, 3, 4]) === 10, "sumArrayDeclaration");
console.assert(sumArrayExpression([]) === 0, "sumArrayExpression([])");
console.assert(sumArrayArrow([5, -2, 7]) === 10, "sumArrayArrow");

console.assert(celsiusToFahrenheitDeclaration(0) === 32, "celsiusToFahrenheitDeclaration(0)");
console.assert(celsiusToFahrenheitExpression(100) === 212, "celsiusToFahrenheitExpression(100)");
console.assert(celsiusToFahrenheitArrow(-40) === -40, "celsiusToFahrenheitArrow(-40)");
