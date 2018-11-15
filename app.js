/*
GAME RULES:
- Player must guess number between a min and max value
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of correct answer if they lose
- Let player choose to play again
*/

// Game Values
let   min = 1,
      max = 10,
      winningNum = 2,
      guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess (submit button)
guessBtn.addEventListener('click', function() { 
   // console.log(guessInput.value);
      //in our console, this prints as a string, but we want a number; so first thing we need to do is parse it as a number so we can compare this guess-input-value to the min and max values
   let guess = parseInt(guessInput.value);
   
   // Validate Input
      // we want to make sure that it's not less than the min or higher than max
      // usually we would check if guess = '';, but since we're parsing it as in integer it should be NAN; so if we, console.log(guess);, we get NaN
   if (isNaN(guess) || guess < min || guess > max) {
      setMessage(`Please enter a number between ${min} and ${max}`, 'red');
   }

   //Check If Won
   if (guess === winningNum) {
      // Game Over => Won
      gameOver(true, `${winningNum} is correct. You guessed correctly!`);
   } else {
      // Wrong Number
      guessesLeft -= 1;
         // same thing as below
         // guessesLeft = guessesLeft - 1;
         // if the user guesses wrong, take a guess away
      
      // Check to see if any guesses left
      if (guessesLeft === 0) {
         // Game Over => Lost
         gameOver(false, `Hey loser, the correct number was ${winningNum}.  Better luck next time!`);
      } else {
         // Game Continutes => Answer Incorrect

         // Change Border Color
         guessInput.style.borderColor = 'red';

         //Clear Input
         guessInput.value = '';

         // Notify User of Wrong Guess and Guesses remaining
         setMessage(`${guess} is not correct, silly!  You have ${guessesLeft} guesses remaining.`, 'red');
      }
   }
});

function gameOver(won, msg){
   let color;
   won === true ? color = 'green' : color = 'red';
   
   // Disable Input
   guessInput.disabled = true;
   // Change Border Color
   guessInput.style.borderColor = color;
   // Set Text Color
   message.style.color = color;
   // Set Message
   setMessage(msg);
}

//Set Message
function setMessage(msg, color) {
   message.style.color = color;
   message.textContent = msg;
}