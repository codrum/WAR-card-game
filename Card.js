export class Card {
	/**
	 * Creates a Card
	 * @param {string} type The face of the card
	 * @param {number} value The numeric value of the card
	 * @param {string} suit The suit of the card
	 */
	constructor(type, value, suit) {
		this.type = type
		this.value = value
		this.suit = suit
	}

	/**
	 * Prints the attributes of this Card
	 */
	view() {
		console.log(`${this.type} of ${this.suit}s, value: ${this.value}`)
	}
}
