<template>
  <v-footer border class="text-center">
    <v-container class="py-6">
      <!-- Navigation Links organized in groups -->
      <v-row justify="center" align="center" class="mb-4">
        <!-- Game Links -->
        <v-col cols="12" md="auto" class="d-flex justify-center flex-wrap ga-2">
          <v-btn
            v-for="link in gameLinks"
            :key="link.name"
            :to="link.route"
            color="primary"
            variant="text"
            rounded="xl"
            size="small"
          >
            {{ link.name }}
          </v-btn>
        </v-col>

        <!-- Divider for larger screens -->
        <v-col cols="auto" class="d-none d-md-flex">
          <v-divider vertical length="20" />
        </v-col>

        <!-- Information Links -->
        <v-col cols="12" md="auto" class="d-flex justify-center flex-wrap ga-2">
          <v-btn
            v-for="link in infoLinks"
            :key="link.name"
            :to="link.route"
            color="secondary"
            variant="text"
            rounded="xl"
            size="small"
          >
            {{ link.name }}
          </v-btn>
        </v-col>

        <!-- Divider for larger screens -->
        <v-col cols="auto" class="d-none d-md-flex">
          <v-divider vertical length="20" />
        </v-col>

        <!-- Legal Links -->
        <v-col cols="12" md="auto" class="d-flex justify-center flex-wrap ga-2">
          <v-btn
            v-for="link in legalLinks"
            :key="link.name"
            :to="link.route"
            color="secondary"
            variant="text"
            rounded="xl"
            size="small"
          >
            {{ link.name }}
          </v-btn>
        </v-col>
      </v-row>

      <!-- SEO-friendly footer text -->
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <v-card variant="text" color="transparent">
            <v-card-text class="text-caption text-medium-emphasis py-2">
              <p class="mb-1">
                Kontexto - Das kostenlose deutsche Wortspiel mit KI-basierter Ähnlichkeit
              </p>
              <p class="mb-0">
                Täglich neue Rätsel • Komplett auf Deutsch • Für alle Geräte optimiert
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
