/**
 * Berechnet die Füllung und Farbe eines Balkens basierend auf einem Ähnlichkeitsrang.
 * - Rang 1: 100% Füllung, Erfolgsfarbe (grün)
 * - Rang 1000: ~33% Füllung
 * - Rang 300: ~72% Füllung
 *
 * @param rank Der Ähnlichkeitsrang (muss größer oder gleich 1 sein).
 * @returns { width: number, color: string }
 */
export const calculateBarFill = (rank: number): number => {
  // Stellen Sie sicher, dass der Rang mindestens 1 ist, um unerwartetes Verhalten zu vermeiden
  if (rank < 1) {
    rank = 1;
  }
  const k = 0.0011;

  // Die Funktion: F(R) = 100 * e^(-k * (R-1))
  const fillPercentage = 100 * Math.exp(-k * (rank - 1));
  return Math.max(1, fillPercentage);
};
