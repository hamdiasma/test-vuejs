<template>
  <v-container class="py-10">
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="8">
        <h1 class="text-h3 font-weight-bold text-center mb-6">
          Outils et technologies utilisées
        </h1>
        <p class="text-body-1 text-center text-grey-darken-1 mb-8">
          Voici un aperçu des principaux outils et technologies que j'utilise
          dans mes projets.
        </p>
      </v-col>
    </v-row>

    <v-row dense>
      <v-col cols="12" md="4" v-for="tool in tools" :key="tool.name">
        <v-card class="pa-4 rounded-xl elevation-3 text-center">
          <v-img
            :src="tool.logo"
            :alt="tool.name"
            max-width="100"
            max-height="100"
            class="mx-auto mb-4"
          />
          <h3 class="text-h6 font-weight-bold mb-2">{{ tool.name }}</h3>
          <p class="text-body-2 text-grey-darken-1">{{ tool.description }}</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const tools = [
  {
    name: "Vue 3",
    description:
      "Framework moderne pour construire des interfaces web réactives.",
  },
  {
    name: "Vuetify",
    description:
      "Bibliothèque de composants UI pour Vue 3 avec design Material.",
  },
  {
    name: "Vue Toastification",
    description:
      "Bibliothèque de notifications toast pour Vue.js, facile à utiliser et personnalisable.",
  },
  {
    name: "Pinia",
    description: "State management moderne pour Vue 3, simple et puissant.",
  },
  {
    name: "Axios",
    description: "Client HTTP pour faire des requêtes vers votre API.",
  },
  {
    name: "Vue Router",
    description: "Gestion de la navigation et des routes pour vos SPA Vue.",
  },
  {
    name: "TypeScript",
    description: "Superset de JavaScript qui ajoute le typage statique.",
  },
  {
    name: "Vite",
    description: "Outil de build rapide et moderne pour les projets Vue.",
  },
];
</script>
