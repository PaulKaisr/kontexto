<script setup lang="ts">
const links = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Spieltipps",
    route: "/spieltipps",
  },
  {
    name: "Über Kontexto",
    route: "/about",
  },
  {
    name: "Datenschutz",
    route: "/data-protection",
  },
  {
    name: "Kontakt",
    route: "/contact",
  },
];
</script>

<template>
  <v-footer border class="text-center d-flex flex-column">
    <div class="flex flex-wrap justify-center">
      <v-btn
        v-for="link in links"
        :key="link.name"
        :to="link.route"
        color="secondary"
        variant="text"
        class="mx-2 my-1"
        rounded="xl"
        size="small"
      >
        {{ link.name }}
      </v-btn>
    </div>

    <!-- SEO-friendly footer text -->
    <div class="text-xs text-gray-500 mt-2 px-4">
      <p class="mb-1">
        Kontexto - Das kostenlose deutsche Wortspiel mit KI-basierter
        Ähnlichkeit
      </p>
      <p>
        Täglich neue Rätsel • Komplett auf Deutsch • Für alle Geräte optimiert
      </p>
    </div>
  </v-footer>
</template>

<style scoped></style>
