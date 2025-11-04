import {ApiProperty} from "@nestjs/swagger";

export class Comment {
    @ApiProperty()
    username: string;

    @ApiProperty()
    text: string;

    @ApiProperty()
    rating: number;
}
