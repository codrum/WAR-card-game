export class Card {
	constructor(type, value, suit) {
		this.type = type
		this.value = value
		this.suit = suit
	}

	view() {
		console.log(`${this.type} of ${this.suit}s, value: ${this.value}`)
	}
}
