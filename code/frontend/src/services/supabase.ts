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
 * Fetches the word at a given rank for a game.
 * @param gameId The current game id
 * @param rank The rank to fetch
 * @returns The similarity row or null
 */
export async function getHintForGame(gameId: number, rank: number) {
  const {data, error} = await supabase
    .from('similarity')
    .select('word, similarity')
    .eq('game_id', gameId)
    .order('similarity', {ascending: true})
    .range(rank - 1, rank - 1)
    .single();
  if (error || !data || !data.word) {
    return null;
  }
  return data;
}

/**
 * Fetches the top N closest words for a given game.
 * @param gameId The current game id
 * @param limit The number of top words to fetch (default: 500)
 * @returns Array of similarity rows with word and rank
 */
export async function getTopWordsByGame(gameId: number, limit: number = 500) {
  const {data, error} = await supabase
    .from('similarity')
    .select('word, similarity')
    .eq('game_id', gameId)
    .order('similarity', {ascending: true})
    .limit(limit);

  if (error) {
    console.error('Error fetching top words:', error);
    return null;
  }
  
  // Add rank numbers (1-based)
  return data?.map((item, index) => ({
    word: item.word,
    similarity: item.similarity,
    rank: index + 1
  })) || [];
}

/**
 * Fetches all games from the database ordered by date (newest first).
 * @returns Array of all games with their IDs and dates
 */
export async function getAllGames() {
  const {data, error} = await supabase
    .from('game')
    .select('game_id, date')
    .order('date', {ascending: false});

  if (error) {
    console.error('Error fetching all games:', error);
    return null;
  }
  
  return data || [];
}

/**
 * Fetches a specific game by ID.
 * @param gameId The game ID to fetch
 * @returns The game object or null if not found
 */
export async function getGameById(gameId: number) {
  const {data, error} = await supabase
    .from('game')
    .select('game_id, date')
    .eq('game_id', gameId)
    .single();

  if (error) {
    console.error('Error fetching game by ID:', error);
    return null;
  }
  
  return data;
}
