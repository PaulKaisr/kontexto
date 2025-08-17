import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/generated-sources/database.types.ts";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Retrieves the game for today's date from the 'game' table.
 * Returns an object with 'game_id' and 'date' fields, or null if not found.
 */
export async function getMostRecentGame() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const { data, error } = await supabase
    .from("game")
    .select("game_id, date")
    .eq("date", today)
    .single();

  if (error) {
    console.error("Error fetching today's game:", error);
    return null;
  }
  return data;
}

/**
 * Fetches a similarity entry by game_id and word from the 'similarity' table.
 * Checks both capitalized and non-capitalized versions and returns the best (lowest rank) result.
 * Returns an object with the similarity data and the actual word that achieved the best match, or null if not found.
 */
export async function getSimilarityByGameIdAndWord(
  gameId: number,
  word: string
) {
  const lowercaseWord = word.toLowerCase();
  const capitalizedWord =
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  // Create array of unique words to check (avoid duplicate queries if word is already lowercase)
  const wordsToCheck =
    lowercaseWord === capitalizedWord
      ? [lowercaseWord]
      : [lowercaseWord, capitalizedWord];

  const { data, error } = await supabase
    .from("similarity")
    .select("*")
    .eq("game_id", gameId)
    .in("word", wordsToCheck);

  if (error) {
    console.error("Error fetching similarity:", error);
    return null;
  }

  // If no results found, return null
  if (!data || data.length === 0) {
    return null;
  }

  // Find the result with the best (lowest) similarity value (highest rank)
  const bestMatch = data.reduce((best, current) => {
    if (current.similarity === null) return best;
    if (best.similarity === null) return current;
    return current.similarity < best.similarity ? current : best;
  });

  // Return both the similarity data and the word that achieved the best match
  return {
    ...bestMatch,
    matchedWord: bestMatch.word // Explicitly include the word that got the best match
  };
}

/**
 * Fetches the word at a given rank for a game.
 * @param gameId The current game id
 * @param rank The rank to fetch
 * @returns The similarity row or null
 */
export async function getHintForGame(gameId: number, rank: number) {
  const { data, error } = await supabase
    .from("similarity")
    .select("word, similarity")
    .eq("game_id", gameId)
    .order("similarity", { ascending: true })
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
  const { data, error } = await supabase
    .from("similarity")
    .select("word, similarity")
    .eq("game_id", gameId)
    .order("similarity", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Error fetching top words:", error);
    return null;
  }

  // Add rank numbers (1-based)
  return (
    data?.map((item, index) => ({
      word: item.word,
      similarity: item.similarity,
      rank: index + 1,
    })) || []
  );
}

/**
 * Fetches all games from the database up to today's date, ordered by date (newest first).
 * @returns Array of games with their IDs and dates, excluding future games
 */
export async function getAllGames() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const { data, error } = await supabase
    .from("game")
    .select("game_id, date")
    .lte("date", today)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching all games:", error);
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
  const { data, error } = await supabase
    .from("game")
    .select("game_id, date")
    .eq("game_id", gameId)
    .single();

  if (error) {
    console.error("Error fetching game by ID:", error);
    return null;
  }

  return data;
}
