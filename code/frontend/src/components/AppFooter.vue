<template>
  <v-footer border class="text-center d-flex flex-column py-4">
    <!-- Navigation Links organized in groups -->
    <div class="flex flex-col md:flex-row gap-4 justify-center items-center">
      <!-- Game Links -->
      <div class="flex flex-wrap justify-center gap-2">
        <v-btn
          v-for="link in gameLinks"
          :key="link.name"
          :to="link.route"
          color="primary"
          variant="text"
          class="mx-1"
          rounded="xl"
          size="small"
        >
          {{ link.name }}
        </v-btn>
      </div>

      <!-- Divider for larger screens -->
      <v-divider class="hidden md:block" vertical length="20" />

      <!-- Information Links -->
      <div class="flex flex-wrap justify-center gap-2">
        <v-btn
          v-for="link in infoLinks"
          :key="link.name"
          :to="link.route"
          color="secondary"
          variant="text"
          class="mx-1"
          rounded="xl"
          size="small"
        >
          {{ link.name }}
        </v-btn>
      </div>

      <!-- Divider for larger screens -->
      <v-divider class="hidden md:block" vertical length="20" />

      <!-- Legal Links -->
      <div class="flex flex-wrap justify-center gap-2">
        <v-btn
          v-for="link in legalLinks"
          :key="link.name"
          :to="link.route"
          color="secondary"
          variant="text"
          class="mx-1"
          rounded="xl"
          size="small"
        >
          {{ link.name }}
        </v-btn>
      </div>
    </div>

    <!-- SEO-friendly footer text -->
    <div class="text-xs text-gray-500 mt-4 px-4">
      <p class="mb-1">Kontexto - Das kostenlose deutsche Wortspiel mit KI-basierter Ähnlichkeit</p>
      <p>Täglich neue Rätsel • Komplett auf Deutsch • Für alle Geräte optimiert</p>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
// Game-related links
const gameLinks = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Spieltipps",
    route: "/spieltipps",
  },
];

// Information and help links
const infoLinks = [
  {
    name: "Blog",
    route: "/blog",
  },
  {
    name: "Über Kontexto",
    route: "/about",
  },
  {
    name: "FAQ",
    route: "/faq",
  },
];

// Legal and compliance links
const legalLinks = [
  {
    name: "Datenschutz",
    route: "/data-protection",
  },
  {
    name: "Nutzungsbedingungen",
    route: "/terms-of-service",
  },
  {
    name: "Kontakt",
    route: "/contact",
  },
];
</script>
