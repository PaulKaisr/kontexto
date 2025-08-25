<template>
  <v-app class="d-flex flex-column">
    <v-main class="flex-grow-1">
      <RouterView />
    </v-main>

    <AppFooter class="flex-shrink-0" />

    <!-- Cookie Consent Banner (lazy loaded) -->
    <Suspense>
      <CookieConsent />
    </Suspense>

    <!-- Speed Insights (only in production, lazy loaded) -->
    <Suspense v-if="isProduction">
      <SpeedInsights />
    </Suspense>
  </v-app>
</template>

<script setup lang="ts">
import AppFooter from "@/components/AppFooter.vue";
import { RouterView } from "vue-router";
import { computed, defineAsyncComponent } from "vue";

// Lazy load non-critical components to improve FCP
const CookieConsent = defineAsyncComponent(() => import("@/components/CookieConsent.vue"));
const SpeedInsights = defineAsyncComponent(() => import("@vercel/speed-insights/vue").then(m => ({ default: m.SpeedInsights })));

const isProduction = computed(() => import.meta.env.PROD);
</script>
