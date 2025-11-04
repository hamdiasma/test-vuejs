
## Description

This is a NestJS App that generates fake movie and comment data using @faker-js/faker.

Purpose
•	Provide endpoints for retrieving movies and their comments.
•	Allow adding new comments.
•	Data is generated in memory, no database used.

Key components
•	createMovie(id): Creates a fake movie object with id, title, description, release date, genre, and picture URL.
•	createComment(): Creates a fake comment with username, text, and a rating between 0 and 10.
•	getMovies(): Returns 1000 fake movies as an object keyed by index.
•	getComments(movieId): Returns comments for a given movie, generating 1000 fake ones if none exist yet.
•	postComment(movieId, comment): Adds a comment to the start of the comment list for the given movie.

This service simulates a backend for testing or prototyping a movie application.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

```
## Open api documentation

Run the project in development mode and open the following url in your browser
http://localhost:3000/api


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
