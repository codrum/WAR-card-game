export class Player {
	/**
	 * Creates a player
	 * @param {string} name The player's name
	 * @param {Card[]} deck The Cards in this player's deck
	 */
	constructor(name, deck) {
		this.name = name
		this.deck = deck
		this.points = 0
	}

	/**
	 * Prints each card in this instance's deck
	 */
	viewDeck() {
		for (let card of this.deck) {
			console.log(card)
		}
	}

	/**
	 * Plays the top card in the deck
	 * @returns the fist card in the player's deck
	 */
	playCard() {
		return this.deck[0]
	}

	/**
	 * Removes the top card in the player's deck
	 */
	removeCard() {
		this.deck.shift()
	}

	/**
	 * Moves played card to bottom of deck and adds opponent's card to deck
	 * @param {Card} card
	 */
	win(card) {
		const firstCard = this.deck[0]
		this.deck.shift()
		this.deck.push(firstCard)
		this.deck.push(card)
		this.#addPoint()
	}

	/**
	 * Adds pot of cards to player's deck
	 * @param {Card[]} pot The pot of Cards
	 */
	winDraw(pot) {
		for (let card of pot) {
			this.deck.push(card)
		}
	}

	/**
	 * Adds a point to the player
	 */
	#addPoint() {
		this.points++
	}
}
