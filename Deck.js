import { Card } from './Card.js'
import { cards, suits } from './cards.js'

export class Deck {
	constructor() {
		this.cards = []
		for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
			for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
				this.cards.push(
					new Card(
						cards[cardIndex].type,
						cards[cardIndex].value,
						suits[suitIndex]
					)
				)
			}
		}
	}

	/**
	 * Deals 2 sets of 26 cards
	 */
	deal() {
		let deckOne = []
		let deckTwo = []
		for (let i = 0; i < this.cards.length; i++) {
			if (i % 2 === 0) {
				deckOne.push(this.cards[i])
			} else {
				deckTwo.push(this.cards[i])
			}
		}
		return { deckOne, deckTwo }
	}

	// getRandomCard() {
	// 	let randomIndex = Math.floor(Math.random() * this.discs.length) // generate random index between 0-51
	// 	return this.cards[randomIndex]
	// }

	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * i)
			let temp = this.cards[i]
			this.cards[i] = this.cards[j]
			this.cards[j] = temp
		}
	}

	viewCards() {
		for (let card of this.cards) {
			card.view()
		}
		console.log(this.cards.length)
	}
}
