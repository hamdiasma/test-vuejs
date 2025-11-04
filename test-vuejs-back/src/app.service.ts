import {Injectable} from '@nestjs/common';
import {faker} from '@faker-js/faker';
import {Movie} from "./models/Movie";
import {Comment} from "./models/Comment";



@Injectable()
export class AppService {

    comments: {[movieId: number]: Comment[]} = {};

    private createMovie(id: number) {
        return {
            id,
            summary: faker.lorem.words(10),
            author: {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                age: faker.number.int({min: 18, max: 100}),
            },
            title: faker.lorem.words(3),
            description: faker.lorem.paragraph(),
            releaseDate: faker.date.past(),
            genre: faker.lorem.word(),
            picture: faker.image.urlPicsumPhotos(),
        }
    }

    private createComment() {
        return {
            username: faker.internet.userName(),
            text: faker.lorem.sentence(),
            rating: faker.number.int({min: 0, max: 10}),
        }
    }

    getMovies(): Movie[] {
        return Array(1000).fill(null).reduce((accu, item, index) => {
            accu[index] = this.createMovie(index);
            return accu;
        }, {});
    }

    getComments(movieId: number): Comment[] {
        if (!this.comments[movieId])
            this.comments[movieId] = Array(1000).fill(null).map(() => this.createComment());
        return this.comments[movieId];
    }

    postComment(movieId: number, comment: Comment) {
        if (!this.comments[movieId]) this.comments[movieId] = [comment];
        else this.comments[movieId].unshift(comment);
    }
}
