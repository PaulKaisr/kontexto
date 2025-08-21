<template>
  <v-app class="d-flex flex-column">
    <v-main class="flex-grow-1">
      <RouterView />
    </v-main>

    <AppFooter class="flex-shrink-0" />

    <!-- Cookie Consent Banner -->
    <CookieConsent />

    <!-- Speed Insights (only in production) -->
    <SpeedInsights />
  </v-app>
</template>

<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import CookieConsent from "@/components/CookieConsent.vue";
import { SpeedInsights } from "@vercel/speed-insights/vue";
import { RouterView } from "vue-router";
</script>
