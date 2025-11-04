import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AppService } from './app.service';

import {ApiParam, ApiResponse} from "@nestjs/swagger";
import {Movie} from "./models/Movie";
import {Comment} from "./models/Comment";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/movies')
  @ApiResponse({
      type: [Movie],
  })
  getMovies(): Movie[] {
    return this.appService.getMovies();
  }

  @Get('/comments/:id')
  @ApiResponse({
      type: [Comment],
  })
  @ApiParam(
      {name: 'id', type: Number, description: 'id of the movie'}
  )
  getComments(@Param('id') id: number): Comment[] {
    return this.appService.getComments(id);
  }

  @Post('/comments/:id')
  @ApiParam(
      {name: 'id', type: Number, description: 'id of the movie'}
  )
   postComment(@Param('id') id: number, @Body() comment: Comment) {
     this.appService.postComment(id, comment);
   }
}
