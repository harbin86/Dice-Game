/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, previousDice, gamePlaying;
var diceDOM = document.getElementById('dice-1');
var diceDOM2 = document.getElementById('dice-2');

init();

document.querySelector('.btn-roll').addEventListener('click',function(){

	if(gamePlaying){
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';

		diceDOM2.style.display = 'block';
		diceDOM2.src = 'dice-' + dice2 + '.png';

		/*if(dice === 5 && previousDice === 5){
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
			nextPlayer();
		}
		else*/ 

		if(dice !== 1 && dice2 !== 1) {
			previousDice = dice;
			//Add score
			roundScore += dice + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		}
		else{
			//go to next player
			nextPlayer();
		}

	}
});

document.querySelector('.btn-hold').addEventListener('click',function(){

	if(gamePlaying){
		//add current score to global score
		scores[activePlayer] += roundScore;

		var input = document.querySelector('.final-score').value;
		var winningScore;

		//update global score UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		if(input){
			winningScore = input;
		}
		else{
			winningScore = 100;
		}
		//check if player has won
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			diceDOM.style.display = 'none';
			diceDOM2.style.display = 'none';
			gamePlaying = false;
		}	
		else{
			//go to next player
			nextPlayer();
		}
	}	
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	gamePlaying = true;
	scores = [0,0];
	roundScore = 0;
	previousDice = 0;
	activePlayer = 0;

	document.getElementById('score-0').textContent = roundScore;
	document.getElementById('score-1').textContent = roundScore;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	resetCurrentScore();
}

function nextPlayer(){
		//Next Player's turn
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		previousDice = 0;
		
		//Adding and removing css active class indicating Player's turn
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		//Reset current scores and set dice display to none
		roundScore = 0;
		resetCurrentScore();
}

function resetCurrentScore(){
	
	//Reset current scores	
	document.getElementById('current-0').textContent = roundScore;
	document.getElementById('current-1').textContent = roundScore;
	//Set dice display to none
	diceDOM.style.display = 'none';
	diceDOM2.style.display = 'none';
}