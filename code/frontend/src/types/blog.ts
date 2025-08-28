export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  gradientClass: string;
  category: BlogCategory;
  author: string;
  tags: string[];
  metaDescription: string;
  featured: boolean;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 1,
    name: "Strategien",
    slug: "strategien",
    description: "Tips und Tricks für bessere Ergebnisse",
    icon: "🎯",
  },
  {
    id: 2,
    name: "Technologie",
    slug: "technologie",
    description: "Wie KI und NLP Kontexto antreiben",
    icon: "🤖",
  },
  {
    id: 3,
    name: "Updates",
    slug: "updates",
    description: "Neue Features und Verbesserungen",
    icon: "📈",
  },
  {
    id: 4,
    name: "Community",
    slug: "community",
    description: "Spieler-Geschichten und Highlights",
    icon: "🌟",
  },
];
