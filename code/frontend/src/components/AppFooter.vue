<script setup lang="ts">
const links = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Datenschutz",
    route: "/legal",
  },
  {
    name: "Impressum",
    route: "/impressum",
  },
];
</script>

<template>
  <v-footer border class="text-center d-flex flex-column">
    <div>
      <v-btn
        v-for="link in links"
        :key="link.name"
        :to="link.route"
        color="secondary"
        variant="text"
        class="mx-2"
        rounded="xl"
        size="small"
      >
        {{ link.name }}
      </v-btn>
    </div>
  </v-footer>
</template>

<style scoped>
/* Add any custom footer styles here if needed */
</style>
