<template>
  <v-container class="py-10">
    <v-row align="center" justify="center" class="width-100">
      <v-col cols="12">
        <v-card class="pa-6 rounded-xl elevation-5">
          <template v-if="movie">
            <v-card-title class="text-h4 font-weight-bold text-center mb-6">
              {{ movie.title }}
            </v-card-title>

            <v-row align="end" justify="space-between" class="mb-6">
              <v-col cols="auto">
                <v-img
                  v-if="movie.picture"
                  :src="movie.picture"
                  :alt="movie.title"
                  width="150"
                  height="150"
                  class="rounded"
                  cover
                  lazy-src="placeholder.jpg"
                />
              </v-col>

              <v-col cols="12" md="8" class="text-md-right">
                <h2 class="text-h6 font-weight-bold mb-8">{{ movie.genre }}</h2>
                <h2 class="text-h6 font-weight-bold mb-8">
                  {{ movie.author.firstName }} {{ movie.author.lastName }}
                </h2>
                <h2 class="text-h6 font-weight-bold mb-8">
                  {{ new Date(movie.releaseDate).toLocaleDateString() }}
                </h2>
              </v-col>
            </v-row>

            <v-card-text>
              <h2 class="text-h6 font-weight-bold mb-3">Description</h2>
              <p class="text-body-1 text-grey-darken-1 mb-4">
                {{ movie.description }}
              </p>

              <div class="mt-8">
                <div class="d-flex align-center justify-space-between mb-4">
                  <h2 class="text-h6 font-weight-bold">Commentaires</h2>

                  <v-btn color="primary" @click="showDialog = true">
                    Ajouter un commentaire
                  </v-btn>
                </div>

                <v-row
                  v-if="loadingComments"
                  align="center"
                  justify="center"
                  class="py-6"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="40"
                  />
                </v-row>

                <v-list v-else-if="comments.length">
                  <v-list-item
                    v-for="comment in comments"
                    :key="comment.id"
                    class="mb-4 border-b pb-2"
                  >
                    <v-list-item-content>
                         <v-list-item-title
                        class="font-weight-medium text-primary"
                      >
                        {{ comment.username }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        class="d-flex justify-space-between align-center"
                      >
                        <span>{{ comment.text }}</span>
                        <span class="text-warning font-weight-bold">
                          {{ comment.rating }}/10 ⭐
                        </span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>

                <p v-else class="text-grey text-center">
                  Aucun commentaire pour ce film.
                </p>
              </div>
            </v-card-text>
          </template>

          <template v-else-if="uiStore.isLoading">
            <v-row align="center" justify="center" class="py-12">
              <v-progress-circular indeterminate color="primary" size="50" />
            </v-row>
          </template>

          <template v-else>
            <v-card-text class="text-center py-12 text-grey-darken-1">
              Movie not found...
            </v-card-text>
          </template>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDialog" max-width="500">
      <v-card class="pa-4">
        <v-card-title class="text-h6 font-weight-bold">
          Ajouter un commentaire
        </v-card-title>

        <v-card-text>
          <v-text-field
            label="Votre nom"
            v-model="newComment.username"
            outlined
            dense
            class="mb-3"
          />
          <v-textarea
            label="Votre commentaire"
            v-model="newComment.text"
            outlined
            rows="4"
            dense
          />
          <v-text-field
            label="Votre note (0-10)"
            v-model.number="newComment.rating"
            type="number"
            min="0"
            max="10"
            outlined
            dense
            class="mb-3"
          />
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text color="grey" @click="showDialog = false">Annuler</v-btn>
          <v-btn color="primary" @click="submitComment">Publier</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useMoviesStore } from "@/lib/stores/useMoviesStore";
import { useUiStore } from "@/lib/stores/uiStore";
import { fetchComments, postComment } from "@/lib/api/moviesService";
import { useToast } from "vue-toastification";
import type { Movie, Comment } from "@/types/movie";

const toast = useToast();
const route = useRoute();
const moviesStore = useMoviesStore();
const uiStore = useUiStore();

const movie = ref<Movie | null>(null);
const comments = ref<Comment[]>([]);
const loadingComments = ref(false);
const showDialog = ref(false);

const newComment = ref({
  username: "",
  text: "",
  rating: 0,
});

onMounted(async () => {
  const id = Number(route.params.id);
  uiStore.isBusy();

  if (moviesStore.movies.length === 0) {
    await moviesStore.loadMovies();
  }

  movie.value = moviesStore.fetchMovieDetails(id) ?? null;
  uiStore.isIdle();

  try {
    loadingComments.value = true;
    comments.value = await fetchComments(id);
  } catch (error) {
    console.error("Error fetching comments:", error);
  } finally {
    loadingComments.value = false;
  }
});

async function submitComment() {
  if (
    !newComment.value.username ||
    !newComment.value.text ||
    !newComment.value.rating
  )
    return;

  try {
    await postComment(movie.value.id, newComment.value);
    comments.value.unshift({ ...newComment.value as Comment, id: Date.now() });
    console.log("Comment posted successfully:", newComment.value);
 
    toast.success("Comment posted successfully!");
  } catch (error) {
    console.error("Error posting comment:", error);
    toast.error("Failed to post comment.");
  }

  newComment.value = { username: "", text: "", rating: 0 };
  showDialog.value = false;
}
</script>
