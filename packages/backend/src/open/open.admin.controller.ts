import { Body, Get, Param, Post } from "@nestjs/common";

import { Controller } from "../common/common.decorator";
import { SubjectService } from "../subject/subject.service";

import {
  OpenResponse,
  OpensResponse,
  CreateOpenDto,
  CourseResponse,
} from "./open.dto";
import { OpenService } from "./open.service";

@Controller("open", true)
export class OpenAdminController {
  constructor(
    private readonly openService: OpenService,
    private readonly subjectService: SubjectService
  ) {}
  @Get("all")
  async getAll() {
    return new OpensResponse(await this.openService.findAll());
  }
  @Post("")
  async create(@Body() create: CreateOpenDto) {
    return new OpenResponse(await this.openService.create(create));
  }
  @Get(":id/add/:subId")
  async addCourse(@Param("id") id: number, @Param("subId") subId: string) {
    const subject = await this.subjectService.find(subId);
    const open = await this.openService.find(id);
    return new CourseResponse(await this.openService.addCourse(open, subject));
  }
}
