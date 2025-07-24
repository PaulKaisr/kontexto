import {defineStore} from 'pinia'
import {getMostRecentGame, getSimilarityByGameIdAndWord} from '@/services/supabase'
import type {Game} from '@/types/game'
import type {Similarity} from '@/types/similarity'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentGuess: '',
    recentGame: null as Game | null,
    pastGuesses: [] as { guess: string, similarity: Similarity | null }[]
  }),
  actions: {
    async fetchAndSetRecentGame() {
      const game = await getMostRecentGame()
      // Only reset if the fetched game is different from the current one
      if (game && (!this.recentGame || game.game_id !== this.recentGame.game_id)) {
        this.resetStore()
        this.recentGame = game
      }
    },
    async submitGuess() {
      if (this.recentGame && this.currentGuess) {
        const similarity = await getSimilarityByGameIdAndWord(
          this.recentGame.game_id,
          this.currentGuess
        )
        this.pastGuesses.push({guess: this.currentGuess, similarity})
        this.currentGuess = ''
      }
    },
    resetStore() {
      this.currentGuess = ''
      this.recentGame = null
      this.pastGuesses = []
    },
  }
})
