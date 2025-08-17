<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import AppFooter from "@/components/AppFooter.vue";
</script>
