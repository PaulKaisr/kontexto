import {defineStore} from 'pinia'
import {getMostRecentGame, getSimilarityByGameIdAndWord} from '@/services/supabase'
import type {Game} from '@/types/game'
import type {Similarity} from '@/types/similarity'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentGuess: '',
    recentGame: null as Game | null,
    pastGuesses: [] as { guess: string, similarity: Similarity | null }[],
    numHints: 0 // Added number of hints
  }),
  persist: true,
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
        // Always sort by similarity rank ascending (lowest rank = best)
        this.pastGuesses.sort((a, b) => {
          if (!a.similarity || a.similarity.similarity == null) return 1;
          if (!b.similarity || b.similarity.similarity == null) return -1;
          return a.similarity.similarity - b.similarity.similarity;
        })
        this.currentGuess = ''
      }
    },
    resetStore() {
      this.currentGuess = ''
      this.recentGame = null
      this.pastGuesses = []
      this.numHints = 0
    },
  }
})
