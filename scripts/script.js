"use strict";

// elements
const secretCodeEl = document.getElementById('secret-code');
const messageEl = document.getElementById('message');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const inputEl = document.getElementById('input');
const checkBtn = document.getElementById('check');
const gameAction = document.getElementById('game-action');

//variables
let secretCode;
let gameActionValue = 1;
let highScore = 0;
let score;
let eventListenerFlag=0;

//functions
const game = () => {
  


  //game definition
  messageEl.innerText = 'Start guessing...✌';
  scoreEl.innerText = '10';
  score = 10;
  secretCode = Math.floor(Math.random() * 20) + 1;
  // secretCode = 4;
  let check = () => {
    let inputValue = Number(inputEl.value);
    
    if (score > 0 && (inputValue > 0)) {
      if (Number(inputEl.value) > secretCode) {
        messageEl.innerText = "you're too high!";
        score--;
        

      } else if (inputValue < secretCode) {
        messageEl.innerText = "you're too low!";
        score--;
        secretCodeEl.innerText = '?';
        
      } else if (inputValue == secretCode) {
        //while user wins
        messageEl.innerText = "congratulations!✨";
        checkBtn.removeEventListener('click', check);
        eventListenerFlag=0;
        document.getElementById('game-action').innerText = 'Restart Game';
        secretCodeEl.textContent = secretCode;
        document.querySelector('#score-plate').style.background = 'rgb(0, 255, 0)';
        document.querySelector('#score-plate').classList.remove('main-circle-glow');
        document.querySelector('#score-plate').classList.add('main-circle-glow-success');
        //stopping line animation
        document.querySelector('.line-bottom').classList.remove('line-bottom-animation');
        document.querySelector('.line-top').classList.remove('line-top-animation');
        gameActionValue = 2;
        if (score > highScore) {
          highScore = score;
          highScoreEl.innerText = highScore;
        }
      }
      scoreEl.innerText = score;
    }else{
    
      messageEl.innerText = 'Invalid Input!⛔'
    }


    if (score === 0) {
      //while chances or score is 0
      messageEl.innerText = "chance's up😡";
      document.getElementById('score-plate').style.background = 'red';
      checkBtn.removeEventListener('click', check);
      eventListenerFlag=0;
      secretCodeEl.innerText = secretCode;
      document.getElementById('score-plate').classList.remove('main-circle-glow');
      //stopping line animation
      document.querySelector('.line-bottom').classList.remove('line-bottom-animation');
      document.querySelector('.line-top').classList.remove('line-top-animation');
    }

    inputEl.value = '';
  }
  if(eventListenerFlag===0){
    checkBtn.addEventListener('click', check);
    eventListenerFlag=1;
  }
  
  


}



const init = () => {
  //ending game
  // game ending loading effect
  if (gameActionValue === 0) {
    document.querySelector('.score-plate').classList.remove('main-circle-glow');
    document.querySelector('.score-plate').classList.remove('main-circle-glow-success');
    document.querySelector('.score-plate').classList.add('end-game-score-plate');
    document.querySelector('.score-plate').style.cssText = "width:5rem;height:5rem;font-size:1rem";
    document.querySelector('#score-plate').style.background = 'aqua';




    // removing classes and displaying game attributes as none
    setTimeout(function () {

      document.querySelector('.score-plate').classList.remove('end-game-score-plate');

      document.querySelector('.circle').style.border = '1px black solid';
      document.getElementById('game-rule').style.display = 'none';
      document.getElementById('scores').style.display = 'none';
      document.getElementById('input-plate').style.display = 'none';
      document.getElementById('game-action').innerText = 'Start Game';

      document.querySelector('.score-plate').classList.remove('main-circle-glow');
      document.querySelector('.line-top').classList.remove('line-top-animation');
      document.querySelector('.line-bottom').classList.remove('line-bottom-animation');
      // window.location.reload();
      //
    }, 1000)




    gameActionValue = 1;
  }
  else if (gameActionValue === 1) {
    //starting game
    // game loading effect 
    document.querySelector('.score-plate').style.cssText = "width:12rem;height:12rem;font-size:3rem";
    document.querySelector('.score-plate').classList.add('start-game-score-plate');
    secretCodeEl.innerText = '?';
    // displaying game attributes after game loading effect
    setTimeout(function () {

      document.querySelector('.circle').style.border = 'none';
      document.querySelector('.score-plate').classList.remove('start-game-score-plate');
      document.getElementById('game-rule').style.display = 'block';
      document.getElementById('scores').style.display = 'flex';
      document.getElementById('input-plate').style.display = 'flex';
      document.getElementById('game-action').innerText = 'End Game';

      document.querySelector('.score-plate').classList.add('main-circle-glow');
      document.querySelector('.line-top').classList.add('line-top-animation');
      document.querySelector('.line-bottom').classList.add('line-bottom-animation');


    }, 1000)

    gameActionValue = 0;
    game();
  }
  else if (gameActionValue === 2) {
    //restarting game
    secretCodeEl.innerText = '?';
    document.getElementById('game-action').innerText = 'End Game';
    document.querySelector('.score-plate').classList.remove('main-circle-glow-success');
    document.querySelector('.score-plate').classList.add('main-circle-glow');
    document.querySelector('#score-plate').style.background = 'aqua';
    //starting line animation

    document.querySelector('.line-top').classList.add('line-top-animation');
    document.querySelector('.line-bottom').classList.add('line-bottom-animation');

    gameActionValue = 0;
    game();
  }

}



gameAction.addEventListener('click', init);

