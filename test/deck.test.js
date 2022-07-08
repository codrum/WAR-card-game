import { Deck } from '../Deck.js'
import { expect } from 'chai'

describe('Deck functions', () => {
	describe('shuffle', () => {
		it('should return a shuffled deck of cards', () => {
			const deck = new Deck()
			for (let i = 0; i < 10; i++) {
				// checks 10 times that shuffled deck is not the same as original
				let initialDeck = [...deck.cards]
				deck.shuffle()
				let shuffled = deck.cards
				expect(shuffled).to.not.be.equal(initialDeck)
			}
		})
	})
	describe('deal cards', () => {
		it('should return an object with two arrays of cards', () => {
			const deck = new Deck()

			const cards = deck.deal()

			for (let i = 0; i < cards.deckOne.length; i++) {
				// if(deckOne[i] === deckTwo[i])
				expect(cards.deckOne[i]).to.not.be.equal(cards.deckTwo[i])
			}
			expect(cards.deckOne.length).to.equal(26)
			expect(cards.deckTwo.length).to.equal(26)
		})
	})
})

// test triangulation
