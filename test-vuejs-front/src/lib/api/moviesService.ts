import agent from "./agent";
import type { Movie } from "@/types/movie";

export const fetchMovies = async (): Promise<Movie[]> => {
  const response = await agent.get("/movies");
   const data = response.data;
  
  const moviesArray = Array.isArray(data) ? data : [...Object.values(data)];
  return moviesArray as Movie[];
};

export const fetchComments = async (id: number): Promise<Comment> => {
  const response = await agent.get(`/comments/${id}`);
  return response.data;
};

export const postComment = async (movieId: number, comment: Comment): Promise<void> => {
  await agent.post(`/comments/${movieId}`, comment);
}
