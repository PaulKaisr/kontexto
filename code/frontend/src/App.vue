<template>
  <v-app class="d-flex flex-column">
    <v-main class="flex-grow-1">
      <RouterView />
    </v-main>

    <AppFooter class="flex-shrink-0" />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppFooter from "@/components/AppFooter.vue";
</script>
