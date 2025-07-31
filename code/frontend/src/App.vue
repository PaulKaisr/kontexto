<template>
  <v-app>
    <Analytics/>
    <v-main>
      <Game/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Game from "@/components/Game.vue";
import {Analytics} from "@vercel/analytics/next"
</script>
