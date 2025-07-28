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
