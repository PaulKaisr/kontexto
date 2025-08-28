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
      <v-card
        v-if="featuredPost"
        class="mb-8"
        color="primary"
        variant="flat"
        rounded="lg"
        :to="{ name: 'blog-post', params: { slug: featuredPost.slug } }"
        hover
      >
        <v-card-text class="pa-8 text-white">
          <div class="d-flex align-center mb-4">
            <v-chip color="white" text-color="primary" size="small" class="mr-3">
              Hauptartikel
            </v-chip>
            <span class="text-body-2 text-white text-medium-emphasis">
              {{ featuredPost.date }}
            </span>
          </div>

          <h2 class="text-h4 font-weight-bold mb-4">
            {{ featuredPost.title }}
          </h2>

          <p class="text-h6 text-white text-medium-emphasis mb-6 line-height-1-6">
            {{ featuredPost.excerpt }}
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
          <v-col
            v-for="article in recentArticles"
            :key="article.id"
            cols="12"
            md="6"
            lg="4"
          >
            <v-card
              class="h-100"
              variant="outlined"
              rounded="lg"
              hover
              :to="{ name: 'blog-post', params: { slug: article.slug } }"
            >
              <div class="h-48 bg-gradient-to-br" :class="article.gradientClass"></div>

              <v-card-text class="pa-6">
                <div class="d-flex align-center text-caption text-medium-emphasis mb-3">
                  <v-chip
                    :color="getCategoryColor(article.category.slug)"
                    size="x-small"
                    class="me-2"
                  >
                    {{ article.category.name }}
                  </v-chip>
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

                <div class="d-flex align-center justify-space-between">
                  <v-btn color="primary" variant="text" size="small" append-icon="mdi-arrow-right">
                    Artikel lesen
                  </v-btn>
                  <span class="text-caption text-medium-emphasis">von {{ article.author }}</span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Categories Section -->
      <section class="mb-12">
        <h2 class="text-h4 font-weight-bold text-primary mb-6">Kategorien</h2>

        <v-row>
          <v-col
            v-for="categoryInfo in categoryStats"
            :key="categoryInfo.category.id"
            cols="12"
            sm="6"
            lg="3"
          >
            <v-card class="text-center pa-6 h-100" variant="outlined" rounded="lg" hover>
              <div class="text-h2 mb-3">{{ categoryInfo.category.icon }}</div>

              <h3 class="text-h6 font-weight-bold mb-2">
                {{ categoryInfo.category.name }}
              </h3>

              <p class="text-body-2 text-medium-emphasis mb-3">
                {{ categoryInfo.category.description }}
              </p>

              <v-chip
                :color="getCategoryColor(categoryInfo.category.slug)"
                size="small"
                variant="text"
              >
                {{ categoryInfo.count }} Artikel
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getBlogPosts, getFeaturedPosts, getCategoryStats } from '@/services/blog';

// Get blog data from service
const allPosts = getBlogPosts();
const featuredPosts = getFeaturedPosts();
const categoryStats = getCategoryStats();

// Use featured post if available, otherwise first post
const featuredPost = computed(() => {
  return featuredPosts.length > 0 ? featuredPosts[0] : (allPosts.length > 0 ? allPosts[0] : null);
});

// Get recent articles (excluding featured post)
const recentArticles = computed(() => {
  const featuredId = featuredPost.value?.id;
  return allPosts
    .filter(post => post.id !== featuredId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
});

// Helper function to get category colors
const getCategoryColor = (slug: string) => {
  const colors: Record<string, string> = {
    'strategien': 'success',
    'technologie': 'info',
    'updates': 'warning',
    'community': 'secondary'
  };
  return colors[slug] || 'primary';
};
</script>