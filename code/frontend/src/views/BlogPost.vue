<template>
  <v-container class="pa-0" fluid>
    <!-- Loading state -->
    <div v-if="loading" class="d-flex justify-center align-center" style="min-height: 60vh">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <!-- Post not found -->
    <v-container v-else-if="!post" class="text-center py-16">
      <v-card class="mx-auto" max-width="500" variant="outlined">
        <v-card-text class="pa-8">
          <v-icon color="warning" size="64" class="mb-4">mdi-file-document-remove</v-icon>
          <h1 class="text-h4 mb-4">Blog-Artikel nicht gefunden</h1>
          <p class="text-body-1 text-medium-emphasis mb-6">
            Der gesuchte Artikel existiert nicht oder wurde verschoben.
          </p>
          <v-btn :to="{ name: 'blog' }" color="primary" variant="outlined" size="large">
            Zurück zum Blog
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>

    <!-- Blog post content -->
    <div v-else>
      <!-- Header Section -->
      <v-card class="mb-8" flat>
        <v-card-text class="pa-8">
          <v-btn
            :to="{ name: 'blog' }"
            color="primary"
            variant="text"
            size="small"
            prepend-icon="mdi-arrow-left"
            class="mb-6"
          >
            Zurück zum Blog
          </v-btn>

          <!-- Category chip -->
          <v-chip
            :color="getCategoryColor(post.category.slug)"
            size="small"
            class="mb-4"
            :prepend-icon="post.category.icon"
          >
            {{ post.category.name }}
          </v-chip>

          <!-- Post title -->
          <h1 class="text-h3 font-weight-bold text-primary mb-4">
            {{ post.title }}
          </h1>

          <!-- Post meta information -->
          <div class="d-flex flex-wrap align-center ga-4 text-body-2 text-medium-emphasis mb-4">
            <div class="d-flex align-center ga-1">
              <v-icon size="small">mdi-calendar</v-icon>
              {{ post.date }}
            </div>
            <v-divider vertical length="16" />
            <div class="d-flex align-center ga-1">
              <v-icon size="small">mdi-clock-outline</v-icon>
              {{ post.readTime }}
            </div>
            <v-divider vertical length="16" />
            <div class="d-flex align-center ga-1">
              <v-icon size="small">mdi-account</v-icon>
              {{ post.author }}
            </div>
          </div>

          <!-- Post excerpt -->
          <p class="text-h6 text-medium-emphasis font-weight-regular">
            {{ post.excerpt }}
          </p>

          <!-- Tags -->
          <div v-if="post.tags.length" class="mt-4">
            <v-chip
              v-for="tag in post.tags"
              :key="tag"
              size="small"
              variant="outlined"
              color="secondary"
              class="me-2 mb-2"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <!-- Main content -->
      <v-container class="max-w-4xl mx-auto">
        <v-row justify="center">
          <v-col cols="12" lg="8">
            <v-card variant="text">
              <v-card-text class="pa-6">
                <!-- Blog post content -->
                <div class="blog-content" v-html="formattedContent"></div>

                <!-- Share buttons -->
                <v-divider class="my-8" />

                <div class="text-center">
                  <h3 class="text-h6 mb-4">Artikel teilen</h3>
                  <div class="d-flex justify-center flex-wrap ga-2">
                    <v-btn
                      color="primary"
                      variant="outlined"
                      size="small"
                      @click="shareArticle"
                      prepend-icon="mdi-share"
                    >
                      Link kopieren
                    </v-btn>
                    <v-btn
                      color="blue"
                      variant="outlined"
                      size="small"
                      @click="shareToTwitter"
                      prepend-icon="mdi-twitter"
                    >
                      Twitter
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Sidebar -->
          <v-col cols="12" lg="4">
            <div class="sticky-top">
              <!-- Related posts -->
              <v-card variant="outlined" class="mb-6">
                <v-card-title class="text-h6 pa-4">
                  <v-icon class="me-2">mdi-book-open-variant</v-icon>
                  Weitere Artikel
                </v-card-title>
                <v-card-text class="pa-0">
                  <v-list>
                    <v-list-item
                      v-for="relatedPost in relatedPosts"
                      :key="relatedPost.id"
                      :to="{ name: 'blog-post', params: { slug: relatedPost.slug } }"
                      class="px-4 py-3"
                    >
                      <v-list-item-title class="text-wrap text-body-2 font-weight-medium">
                        {{ relatedPost.title }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ relatedPost.date }} • {{ relatedPost.readTime }}
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>

              <!-- Back to game CTA -->
              <v-card variant="flat" color="primary">
                <v-card-text class="text-center pa-6 text-white">
                  <v-icon size="48" class="mb-3">mdi-gamepad-variant</v-icon>
                  <h3 class="text-h6 mb-2">Bereit für das nächste Rätsel?</h3>
                  <p class="text-body-2 mb-4 text-white text-medium-emphasis">
                    Wende deine neuen Strategien direkt an!
                  </p>
                  <v-btn :to="{ name: 'home' }" color="white" variant="flat" size="large" block>
                    Jetzt spielen
                  </v-btn>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { getBlogPost, getRecentPosts } from "@/services/blog";
import type { BlogPost } from "@/types/blog";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const route = useRoute();

const loading = ref(true);
const post = ref<BlogPost | null>(null);
const copySuccess = ref(false);

const relatedPosts = computed(() => {
  if (!post.value) return [];
  return getRecentPosts(4)
    .filter((p) => p.id !== post.value!.id)
    .slice(0, 3);
});

// Configure marked with basic options
marked.setOptions({
  gfm: true,
  breaks: false,
});

const formattedContent = computed(() => {
  if (!post.value?.content) return "";

  try {
    // Parse markdown content
    const rawHtml = marked(post.value.content);
    
    // Add Vuetify classes to HTML elements
    let styledHtml = rawHtml as string;
    
    // Add classes to headings
    styledHtml = styledHtml
      .replace(/<h1>/g, '<h1 class="text-h4 font-weight-bold text-primary mb-4 mt-8">')
      .replace(/<h2>/g, '<h2 class="text-h5 font-weight-bold text-primary mb-3 mt-6">')
      .replace(/<h3>/g, '<h3 class="text-h6 font-weight-bold text-primary mb-2 mt-4">')
      .replace(/<h4>/g, '<h4 class="text-h6 font-weight-medium text-primary mb-2 mt-3">')
      .replace(/<h5>/g, '<h5 class="text-subtitle-1 font-weight-medium text-primary mb-2 mt-2">')
      .replace(/<h6>/g, '<h6 class="text-subtitle-2 font-weight-medium text-primary mb-1 mt-2">');
    
    // Add classes to paragraphs and lists
    styledHtml = styledHtml
      .replace(/<p>/g, '<p class="mb-4">')
      .replace(/<ul>/g, '<ul class="mb-4">')
      .replace(/<ol>/g, '<ol class="mb-4">')
      .replace(/<li>/g, '<li class="mb-1">');
    
    // Sanitize HTML to prevent XSS
    const sanitizedHtml = DOMPurify.sanitize(styledHtml, {
      ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br'],
      ALLOWED_ATTR: ['class', 'href', 'target', 'rel'],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
      ADD_ATTR: ['target'],
      ADD_DATA_URI_TAGS: []
    });
    
    return sanitizedHtml;
  } catch (error) {
    console.error('Error parsing markdown content:', error);
    return '<p class="text-error">Fehler beim Laden des Inhalts</p>';
  }
});

const loadPost = async () => {
  loading.value = true;
  const slug = route.params.slug as string;

  try {
    const blogPost = getBlogPost(slug);

    if (blogPost) {
      post.value = blogPost;

      // Update meta tags dynamically
      document.title = `${blogPost.title} | Kontexto Blog`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", blogPost.metaDescription);
      }
    } else {
      post.value = null;
    }
  } catch (error) {
    console.error("Error loading blog post:", error);
    post.value = null;
  } finally {
    loading.value = false;
  }
};

const getCategoryColor = (slug: string) => {
  const colors: Record<string, string> = {
    strategien: "success",
    technologie: "info",
    updates: "warning",
    community: "secondary",
  };
  return colors[slug] || "primary";
};

const shareArticle = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copySuccess.value = true;
    setTimeout(() => (copySuccess.value = false), 2000);
  } catch (error) {
    console.error("Could not copy to clipboard:", error);
  }
};

const shareToTwitter = () => {
  if (!post.value) return;
  const text = `${post.value.title} - ${post.value.excerpt}`;
  const url = window.location.href;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(twitterUrl, "_blank");
};

// Watch for route changes
watch(() => route.params.slug, loadPost, { immediate: false });

onMounted(() => {
  loadPost();
});
</script>

<style scoped>
.sticky-top {
  position: sticky;
  top: 2rem;
}

:deep(.blog-content) {
  line-height: 1.7;
}

:deep(.blog-content h1),
:deep(.blog-content h2),
:deep(.blog-content h3) {
  scroll-margin-top: 2rem;
}

:deep(.blog-content ul) {
  padding-left: 1.5rem;
}

:deep(.blog-content li) {
  list-style-type: disc;
}

:deep(.blog-content p:last-child) {
  margin-bottom: 0;
}
</style>
