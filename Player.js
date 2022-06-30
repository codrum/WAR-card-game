export class Player {
	constructor(name, deck) {
		this.name = name
		this.deck = deck
		this.points = 0
	}

	viewDeck() {
		for (let card of this.deck) {
			console.log(card)
		}
	}

	playCard() {
		return this.deck[0]
	}

	lose() {
		this.deck.shift()
	}

	win(card) {
		const firstCard = this.deck[0]
		this.deck.shift()
		this.deck.push(firstCard)
		this.deck.push(card)
		this.addPoint()
	}

	isDraw() {
		this.deck.shift()
	}

	winDraw(cards) {
		// console.log(cards)
		for (let card of cards) {
			this.deck.push(card)
		}
	}

	addPoint() {
		this.points++
	}
}
