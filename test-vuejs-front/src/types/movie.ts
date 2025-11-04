// src/types/movie.ts
export interface Author {
  firstName: string;
  lastName: string;
  age: number;
}

export interface Movie {
  id: number;
  summary: string;
  author: Author;
  title: string;
  description: string;
  releaseDate: string;
  genre: string;
  picture: string;
}

export interface Comment {
  username: string;
  text: string;
  rating: number;
}