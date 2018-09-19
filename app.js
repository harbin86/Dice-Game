/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore = 0, activePlayer;
var diceDOM = document.querySelector('.dice');

init();

document.querySelector('.btn-roll').addEventListener('click',function(){

	var dice = Math.floor(Math.random() * 6) + 1;
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';

	if(dice !== 1) {
		//Add score
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	}
	else{
		//go to next player
		nextPlayer();
	}
});

document.querySelector('.btn-hold').addEventListener('click',function(){

	//add current score to global score
	scores[activePlayer] += roundScore;

	//update global score UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
	//check if player has won
	if (scores[activePlayer] >= 100) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	}	
	else{
		//go to next player
		nextPlayer();
	}
	
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	activePlayer = 0;

	document.getElementById('score-0').textContent = roundScore;
	document.getElementById('score-1').textContent = roundScore;
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.getElementById('name-0').classList.remove('winner');
	document.getElementById('name-1').classList.remove('winner');
	document.getElementById('name-0').classList.remove('active');
	document.getElementById('name-1').classList.remove('active');
	document.getElementById('name-0').classList.add('active');
	resetCurrentScore();
}

function nextPlayer(){
		//Next Player's turn
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		

		//Adding and removing css active class indicating Player's turn
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		//Reset current scores and set dice display to none
		resetCurrentScore();
}

function resetCurrentScore(){
	
	//Reset current scores
	roundScore = 0;
	document.getElementById('current-0').textContent = roundScore;
	document.getElementById('current-1').textContent = roundScore;
	//Set dice display to none
	diceDOM.style.display = 'none';
}