import type { BlogCategory, BlogPost } from "@/types/blog";
import { blogCategories } from "@/types/blog";

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "profi-strategien-kontexto-meister",
    title: "10 Profi-Strategien für Kontexto-Meister",
    excerpt:
      "Entdecken Sie bewährte Techniken und Strategien, um Ihre Kontexto-Fähigkeiten zu verbessern und schwierige Wörter schneller zu erraten.",
    content: `
# 10 Profi-Strategien für Kontexto-Meister

Willkommen zu unserem umfassenden Leitfaden für fortgeschrittene Kontexto-Strategien! Nach Monaten der Analyse von Spielerdaten und Experteninterviews haben wir die effektivsten Techniken zusammengestellt, um Ihr Spiel auf die nächste Stufe zu heben.

## 1. Die Wortfeld-Strategie

Beginnen Sie mit grundlegenden Wörtern aus verschiedenen semantischen Feldern. Anstatt zufällig zu raten, etablieren Sie systematisch verschiedene Themenbereiche:

- **Emotionen**: Freude, Trauer, Wut
- **Farben**: Rot, Blau, Grün  
- **Tätigkeiten**: Laufen, Schreiben, Denken
- **Objekte**: Tisch, Auto, Buch

Diese Methode hilft Ihnen, schnell herauszufinden, in welche Richtung das gesuchte Wort geht.

## 2. Der Synonym-Kreis

Sobald Sie ein Wort mit guter Ähnlichkeit (Rang unter 1000) gefunden haben, denken Sie an alle Synonyme:

- **Beispiel**: Wenn "schnell" Rang 500 hat, probieren Sie "rasch", "flott", "zügig"
- **Tipp**: Nutzen Sie sowohl formelle als auch umgangssprachliche Varianten

## 3. Wortarten systematisch durchgehen

Das Lösungswort kann jede Wortart sein. Probieren Sie systematisch:

- **Substantive**: Konkrete und abstrakte Begriffe
- **Verben**: In Grundform und verschiedenen Zeiten
- **Adjektive**: Beschreibende Eigenschaften
- **Adverbien**: Häufig übersehen, aber oft die Lösung!

## 4. Die Kontext-Erweiterung

Wenn Sie ein ähnliches Wort gefunden haben, denken Sie an:
- **Wo** kommt dieses Wort vor?
- **Womit** wird es häufig verwendet?
- **Welche Situation** beschreibt es?

## 5. Fremdwörter und Fachbegriffe

Viele Spieler vergessen, dass das Lösungswort auch ein:
- **Fremdwort** sein kann (Restaurant, Computer)
- **Fachbegriff** aus einem bestimmten Bereich
- **Zusammengesetztes Wort** (sehr häufig im Deutschen!)

## 6. Die Häufigkeits-Regel

FastText bevorzugt häufige Wörter. Das Lösungswort ist meist:
- Ein alltägliches Wort
- Kein sehr seltener oder veralteter Begriff
- Oft ein Wort aus den 1000 häufigsten deutschen Wörtern

## 7. Emotionale und abstrakte Begriffe

Unterschätzen Sie nicht abstrakte Konzepte:
- **Gefühle**: Liebe, Angst, Hoffnung
- **Konzepte**: Freiheit, Zeit, Raum
- **Zustände**: Müdigkeit, Gesundheit, Stress

## 8. Die Gegenteil-Technik

Wenn Sie ein ähnliches Wort haben, probieren Sie auch das Gegenteil:
- Groß → Klein
- Hell → Dunkel
- Schnell → Langsam

Manchmal sind Antonyme semantisch sehr nah beieinander!

## 9. Regionale und kulturelle Begriffe

Denken Sie an:
- **Regionalismen**: Brötchen, Semmel, Schrippe
- **Kulturelle Begriffe**: Oktoberfest, Kindergarten
- **Deutsche Spezialitäten**: Schadenfreude, Fernweh

## 10. Die Statistik nutzen

Beobachten Sie das Spielverhalten:
- **Welche Ränge** haben Ihre bisherigen Wörter?
- **Gibt es Muster** in den Ähnlichkeiten?
- **Welche Bereiche** haben Sie noch nicht abgedeckt?

## Bonus-Tipp: Geduld und Systematik

Der wichtigste Ratschlag: Bleiben Sie systematisch! Viele Spieler geben zu früh auf oder raten wild durcheinander. Ein methodisches Vorgehen führt fast immer zum Erfolg.

## Fazit

Mit diesen Strategien werden Sie nicht nur bessere Ergebnisse erzielen, sondern auch mehr Spaß am Spiel haben. Kontexto belohnt logisches Denken und Sprachgefühl – zwei Fähigkeiten, die sich mit der Zeit stark verbessern lassen.

Viel Erfolg bei Ihrem nächsten Kontexto-Rätsel! 🎯

---

*Haben Sie eigene Strategien entwickelt? Teilen Sie sie mit der Community in den Kommentaren!*
    `,
    date: "12. März 2024",
    readTime: "8 Min. Lesezeit",
    gradientClass: "from-green-400 to-blue-500",
    category: blogCategories[0], // Strategien
    author: "Kontexto Team",
    tags: ["Strategien", "Tipps", "Fortgeschritten"],
    metaDescription:
      "Lernen Sie die 10 besten Profi-Strategien für Kontexto kennen. Von der Wortfeld-Strategie bis zur Systematik - so werden Sie zum Kontexto-Meister.",
    featured: true,
  },
  {
    id: 2,
    slug: "neue-features-statistiken-erfolge",
    title: "Neue Features: Statistiken und Erfolge",
    excerpt:
      "Erfahren Sie mehr über die neuesten Funktionen in Kontexto, einschließlich detaillierter Spielstatistiken und Erfolgssystem.",
    content: `
# Neue Features: Statistiken und Erfolge

Wir freuen uns, Ihnen die neuesten Funktionen in Kontexto vorstellen zu können! Diese Updates wurden basierend auf Ihrem Feedback entwickelt und sollen Ihr Spielerlebnis noch spannender machen.

## 🏆 Das neue Erfolgssystem

Ab sofort können Sie verschiedene Erfolge freischalten:

### Streak-Erfolge
- **Wochenend-Warrior**: 7 Tage in Folge gespielt
- **Monats-Meister**: 30 Tage Streak erreicht
- **Jahrhundert-Champion**: 100 Tage Streak (für die wahren Profis!)

### Geschwindigkeits-Erfolge  
- **Blitzschnell**: Rätsel in unter 5 Versuchen gelöst
- **Gedankenleser**: Rätsel beim ersten Versuch gelöst
- **Effizienz-Experte**: 10 Rätsel ohne Hinweise gelöst

## 📊 Erweiterte Statistiken

Die neue Statistik-Seite zeigt Ihnen:

- **Durchschnittliche Versuche** pro Rätsel
- **Beste und schlechteste Kategorien**
- **Zeitliche Entwicklung** Ihrer Fähigkeiten
- **Vergleich** mit anderen Spielern (anonym)

## 🎨 Visuelle Verbesserungen

- Neue **Farb-Codierung** für bessere Erkennbarkeit
- **Animationen** bei erfolgreichen Lösungen
- **Dark Mode** für entspanntes Spielen am Abend

*Weitere Features sind bereits in Entwicklung. Bleiben Sie gespannt!*
    `,
    date: "8. August 2025",
    readTime: "4 Min. Lesezeit",
    gradientClass: "from-purple-400 to-pink-500",
    category: blogCategories[2], // Updates
    author: "Entwickler-Team",
    tags: ["Updates", "Features", "Statistiken"],
    metaDescription:
      "Entdecken Sie die neuesten Kontexto-Features: Erfolgssystem, erweiterte Statistiken und visuelle Verbesserungen.",
    featured: false,
  },
  {
    id: 3,
    slug: "fasttext-deutsche-sprache",
    title: "Wie FastText die deutsche Sprache versteht",
    excerpt:
      "Ein technischer Einblick in die KI-Technologie hinter Kontexto und wie semantische Ähnlichkeit berechnet wird.",
    content: `
# Wie FastText die deutsche Sprache versteht

Haben Sie sich jemals gefragt, wie Kontexto die Ähnlichkeit zwischen Wörtern berechnet? In diesem Artikel werfen wir einen Blick hinter die Kulissen der Technologie, die unser Spiel antreibt.

## Was ist FastText?

FastText ist eine von Facebook (Meta) entwickelte Bibliothek für maschinelles Lernen, die speziell für die Verarbeitung natürlicher Sprache entwickelt wurde.

### Die Grundlagen
- **Wort-Embeddings**: Wörter werden als mathematische Vektoren dargestellt
- **Semantische Nähe**: Ähnliche Wörter haben ähnliche Vektoren
- **Kontinuierliches Lernen**: Das Modell wurde mit Millionen deutschen Texten trainiert

## Wie funktioniert die Ähnlichkeitsberechnung?

1. **Vektor-Extraktion**: Jedes Wort wird in einen 300-dimensionalen Vektor umgewandelt
2. **Kosinus-Ähnlichkeit**: Die Ähnlichkeit wird über den Kosinus-Winkel berechnet
3. **Ranking**: Alle ~55.000 Wörter werden nach Ähnlichkeit sortiert

## Interessante Eigenschaften

- **Synonyme** haben sehr hohe Ähnlichkeitswerte
- **Gegensätze** können überraschend ähnlich sein
- **Zusammengesetzte Wörter** werden clever erkannt

*Technische Details und weitere Einblicke folgen in zukünftigen Artikeln.*
    `,
    date: "28. August 2025",
    readTime: "6 Min. Lesezeit",
    gradientClass: "from-orange-400 to-red-500",
    category: blogCategories[1], // Technologie
    author: "Entwicklerteam",
    tags: ["Technologie", "KI", "FastText", "NLP"],
    metaDescription:
      "Verstehen Sie die Technologie hinter Kontexto: Wie FastText Wort-Embeddings und semantische Ähnlichkeit für deutsche Sprache berechnet.",
    featured: false,
  },
];

// Blog service functions
export const getBlogPosts = (): BlogPost[] => {
  return blogPosts;
};

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured);
};

export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter((post) => post.category.slug === categorySlug);
};

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getCategoryStats = (): Array<{ category: BlogCategory; count: number }> => {
  return blogCategories.map((category) => ({
    category,
    count: blogPosts.filter((post) => post.category.id === category.id).length,
  }));
};
