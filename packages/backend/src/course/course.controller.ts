import { Body, Get, Param, Post, Query } from "@nestjs/common";

import { ReqUser } from "../auth/user.decorator";
import { Controller, JWT } from "../common/common.decorator";
import { Pagination } from "../common/common.dto";
import { User } from "../entity";

import {
  CourseResponse,
  MyCourseResponse,
  ScorePaginationResponse,
} from "./course.dto";
import { CourseService } from "./course.service";

@Controller("course")
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get()
  @JWT()
  async findMy(@ReqUser() user: User) {
    return new MyCourseResponse(await this.courseService.findMy(user));
  }
  @Get(":id/score")
  @JWT()
  async findScore(
    @ReqUser() user: User,
    @Param("id") id: number,
    @Query() query: Pagination
  ) {
    return new ScorePaginationResponse(
      ...(await this.courseService.getScore(user, id, query))
    );
  }

  @Post(":id/score/:studentId")
  @JWT()
  async setScore(
    @ReqUser() user: User,
    @Param("id") id: number,
    @Param("studentId") studentId: string,
    @Body() score: { score: number }
  ) {
    return new CourseResponse(
      await this.courseService.setScore(user, id, studentId, score.score)
    );
  }
}
