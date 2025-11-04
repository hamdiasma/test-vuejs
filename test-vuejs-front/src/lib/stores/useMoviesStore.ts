import { defineStore } from "pinia";
import { fetchMovies } from "@/lib/api/moviesService";
import { ref } from "vue";
import type { Movie } from "@/types/movie";

export const useMoviesStore = defineStore("moviesStore", () => {
  const movies = ref<Movie[]>([]);

  const loadMovies = async () => {
    movies.value = await fetchMovies();
  };

  const fetchMovieDetails = (id: string | number): Movie | undefined => {
    return movies.value.find(
      (movie: Movie) => movie.id.toString() === id.toString()
    );
  };

  return {
    movies,
    loadMovies,
    fetchMovieDetails,
  };
});
