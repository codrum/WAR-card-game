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
	 * Creates a deck, shuffles it, deals cards to 2 players
	 */
	constructor() {
		const deck = new Deck()
		deck.shuffle()
		const cards = deck.deal()
		const firstDeck = cards.deckOne
		const secondDeck = cards.deckTwo
		this.playerOne = new Player('Cody', firstDeck)
		this.playerTwo = new Player('Smitherson', secondDeck)
		this.#roundCount = 0
		this.#drawCount = 0
		this.#pot = []
	}

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

	viewPlayers() {
		console.log(`Player one: ${this.playerOne.name}`)
		console.log(`Player two: ${this.playerTwo.name}`)
	}

	#addCardsToPot(playerOneCard, playerTwoCard) {
		this.#pot.push(playerOneCard)
		this.#pot.push(playerTwoCard)
		this.playerOne.isDraw()
		this.playerTwo.isDraw()
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
			? this.playerTwo.lose()
			: this.playerOne.lose()
	}

	#winner() {
		if (this.playerOne.deck.length === 0) {
			console.log(`${this.playerTwo.name} wins!`)
		} else {
			console.log(`${this.playerOne.name} wins!`)
		}
		console.log(
			`This match only took ${this.#roundCount} rounds with ${
				this.#drawCount
			} draws!`
		)
	}
}
