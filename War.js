import { Card } from './Card.js'
import { Deck } from './Deck.js'
import { Player } from './Player.js'

export class War {
	// private variables
	#pot
	#drawCount
	#roundCount

	/**
	 * Creates a new instance of this class.
	 * Creates a deck of cards and shuffles it.
	 * Creates two players and gives them 26 dealt cards each
	 */
	constructor() {
		const deck = new Deck()
		deck.shuffle()
		const cards = deck.deal()
		const firstDeck = cards.deckOne
		const secondDeck = cards.deckTwo
		const playerOneName = prompt('Player one name:')
		const playerTwoName = prompt('Player two name:')
		this.playerOne = new Player(playerOneName, firstDeck)
		this.playerTwo = new Player(playerTwoName, secondDeck)
		this.#roundCount = 0
		this.#drawCount = 0
		this.#pot = []
	}

	/**
	 * Cycles through players' decks top to bottom until someone runs out of cards.
	 * If a player pulls a card that has higher value than the other,
	 * the opponent's card is added to their deck
	 * If both cards are the same, those cards and their next cards are added to the pot
	 * until someone wins, where all cards in the pot go to the winner's deck.
	 */
	play() {
		let shouldAddFaceDownCard = false
		while (this.playerOne.deck.length && this.playerTwo.deck.length) {
			// loop until someone runs out of cards
			let playerOneCard = this.playerOne.playCard()
			let playerTwoCard = this.playerTwo.playCard()
			console.log({ playerOneCard, playerTwoCard })
			if (shouldAddFaceDownCard) {
				// if last turn was a draw, add a "face down" card to pot
				this.#addCardsToPot(playerOneCard, playerTwoCard)
				shouldAddFaceDownCard = false
			} else if (playerOneCard.value > playerTwoCard.value) {
				// handle player one won round
				this.#roundIsWon(this.playerOne, playerTwoCard)
			} else if (playerOneCard.value < playerTwoCard.value) {
				// handle player two won round
				this.#roundIsWon(this.playerTwo, playerOneCard)
			} else {
				// handle draw, next turn will be a facedown to the pot
				this.#addCardsToPot(playerOneCard, playerTwoCard)
				this.#drawCount++
				shouldAddFaceDownCard = true
			}
			this.#roundCount++
			console.log(this.playerOne.deck.length, this.playerTwo.deck.length)
		}
		this.#winner()
	}

	/**
	 * Displays the players of this instance
	 */
	viewPlayers() {
		console.log(`Player one: ${this.playerOne.name}`)
		console.log(`Player two: ${this.playerTwo.name}`)
	}

	/**
	 * Adds both players' cards to the pot (facedown after draw)
	 * @param {Card} playerOneCard Player one's card
	 * @param {Card} playerTwoCard Player two's card
	 */
	#addCardsToPot(playerOneCard, playerTwoCard) {
		this.#pot.push(playerOneCard)
		this.#pot.push(playerTwoCard)
		this.playerOne.removeCard()
		this.playerTwo.removeCard()
	}

	/**
	 * Handles a won round by a player.
	 * If cards are in the pot, player is awarded those cards
	 * @param {Player} player The Player that won the round
	 * @param {Card} oppCard the opponents card that is awarded
	 */
	#roundIsWon(player, oppCard) {
		if (this.#pot.length) {
			console.log(`${player.name} wins pot`)
			player.winDraw(this.#pot)
			this.#pot = []
		}
		player.win(oppCard)
		player === this.playerOne
			? this.playerTwo.removeCard()
			: this.playerOne.removeCard()
	}

	/**
	 * Prints the winner and statistics to the console
	 * Alerts the winner
	 */
	#winner() {
		console.log(
			`Player 1: ${this.playerOne.name} - ${this.playerOne.points} points`
		)
		console.log(
			`Player 2: ${this.playerTwo.name} - ${this.playerTwo.points} points`
		)
		if (this.playerOne.deck.length === 0) {
			console.log(`${this.playerTwo.name} wins!`)
			alert(
				`${this.playerTwo.name} wins! \nPlayer 1: ${this.playerOne.name} - ${this.playerOne.points} points\nPlayer 2: ${this.playerTwo.name} - ${this.playerTwo.points} points`
			)
		} else {
			console.log(`${this.playerOne.name} wins!`)
			alert(
				`${this.playerOne.name} wins! \nPlayer 1: ${this.playerOne.name} - ${this.playerOne.points} points\nPlayer 2: ${this.playerTwo.name} - ${this.playerTwo.points} points`
			)
		}
		console.log(
			`This match only took ${this.#roundCount} rounds with ${
				this.#drawCount
			} Wars!`
		)
		alert(
			`This match only took ${this.#roundCount} rounds with ${
				this.#drawCount
			} draws!`
		)
	}
}
