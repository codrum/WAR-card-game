import { Card } from './Card.js'
import { cards, suits } from './cards.js'
// const Card = require('./Card.js')

export class Deck {
	/**
	 * Creates an instance of this class
	 * Creates an array of 52 cards
	 */
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
	 * Creates two arrays of 26 cards dealt one at a time to each deck
	 * @returns two arrays of 26 cards
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

	/**
	 * shuffles the cards in the deck
	 */
	shuffle() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * i)
			let temp = this.cards[i]
			this.cards[i] = this.cards[j]
			this.cards[j] = temp
		}
	}
}
