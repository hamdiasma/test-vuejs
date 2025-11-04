<template>
  <v-container>
    <!-- Titre de la page -->
    <v-row class="mb-4">
      <v-col>
        <h1 class="text-center">Liste des films</h1>
      </v-col>
    </v-row>

    <!-- Table des films -->
    <v-data-table
      :headers="headers"
      :items="moviesStore.movies"
      :items-per-page="5"
      v-model:page="page"
      class="elevation-1"
      :items-per-page-options="[5, 10, 20]"
    >
      <!-- Date de sortie formatée -->
      <template #item.releaseDate="{ item }">
        {{ new Date(item.releaseDate).toLocaleDateString() }}
      </template>

      <!-- Auteur -->
      <template #item.author="{ item }">
        {{ item.author.firstName }} {{ item.author.lastName }}
      </template>

      <!-- Bouton Voir détails -->
      <template #item.actions="{ item }">
        <v-btn color="primary" @click="viewMovieDetails(item.id)">
          Voir détails
        </v-btn>
      </template>

      <!-- Pagination -->
      <template #footer.page-text="{ pageStart, pageStop, itemsLength }">
        {{ pageStart }}-{{ pageStop }} sur {{ itemsLength }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMoviesStore } from "@/lib/stores/useMoviesStore";

const moviesStore = useMoviesStore();
const router = useRouter();
const page = ref(1);

// Headers de la table avec colonne pour le bouton
const headers = [
  { title: "Titre", key: "title" },
  { title: "Date de sortie", key: "releaseDate" },
  { title: "Genre", key: "genre" },
  { title: "Auteur", key: "author" },
  { title: "Actions", key: "actions" },
];

// Charger les films
onMounted(async() => {
  if (moviesStore.movies.length === 0) {
    await moviesStore.loadMovies();
  }
});

// Redirection vers la page détails du film
const viewMovieDetails = (id: number) => {
  router.push({ name: "MovieDetails", params: { id } });
};
</script>
