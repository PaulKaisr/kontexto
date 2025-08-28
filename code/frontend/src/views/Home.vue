<template>
  <!-- Skip link for accessibility -->
  <a href="#main-content" class="skip-link"> Zum Hauptinhalt springen </a>

  <!-- Main game content -->
  <main id="main-content">
    <Game />
  </main>

  <SEOContent />
</template>

<script setup lang="ts">
import Game from "@/components/Game.vue";
import SEOContent from "@/components/SEOContent.vue";
</script>
