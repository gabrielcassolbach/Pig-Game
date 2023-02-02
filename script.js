'use strict';

// Selecting Elements.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let scores, current_score, activePlayer, playing;

// Starting Conditions.
const init = function() {
    scores = [0, 0];
    current_score = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;  
    score1El.textContent = 0;
    current0El.textContent = 0; 
    current1El.textContent = 0;
    
    player0El.classList.remove('player--winner'); 
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    diceEl.classList.add('hidden'); 
    player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    current_score = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// Rolling Dice Functionality.
btnRoll.addEventListener('click', function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        if (dice !== 1) {
            current_score += dice;
            document.getElementById(`current--${activePlayer}`).textContent = current_score;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += current_score;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 20) {
            diceEl.classList.add('hidden');
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);