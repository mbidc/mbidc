import { ForbiddenException, Get, Param, Post, Query } from "@nestjs/common";

import { ReqUser } from "../auth/user.decorator";
import { Controller, JWT } from "../common/common.decorator";
import { Pagination } from "../common/common.dto";
import { User } from "../entity";

import {
  CoursePaginationResponse,
  CourseResponse,
  OpenResponse,
  OpensResponse,
} from "./open.dto";
import { OpenService } from "./open.service";

@Controller("open")
export class OpenController {
  constructor(private readonly openService: OpenService) {}
  @Get("")
  @JWT()
  async getMyOpens(@ReqUser() user: User) {
    if (user.tags.split(",").includes("admin")) {
      return new OpensResponse(await this.openService.findAll());
    } else {
      return new OpensResponse(await this.openService.findMyOpens(user));
    }
  }
  @Get(":id")
  @JWT()
  async getOpen(@ReqUser() user: User, @Param("id") id: number) {
    const open = new OpenResponse(await this.openService.find(id));
    if (this.openService.checkAccess(user, open.data)) {
      return open;
    } else {
      throw new ForbiddenException();
    }
  }
  @Get(":id/courses")
  @JWT()
  async getOpenCourses(
    @ReqUser() user: User,
    @Param("id") id: number,
    @Query() query: Pagination
  ) {
    const open = await this.openService.find(id);
    if (this.openService.checkAccess(user, open)) {
      const res = await this.openService.listOpenCourses(open, query);
      return new CoursePaginationResponse(res.count, res.data);
    } else {
      throw new ForbiddenException();
    }
  }
  @Post(":id/select/:courseId")
  async addCourse(
    @ReqUser() user: User,
    @Param("id") id: number,
    @Param("courseId") courseId: number
  ) {
    const open = await this.openService.find(id);
    return new CourseResponse(
      await this.openService.selectCourse(open, courseId, user)
    );
  }
}
