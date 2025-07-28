import {createClient} from '@supabase/supabase-js'
import type {Database} from "@/generated-sources/database.types.ts";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

/**
 * Retrieves the most recent game object from the 'game' table.
 * Returns an object with 'id' and 'date' fields, or null if not found.
 */
export async function getMostRecentGame() {
  const {data, error} = await supabase
    .from('game')
    .select('game_id, date')
    .order('date', {ascending: false})
    .limit(1)
    .single()

  if (error) {
    console.error('Error fetching most recent game:', error);
    return null;
  }
  return data;
}

/**
 * Fetches a similarity entry by game_id and word from the 'similarity' table.
 * Returns the entry or null if not found.
 */
export async function getSimilarityByGameIdAndWord(gameId: number, word: string) {
  const {data, error} = await supabase
    .from('similarity')
    .select('*')
    .eq('game_id', gameId)
    .eq('word', word)
    .single();

  if (error) {
    console.error('Error fetching similarity:', error);
    return null;
  }
  return data;
}

/**
 * Retrieves a hint for the current game based on the user's guess history.
 * Logic:
 * 1. If no guess has similarity <= 300, return the word at rank 300.
 * 2. If user has a guess < 300, halve the best rank and return the word at that rank (not already guessed).
 * 3. If user has rank 1, return the next closest word not already guessed.
 */
export async function getHintForGame(gameId: number, guesses: {
  guess: string,
  similarity: { similarity: number | null, word: string | null } | null
}[]) {
  // Collect guessed words and best similarity
  const guessedWords = new Set(guesses.map(g => g.guess.toLowerCase()));
  const bestSimilarity = Math.min(...guesses.map(g => g.similarity?.similarity ?? Infinity));

  // Helper to fetch word at a given rank (skipping guessed words)
  async function fetchWordAtRank(rank: number) {
    const {data, error} = await supabase
      .from('similarity')
      .select('word, similarity')
      .eq('game_id', gameId)
      .order('similarity', {ascending: true})
      .range(rank - 1, rank - 1)
      .single();
    if (error || !data || !data.word || guessedWords.has(data.word.toLowerCase())) {
      // If already guessed, try next rank
      const {data: nextData, error: nextError} = await supabase
        .from('similarity')
        .select('word, similarity')
        .eq('game_id', gameId)
        .order('similarity', {ascending: true})
        .range(rank, rank)
        .single();
      if (nextError || !nextData || !nextData.word || guessedWords.has(nextData.word.toLowerCase())) {
        return null;
      }
      return nextData;
    }
    return data;
  }

  // 1. No guess <= 300
  if (bestSimilarity > 300) {
    return await fetchWordAtRank(300);
  }

  // 2. Best guess < 300, halve the best rank
  if (bestSimilarity > 1) {
    const nextRank = Math.max(1, Math.floor(bestSimilarity / 2));
    return await fetchWordAtRank(nextRank);
  }

  // 3. Already have rank 1, get next closest not guessed
  // Find the next best similarity not guessed
  let offset = 2;
  while (true) {
    const {data, error} = await supabase
      .from('similarity')
      .select('word, similarity')
      .eq('game_id', gameId)
      .order('similarity', {ascending: true})
      .range(offset - 1, offset - 1)
      .single();
    if (error || !data || !data.word) return null;
    if (!guessedWords.has(data.word.toLowerCase())) return data;
    offset++;
    if (offset > 1000) return null; // Prevent infinite loop
  }
}
