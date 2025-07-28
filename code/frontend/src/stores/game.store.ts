import {defineStore} from 'pinia'
import {getMostRecentGame, getSimilarityByGameIdAndWord} from '@/services/supabase'
import type {Game} from '@/types/game'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentGuess: '',
    recentGame: null as Game | null,
    pastGuesses: [] as { guess: string, similarity: number }[],
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
        this.pastGuesses.push({guess: this.currentGuess, similarity: similarity?.similarity!})
        this.currentGuess = ''
      }
    },
    resetStore() {
      this.currentGuess = ''
      this.recentGame = null
      this.pastGuesses = []
      this.numHints = 0
    },
    async getHint() {
      if (!this.recentGame) return;
      const guessedRanks = this.pastGuesses.map(g => g.similarity);
      const bestRank = guessedRanks.length > 0 ? Math.min(...guessedRanks) : Infinity;

      let nextHintRank: number;
      if (bestRank <= 1) {
        let candidate = 2;
        while (guessedRanks.includes(candidate)) candidate++;
        nextHintRank = candidate;
      } else if (bestRank <= 300) {
        let candidate = Math.max(2, Math.floor(bestRank / 2));
        while (guessedRanks.includes(candidate)) candidate++;
        nextHintRank = candidate;
      } else {
        let candidate = 300;
        while (guessedRanks.includes(candidate)) candidate++;
        nextHintRank = candidate;
      }

      const hint = await import('@/services/supabase').then(m => m.getHintForGame(this.recentGame!.game_id, nextHintRank));
      if (hint && hint.word) {
        this.pastGuesses.push({guess: hint.word, similarity: hint.similarity!});
        this.numHints++;
      }
    },
  },
  getters: {
    mostRecentGuess(state) {
      if (state.pastGuesses.length === 0) return null;
      return state.pastGuesses[state.pastGuesses.length - 1];
    }
  }
})
