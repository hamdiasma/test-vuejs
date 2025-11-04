import {ApiProperty} from "@nestjs/swagger";

class Author {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    age: number;
}

export class Movie {
    @ApiProperty()
    id: number
    @ApiProperty()
    title: string
    @ApiProperty()
    description: string
    @ApiProperty()
    summary: string
    @ApiProperty()
    author: Author
    @ApiProperty()
    releaseDate: Date
    @ApiProperty()
    genre: string
    @ApiProperty()
    picture: string
}
