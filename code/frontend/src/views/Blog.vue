<template>
  <v-container class="pa-0" fluid>
    <!-- Header Section -->
    <v-card class="mb-8" flat>
      <v-card-text class="pa-8">
        <v-btn
          :to="{ name: 'home' }"
          color="primary"
          variant="text"
          size="small"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Zurück zum Spiel
        </v-btn>

        <h1 class="text-h3 font-weight-bold text-primary mb-2">Kontexto Blog</h1>
        <p class="text-h6 text-medium-emphasis">
          Neueste Updates, Strategien und Wortspiel-Insights
        </p>
      </v-card-text>
    </v-card>

    <v-container class="max-w-6xl mx-auto">
      <!-- Featured Article -->
      <v-card class="mb-8" color="primary" variant="flat" rounded="lg">
        <v-card-text class="pa-8 text-white">
          <div class="d-flex align-center mb-4">
            <v-chip color="white" text-color="primary" size="small" class="mr-3">
              Hauptartikel
            </v-chip>
            <span class="text-body-2 text-white text-medium-emphasis"> 15. März 2024 </span>
          </div>

          <h2 class="text-h4 font-weight-bold mb-4">
            Die Psychologie des Wortratens: Wie KI unser Sprachverständnis revolutioniert
          </h2>

          <p class="text-h6 text-white text-medium-emphasis mb-6 line-height-1-6">
            Entdecken Sie, wie moderne KI-Technologie das Verständnis der deutschen Sprache
            revolutioniert und wie Kontexto diese Fortschritte nutzt, um ein einzigartiges
            Spielerlebnis zu schaffen.
          </p>

          <v-btn
            color="white"
            variant="flat"
            size="large"
            rounded="lg"
            append-icon="mdi-arrow-right"
          >
            Weiterlesen
          </v-btn>
        </v-card-text>
      </v-card>

      <!-- Recent Articles Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">Aktuelle Artikel</h2>

        <v-row>
          <v-col v-for="article in recentArticles" :key="article.id" cols="12" md="6" lg="4">
            <v-card class="h-100" variant="outlined" rounded="lg" hover>
              <div class="h-48 bg-gradient-to-br" :class="article.gradientClass"></div>

              <v-card-text class="pa-6">
                <div class="d-flex align-center text-caption text-medium-emphasis mb-3">
                  <span>{{ article.date }}</span>
                  <v-divider vertical class="mx-2" length="12"></v-divider>
                  <span>{{ article.readTime }}</span>
                </div>

                <h3 class="text-h6 font-weight-bold mb-3">
                  {{ article.title }}
                </h3>

                <p class="text-body-2 text-medium-emphasis mb-4 line-height-1-6">
                  {{ article.excerpt }}
                </p>

                <v-btn color="primary" variant="text" size="small" append-icon="mdi-arrow-right">
                  Artikel lesen
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Categories Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">Kategorien</h2>

        <v-row>
          <v-col v-for="category in categories" :key="category.id" cols="12" sm="6" lg="3">
            <v-card class="text-center pa-6 h-100" variant="outlined" rounded="lg" hover>
              <div class="text-h2 mb-3">{{ category.icon }}</div>

              <h3 class="text-h6 font-weight-bold mb-2">
                {{ category.name }}
              </h3>

              <p class="text-body-2 text-medium-emphasis mb-3">
                {{ category.description }}
              </p>

              <v-chip color="primary" size="small" variant="text">
                {{ category.articleCount }} Artikel
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  gradientClass: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  articleCount: number;
}

const recentArticles: Article[] = [
  {
    id: 1,
    title: "10 Profi-Strategien für Kontexto-Meister",
    excerpt:
      "Entdecken Sie bewährte Techniken und Strategien, um Ihre Kontexto-Fähigkeiten zu verbessern und schwierige Wörter schneller zu erraten.",
    date: "12. März 2024",
    readTime: "5 Min. Lesezeit",
    gradientClass: "from-green-400 to-blue-500",
  },
  {
    id: 2,
    title: "Neue Features: Statistiken und Erfolge",
    excerpt:
      "Erfahren Sie mehr über die neuesten Funktionen in Kontexto, einschließlich detaillierter Spielstatistiken und Erfolgssystem.",
    date: "8. März 2024",
    readTime: "3 Min. Lesezeit",
    gradientClass: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "Wie FastText die deutsche Sprache versteht",
    excerpt:
      "Ein technischer Einblick in die KI-Technologie hinter Kontexto und wie semantische Ähnlichkeit berechnet wird.",
    date: "5. März 2024",
    readTime: "7 Min. Lesezeit",
    gradientClass: "from-orange-400 to-red-500",
  },
];

const categories: Category[] = [
  {
    id: 1,
    name: "Strategien",
    description: "Tips und Tricks für bessere Ergebnisse",
    icon: "🎯",
    articleCount: 12,
  },
  {
    id: 2,
    name: "Technologie",
    description: "Wie KI und NLP Kontexto antreiben",
    icon: "🤖",
    articleCount: 8,
  },
  {
    id: 3,
    name: "Updates",
    description: "Neue Features und Verbesserungen",
    icon: "📈",
    articleCount: 15,
  },
  {
    id: 4,
    name: "Community",
    description: "Spieler-Geschichten und Highlights",
    icon: "🌟",
    articleCount: 6,
  },
];
</script>
